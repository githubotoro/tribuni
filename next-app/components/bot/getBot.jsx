import * as TelegramBot from "node-telegram-bot-api";

export const getBot = () => {
	const token = process.env.BOT_API_KEY;
	const bot = new TelegramBot(token, { polling: false });
	return bot;
};
