import { sql, sanitizeText } from "@/components/db";
import sha1 from "sha1";

export async function POST(req) {
	try {
		const url1 =
			"https://api.boardroom.info/v1/protocols?key=a9e2a08afc04b15bd17e20f05373b9e5";
		const options1 = {
			method: "GET",
			headers: { Accept: "application/json" },
		};
		let res1 = await fetch(url1, options1);
		let data1 = await res1.json();
		data1 = data1.data;

		let protocols = [];

		for (let i = 0; i < data1.length; i++) {
			if (data1[i] && data1[i].icons !== undefined) {
				protocols.push(sanitizeText(data1[i].cname));
			}
		}

		let proposals = new Set();

		// let rawProposals = [];

		const promises = protocols.map(async (protocol) => {
			const url2 = `https://api.boardroom.info/v1/protocols/${protocol}/proposals?status=active&key=a9e2a08afc04b15bd17e20f05373b9e5`;
			const options2 = {
				method: "GET",
				headers: { Accept: "application/json" },
			};

			const res2 = await fetch(url2, options2);
			const data2 = await res2.json();

			for (let i = 0; i < data2.data.length; i += 1) {
				let newProposal = {};
				const proposal = data2.data[i];

				let rawSummary = sanitizeText(proposal.content).trim();
				let summary = rawSummary.slice(0, 200);

				if (rawSummary.length >= 201) {
					summary = summary + "...";
				}

				newProposal["id"] = sha1(proposal.id);
				newProposal["protocol"] = protocol;
				newProposal["proposer"] = proposal.proposer;
				newProposal["title"] = sanitizeText(proposal.title).trim();
				newProposal["starttime"] = parseInt(proposal.startTimestamp);
				newProposal["endtime"] = parseInt(proposal.endTimestamp);
				newProposal["url"] = proposal.externalUrl;
				// newProposal["summary"] = summary;
				newProposal["summary"] = rawSummary;
				// newProposal["choices"] = [""];
				// newProposal["results"] = {
				// 	greet: "hello",
				// };
				newProposal["choices"] = proposal.choices;
				newProposal["results"] = proposal.indexedResult;

				if (newProposal.title !== undefined) {
					proposals.add(newProposal);
				}

				// rawProposals.push(proposal);
			}
		});

		await Promise.allSettled(promises);

		let idSet = new Set();

		proposals = Array.from(proposals).filter(({ id }) => {
			if (idSet.has(id)) {
				return false;
			} else {
				idSet.add(id);
				return true;
			}
		});

		const insertQuery = `
  INSERT INTO proposals (id, protocol, title, proposer, starttime, endtime, url, summary, choices, results)
  VALUES
    ${proposals
		.map(
			({
				id,
				protocol,
				title,
				proposer,
				starttime,
				endtime,
				url,
				summary,
				choices,
				results,
			}) =>
				`('${id}', '${protocol}', '${title}', '${proposer}', ${starttime}, ${endtime}, '${url}', '${summary}', ARRAY[${choices
					.map((choice) => `'${sanitizeText(choice).trim()}'`)
					.join(", ")}], '${JSON.stringify(results)}')`
		)
		.join(",\n    ")}
  ON CONFLICT (id) DO UPDATE
  SET
    protocol = EXCLUDED.protocol,
    title = EXCLUDED.title,
    proposer = EXCLUDED.proposer,
    starttime = EXCLUDED.starttime,
    endtime = EXCLUDED.endtime,
    url = EXCLUDED.url,
    summary = EXCLUDED.summary,
    choices = EXCLUDED.choices,
    results = EXCLUDED.results
  WHERE proposals.protocol <> EXCLUDED.protocol
     OR proposals.title <> EXCLUDED.title
	 OR proposals.proposer <> EXCLUDED.proposer
     OR proposals.starttime <> EXCLUDED.starttime
     OR proposals.endtime <> EXCLUDED.endtime
     OR proposals.url <> EXCLUDED.url
     OR proposals.summary <> EXCLUDED.summary
	 OR proposals.choices <> EXCLUDED.choices
	 OR proposals.results <> EXCLUDED.results;
`;

		await sql.unsafe(insertQuery);

		return Response.json({
			code: 201,
			status: "success",
			// rawProposals: rawProposals,
		});
	} catch (err) {
		console.log(err);
		return Response.json({
			code: 403,
			status: "error",
		});
	}
}
