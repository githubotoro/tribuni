import { sql, sanitizeText } from "@/components/db";

export async function POST(req) {
	try {
		console.log("api called");
		const body = await req.json();

		const subscriptionQuery = `
	SELECT EXISTS (
		SELECT 1
		FROM telegramUsers
		WHERE id = '${body.username}' AND '${body.protocol}' = ANY(subscriptions)
	) AS result;
	`;

		let isSubscribed = await sql.unsafe(subscriptionQuery);

		isSubscribed = isSubscribed[0].result;

		return Response.json({
			isSubscribed: isSubscribed,
			code: 201,
			status: "success",
		});
	} catch (err) {
		console.log(err);
		return Response.json({
			isSubscribed: false,
			code: 403,
			status: "error",
		});
	}
}
