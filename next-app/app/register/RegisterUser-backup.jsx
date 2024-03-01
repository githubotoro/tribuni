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
        await bot.sendMessage(
          chatid,
          `Welcome to the Tribuni Family! 👋 \n\nYou are now officially a part of our growing network. 🌐 \n\nI'm the governance bot -- your goto companion for all things governance. What's on your mind? 👀`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Browse Protocols",
                    web_app: {
                      url: `${process.env.NGROK_URL}/protocols?username=${username}&chatid=${chatid}`,
                    },
                  },
                ],
                [
                  {
                    text: "Edit Settings",
                    web_app: {
                      url: `${process.env.NGROK_URL}/settings?username=${username}&chatid=${chatid}`,
                    },
                  },
                ],
                [
                  {
                    text: "Manage Subscriptions",
                    web_app: {
                      url: `${process.env.NGROK_URL}/subscriptions?username=${username}&chatid=${chatid}`,
                    },
                  },
                ],
                [
                  {
                    text: "View Bookmarks",
                    web_app: {
                      url: `${process.env.NGROK_URL}/bookmarks?username=${username}&chatid=${chatid}`,
                    },
                  },
                ],
                [
                  {
                    text: "Social Directory",
                    web_app: {
                      url: `${process.env.NGROK_URL}/directory?username=${username}&chatid=${chatid}`,
                    },
                  },
                ],
              ],
              resize_keyboard: true,
              one_time_keyboard: false,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }

      return {
        code: 201,
        message: "Registration successful",
      };
    }

    // try {
    // 	await bot.sendMessage(
    // 		chatid,
    // 		`Welcome to the Civitas Family! 👋 \n\nYou are now officially a part of our growing network. 🌐 \n\nI'm the governance bot -- your goto companion for all things governance. What's on your mind? 👀`,
    // 		{
    // 			reply_markup: {
    // 				inline_keyboard: [
    // 					[
    // 						{
    // 							text: "Browse Protocols",
    // 							web_app: {
    // 								url: `${process.env.NGROK_URL}/protocols?username=${username}&chatid=${chatid}`,
    // 							},
    // 						},
    // 					],
    // 					[
    // 						{
    // 							text: "Manage Subscriptions",
    // 							web_app: {
    // 								url: `${process.env.NGROK_URL}/manage?username=${username}&chatid=${chatid}`,
    // 							},
    // 						},
    // 					],
    // 				],
    // 				resize_keyboard: true,
    // 				one_time_keyboard: false,
    // 			},
    // 		}
    // 	);
    // } catch (err) {
    // 	console.log(err);
    // }
  } catch (err) {
    console.log(err);
    return {
      code: 400,
      message: "Something Went Wrong!",
    };
  }
};
