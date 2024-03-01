"use server";

import { sql } from "@/components/db";

export const Subscribe = async ({ username, protocol }) => {
	try {
		const query = `
		UPDATE telegram_users
		SET subscriptions = 
		  CASE 
			WHEN '${protocol}' = ANY(subscriptions) THEN array_remove(subscriptions, '${protocol}')
			ELSE array_append(subscriptions, '${protocol}')
		  END
		WHERE id = '${username}'
		RETURNING
		  '${protocol}' = ANY(subscriptions) AS value_added,
		  NOT('${protocol}' = ANY(subscriptions)) AS result;
`;

		const res = await sql.unsafe(query);

		return {
			result: res.result,
		};
	} catch (err) {
		return {
			result: false,
		};
	}
};
