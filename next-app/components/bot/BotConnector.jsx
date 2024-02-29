"use client";

import { useStore } from "@/store";
import { useEffect } from "react";

export const BotConnector = () => {
	const { tele, setTele } = useStore();

	const startBot = () => {
		try {
			if (window.Telegram && window.Telegram.WebApp) {
				let _tele = window.Telegram.WebApp;
				_tele.ready();
				setTele(_tele);
			} else {
				console.error("Telegram.WebApp is not available.");
			}
		} catch (error) {
			console.error("Error starting the bot:", error);
		}
	};

	useEffect(() => {
		startBot();
	}, []);
};
