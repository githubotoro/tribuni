import { sql } from "@/components/db";
import { rawTimeFromNow } from "@/components/utilities";
import { getBot } from "@/components/bot";

export function generateMarkdown({ subscriptions }) {
  let markdown = "";
  let isFirstProtocol = true;
  let currentProtocol = "";
  let protocolProposalCounts = {}; // Object to store proposal counts for each protocol

  for (const subscription of subscriptions) {
    const { protocol, title, endtime, url } = subscription;
    const votingLink =
      url && url !== "undefined" ? `👉 [Vote Now](${url})` : "";

    // Initialize proposal count for the current protocol if it's the first time encountering it
    if (protocol !== currentProtocol) {
      if (!isFirstProtocol) {
        markdown += "\n";
      }
      markdown += `*Protocol:* ${protocol}`;
      isFirstProtocol = false;
      currentProtocol = protocol;
      protocolProposalCounts[currentProtocol] = 0;
    }

    // Increment proposal count for the current protocol
    protocolProposalCounts[currentProtocol]++;

    // Generate markdown with proposal number relative to the current protocol
    markdown += `\n${
      protocolProposalCounts[currentProtocol]
    }. _${title}_ \n🔴 _Ends in ${rawTimeFromNow(
      parseInt(endtime)
    )}_ | ${votingLink}\n`;

    // Break the loop if 10 proposals have been processed for the current protocol
    if (protocolProposalCounts[currentProtocol] >= 10) {
      break;
    }
  }

  return markdown;
}

export async function POST(req) {
  try {
    const body = await req.json();

    const bot = getBot();

    if (body.test && body.username && body.chatid) {
      console.log("test alert");

      const username = body.username;
      const chatid = body.chatid;

      if (true) {
        const testSubscriptionQuery = `
          SELECT p.id,
                 pr.name AS protocol,
                 p.title,
                 p.endTime,
                 p.url
          FROM proposals p
          JOIN protocols pr ON p.protocol = pr.id
          WHERE p.protocol IN (SELECT unnest(subscriptions) FROM telegram_users WHERE id = '${username}')
            AND p.endTime > EXTRACT(epoch FROM NOW())::INT
          ORDER BY pr.name ASC;
        `;

        const testSubscriptions = await sql.unsafe(testSubscriptionQuery);
        const testMarkdown = generateMarkdown({
          subscriptions: testSubscriptions,
        });

        if (testSubscriptions.length !== 0) {
          await bot.sendMessage(chatid, `${testMarkdown}`, {
            parse_mode: "Markdown",
          });

          return Response.json({
            code: 201,
            status: "success",
            message: "Test alert sent successfully",
          });
        } else {
          return Response.json({
            code: 404,
            status: "error",
            message: "No subscriptions found for the test user",
          });
        }
      } else {
        return Response.json({
          code: 404,
          status: "error",
          message: "Test user not found or alerts are paused/disabled",
        });
      }
    }

    const usersQuery = `
		SELECT *
		FROM telegram_users
		WHERE pause_alerts = FALSE
			AND telegram_alerts = TRUE
			AND last_telegram_alert + duration < ${Math.floor(Date.now() / 1000)}
		LIMIT 10;
`;

    const users = await sql.unsafe(usersQuery);

    if (users.length !== 0) {
      users.map(async (user, idx) => {
        const subscriptionsQuery = `
    				SELECT p.id,
           pr.name AS protocol,
           p.title,
           p.endTime,
           p.url
    FROM proposals p
    JOIN protocols pr ON p.protocol = pr.id
    WHERE p.protocol IN (SELECT unnest(subscriptions) FROM telegram_users WHERE id = '${user.id}')
      AND p.endTime > EXTRACT(epoch FROM NOW())::INT
    ORDER BY pr.name ASC;
    			`;

        const subscriptions = await sql.unsafe(subscriptionsQuery);
        const markdown = generateMarkdown({ subscriptions });

        if (subscriptions.length !== 0) {
          try {
            await bot.sendMessage(user.chatid, `${markdown}`, {
              parse_mode: "Markdown",
            });

            await sql.unsafe(`
              UPDATE telegram_users
              SET last_telegram_alert = ${Math.floor(Date.now() / 1000)}
              WHERE id = '${user.id}';
            `);
          } catch (err) {
            console.log(err);
          }
        }
      });
    }

    return Response.json({
      code: 201,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    return Response.json({
      code: 403,
      status: "error",
    });
  }
}
