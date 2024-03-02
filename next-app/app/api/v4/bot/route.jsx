import { getBot } from "@/components/bot";
import { DefaultReply } from "./DefaultReply";
import { HandleCallback } from "./HandleCallback";

export async function POST(req) {
	try {
		const bot = getBot();
		const body = await req.json();

		if (body.callback_query) {
			// callback
			// await HandleCallback({ bot, body });
		} else {
			// default
			await DefaultReply({ bot, body });
		}

		return Response.json({
			code: 201,
			message: "success",
		});
	} catch (err) {
		return Response.json({
			code: 403,
			message: "Something Went Wrong",
			err: err,
		});
	}
}

export async function GET(req) {
	console.log("GET api was called");
	try {
		return Response.json({
			code: 201,
			message: "success",
		});
	} catch (err) {
		console.log(err);
		return Response.json({
			code: 403,
			message: "Something Went Wrong",
			err: err,
		});
	}
}
