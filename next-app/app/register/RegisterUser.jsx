"use server";

import validator from "validator";
import { sql, sanitizeText } from "@/components/db";
import { getBot } from "@/components/bot";

export const RegisterUser = async ({ inviteCode, username, chatid }) => {
  try {
    const bot = getBot();

    inviteCode = inviteCode.toUpperCase();
    let currTime = new Date().getTime();
    currTime = Math.floor(currTime / 1000);

    const query = `
	WITH UpdatedInvites AS (
		UPDATE invites
		SET available = available - 1
		WHERE id = '${inviteCode}' AND available >= 1
		RETURNING id, premium
	)
	INSERT INTO telegram_users (id, chatid, premium, email, bookmarks, subscriptions, duration, pause_alerts, telegram_alerts, email_alerts, last_telegram_alert, last_email_alert)
	SELECT '${username}', '${chatid}', ${currTime} + (premium * 31 * 24 * 60 * 60), NULL, ARRAY[]::TEXT[], ARRAY[]::TEXT[], 24 * 60 * 60, FALSE, TRUE, FALSE, 0, 0
	FROM UpdatedInvites
	WHERE NOT EXISTS (SELECT 1 FROM telegram_users WHERE id = '${username}')
	RETURNING id AS inserted_id;
`;

    const res = await sql.unsafe(query);

    if (res[0] === undefined) {
      return {
        code: 401,
        message: "Invalid Invite Code!",
      };
    } else {
      try {
        const postData = {
          message: {
            from: {
              username: username,
            },
            chat: {
              id: chatid,
            },
          },
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        };

        await fetch(`${process.env.NGROK_URL}/api/v4/bot`, options);
      } catch (err) {
        console.log(err);
      }

      return {
        code: 201,
        message: "Registration successful",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      code: 400,
      message: "Something Went Wrong!",
    };
  }
};
