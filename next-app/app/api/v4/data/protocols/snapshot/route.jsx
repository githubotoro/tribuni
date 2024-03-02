import { sql, sanitizeText } from "@/components/db";

export async function POST(req) {
	try {
		const url =
			"https://api.boardroom.info/v1/protocols?key=a9e2a08afc04b15bd17e20f05373b9e5";
		const options = {
			method: "GET",
			headers: { Accept: "application/json" },
		};
		const res = await fetch(url, options);
		let data = await res.json();
		data = data.data;

		let protocols = [];

		for (let i = 0; i < data.length; i++) {
			if (data[i] && data[i].icons !== undefined) {
				protocols.push({
					id: sanitizeText(data[i].cname),
					name: sanitizeText(data[i].name),
					icon: sanitizeText(data[i].icons[0].url),
				});
			}
		}

		const insertQuery = `
		  INSERT INTO protocols (id, name, icon)
		  VALUES
		    ${protocols
				.map(({ id, name, icon }) => `('${id}', '${name}', '${icon}')`)
				.join(",\n    ")}
		  ON CONFLICT (id) DO UPDATE
		  SET name = EXCLUDED.name, icon = EXCLUDED.icon;
		`;

		await sql.unsafe(insertQuery);

		return Response.json({
			code: 201,
			status: "success",
		});
	} catch (err) {
		console.log(err);
		return Response.json({
			code: 403,
			status: "error",
		});
	}
}
