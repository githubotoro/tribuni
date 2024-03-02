import { sql, sanitizeText } from "@/components/db";

const getPreviousMessageInfo = async (id) => {
  const query = `
    SELECT
      (SELECT chatid FROM messages WHERE id = '${id}')::BIGINT AS chatid,
      (SELECT messageid FROM messages WHERE id = '${id}')::BIGINT AS messageid
    WHERE EXISTS (SELECT 1 FROM messages WHERE id = '${id}')
    UNION ALL
    SELECT
      NULL AS chatid,
      NULL AS messageid
    WHERE NOT EXISTS (SELECT 1 FROM messages WHERE id = '${id}');
  `;

  const status = await sql.unsafe(query);

  return status[0];
};

const clearPreviousMessage = async ({ bot, id }) => {
  try {
    const { chatid, messageid } = await getPreviousMessageInfo(id);
    if (chatid !== null) {
      await bot.deleteMessage(chatid, messageid);
    }
  } catch (err) {
    console.log(err);
  }
};

const updateLastMessage = async ({ id, chatid, messageid }) => {
  const query = `
    INSERT INTO messages (id, chatid, messageid)
    VALUES ('${id}', ${chatid}, ${messageid})
    ON CONFLICT (id) DO UPDATE
    SET chatid = EXCLUDED.chatid,
        messageid = EXCLUDED.messageid;
  `;
  await sql.unsafe(query);
};

export const DefaultReply = async ({ bot, body }) => {
  try {
    const username = sanitizeText(body.message.from.username);
    const chatid = body.message.chat.id;

    await clearPreviousMessage({ bot, id: username });

    const existsQuery = `
      SELECT EXISTS (SELECT 1 FROM telegram_users WHERE id='${sanitizeText(
        username
      )}') AS result;
    `;

    const userExists = await sql.unsafe(existsQuery);

    console.log(userExists);

    const messageText =
      Boolean(userExists[0].result) === true
        ? `Hey there! 👋 \n\nI'm the governance bot -- your goto companion for all things governance. What's on your mind? 👀`
        : `Hey there! 👋 \n\nBefore we explore the world of governance, let's get you officially on board. Tap 'Register' to get started! 👇`;

    const normalKeyboard = [
      [
        {
          text: "Register",
          web_app: {
            url: `${process.env.NGROK_URL}/register?username=${username}&chatid=${chatid}`,
          },
        },
      ],
    ];

    const userKeyboard = [
      {
        text: "Browse Protocols",
        path: "protocols",
      },
      {
        text: "View Bookmarks",
        path: "bookmarks",
      },
      {
        text: "Edit Settings",
        path: "settings",
      },
      // {
      //   text: "Manage Subscriptions",
      //   path: "subscriptions",
      // },
      // {
      //   text: "Social Directory",
      //   path: "directory",
      // },
    ].map((key) => {
      return [
        {
          text: key.text,
          web_app: {
            url: `${process.env.NGROK_URL}/${key.path}?username=${username}&chatid=${chatid}`,
          },
        },
      ];
    });

    const messageOptions = {
      reply_markup: {
        inline_keyboard:
          Boolean(userExists[0].result) === true
            ? userKeyboard
            : normalKeyboard,
      },
    };

    const status = await bot.sendMessage(chatid, messageText, messageOptions);

    await updateLastMessage({
      id: username,
      chatid: status.chat.id,
      messageid: status.message_id,
    });
  } catch (err) {
    console.log(err);
  }
};
