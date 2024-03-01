"use server";

import { sql } from "@/components/db";

export const CheckUserStatus = async ({ username }) => {
	try {
		const query = `SELECT EXISTS (SELECT 1 FROM telegram_users WHERE id = '${username}') AS status;`;

		const res = await sql.unsafe(query);

		return {
			code: 201,
			status: res[0].status,
		};
	} catch (err) {
		return {
			code: 400,
			status: "ERROR",
		};
	}
};
