import React from "react";
import { RenderList } from "./RenderList";
import { sql } from "@/components/db";
import clsx from "clsx";
import { MAX_WIDTH } from "@/components/constants";
import { PageLoader } from "@/components/loaders";

export const revalidate = 60 * 60;

export const getData = async () => {
  const query = `
    SELECT
        p.id AS id,
        p.name AS name,
        p.icon AS icon,
        COUNT(pr.protocol) AS total,
        SUM(CASE WHEN pr.endtime > EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) THEN 1 ELSE 0 END) AS active,
        SUM(CASE WHEN pr.starttime < EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) AND EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) - pr.starttime <= 48 * 3600 THEN 1 ELSE 0 END) AS new
    FROM
        protocols p
    LEFT JOIN
        proposals pr ON p.id = pr.protocol
    GROUP BY
        p.id, p.name, p.icon;
`;

  let protocols = await sql.unsafe(query);

  protocols = protocols.map(({ name, count, ...rest }) => {
    return {
      name: name.trim(),
      count: parseInt(count),
      ...rest,
    };
  });

  protocols.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const total = protocols.reduce(
    (acc, protocol) => acc + parseInt(protocol.total || 0, 10),
    0
  );

  return {
    protocols,
    total,
  };
};

export default async function Page() {
  const { protocols, total } = await getData();

  return (
    <PageLoader
      children={
        <div
          className={clsx(
            "flex flex-col items-center w-full grow overflow-hidden pb-24",
            MAX_WIDTH
          )}
        >
          <RenderList
            protocols={protocols}
            total={total}
            lastUpdated={new Date().toUTCString()}
          />
        </div>
      }
    />
  );
}
