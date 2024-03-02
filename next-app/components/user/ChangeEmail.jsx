"use server";

import { sql } from "@/components/db";

export const ChangeEmail = async ({ username, newEmail }) => {
  try {
    const query = `
      UPDATE telegram_users
      SET email = '${newEmail}'
      WHERE id = '${username}'
      RETURNING email = '${newEmail}' AS email_changed;
    `;

    const res = await sql.unsafe(query);

    return {
      emailChanged: res.email_changed,
    };
  } catch (err) {
    return {
      emailChanged: false,
    };
  }
};
