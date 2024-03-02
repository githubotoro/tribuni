import * as TelegramBot from "node-telegram-bot-api";

export async function POST(req) {
	// console.log("POST api was called");
	try {
		const token = process.env.BOT_API_KEY;
		const bot = new TelegramBot(token, { polling: false });

		const body = await req.json();

		console.log(body);

		// await bot.sendMessage(
		// 	body.message.chat.id,
		// 	`Hi @${body.message.from.username} -- I am the OP bot.`
		// );

		await bot.sendMessage(
			body.message.chat.id,
			`Hi @${body.message.from.username} -- I am the OP bot.`,
			{
				reply_markup: {
					keyboard: [
						[
							{
								text: "op bot app",
								web_app: {
									url: process.env.NGROK_URL,
								},
							},
						],
					],
				},
			}
		);

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
