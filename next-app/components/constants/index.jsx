import { clsx } from "clsx";

export const ANIMATE = clsx("duration-200 transition-all ease-in-out");
export const MAX_WIDTH = clsx("max-w-xl");

export function delay(milliseconds) {
	return new Promise((resolve) => {
		setTimeout(resolve, milliseconds);
	});
}

export const BASE_USER = {
	id: null,
	chatid: null,
	premium: 0,
	email: null,
	subscriptions: [],
	duration: 86400,
	pause_alerts: false,
	telegram_alerts: true,
	email_alerts: false,
	last_telegram_alert: 0,
	last_email_alert: 0,
};

export const TOAST_BASE = clsx(
	"w-full p-1 bg-isWhite text-isLabelLightPrimary rounded-xl min-w-[22rem] shadow-sm border-isSeparatorLight"
);
