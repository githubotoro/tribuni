import { sql } from "@/components/db";

export async function POST(req) {
	try {
		const query = `
		DELETE FROM proposals
		WHERE endtime < (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) - 48 * 3600)::INT;
	`;

		await sql.unsafe(query);

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
