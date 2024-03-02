import { sql } from "@/components/db";
import { rawTimeFromNow } from "@/components/utilities";
import { getBot } from "@/components/bot";
import nodemailer from "nodemailer";

async function sendEmail(userEmail, message) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: userEmail,
    subject: "Proposal Alerts from Tribuni",
    html: message,
  };

  await transporter.sendMail(mailOptions);
}

export async function generateMarkdownAndSendEmail({
  subscriptions,
  userEmail,
}) {
  let markdown = "";
  let isFirstProtocol = true;
  let currentProtocol = "";
  let protocolProposalCounts = {};

  for (const subscription of subscriptions) {
    const { protocol, title, endtime, url } = subscription;
    const votingLink =
      url && url !== "undefined" ? `👉 <a href="${url}">Vote Now</a>` : "";

    if (protocol !== currentProtocol) {
      if (!isFirstProtocol) {
        markdown += "<br>";
      }
      markdown += `<b>Protocol:</b> ${protocol}`;
      isFirstProtocol = false;
      currentProtocol = protocol;
      protocolProposalCounts[currentProtocol] = 0;
    }

    protocolProposalCounts[currentProtocol]++;

    markdown += `<br>${
      protocolProposalCounts[currentProtocol]
    }. <i>${title}</i><br>🔴 <i>Ends in ${rawTimeFromNow(
      parseInt(endtime)
    )}</i> | ${votingLink}<br>`;
  }

  await sendEmail(userEmail, markdown);
}

export async function POST(req) {
  try {
    const bot = getBot();

    const body = await req.json();

    if (body.test && body.username && body.userEmail) {
      console.log("test email alert");

      const username = body.username;
      const userEmail = body.userEmail;

      // Add logic to check if the test user exists and email alerts are enabled
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

        if (testSubscriptions.length !== 0) {
          await generateMarkdownAndSendEmail({
            subscriptions: testSubscriptions,
            userEmail: userEmail,
          });

          return Response.json({
            code: 201,
            status: "success",
            message: "Test email alert sent successfully",
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
          message: "Test user not found or email alerts are paused/disabled",
        });
      }
    }

    const usersQuery = `
		SELECT *
		FROM telegram_users
		WHERE pause_alerts = FALSE
			AND email_alerts = TRUE
			AND last_email_alert + duration < ${Math.floor(Date.now() / 1000)}
		LIMIT 10;
    `;

    const users = await sql.unsafe(usersQuery);

    if (users.length !== 0) {
      for (const user of users) {
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

        if (subscriptions.length !== 0) {
          try {
            await generateMarkdownAndSendEmail({
              subscriptions,
              userEmail: user.email,
            });

            await sql.unsafe(`
              UPDATE telegram_users
              SET last_email_alert = ${Math.floor(Date.now() / 1000)}
              WHERE id = '${user.id}';
            `);
          } catch (err) {
            console.log(err);
          }
        }
      }
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
