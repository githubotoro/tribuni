"use server";

import { sql } from "@/components/db";

export const Bookmark = async ({ username, proposal }) => {
	try {
		const query = `
		UPDATE telegram_users
		SET bookmarks = 
		  CASE 
			WHEN '${proposal}' = ANY(bookmarks) THEN array_remove(bookmarks, '${proposal}')
			ELSE array_append(bookmarks, '${proposal}')
		  END
		WHERE id = '${username}'
		RETURNING
		  '${proposal}' = ANY(bookmarks) AS value_added,
		  NOT('${proposal}' = ANY(bookmarks)) AS result;
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
