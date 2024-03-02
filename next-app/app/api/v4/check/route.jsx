import fetch from "node-fetch";
import { writeFile, readFile } from "fs/promises";

export async function POST(req) {
  try {
    // Read addresses from aave.json
    const addresses = await readFile("aggregated-data/aave.json", "utf-8");
    const addressesArray = JSON.parse(addresses);

    // Make sequential API calls and save results after each call
    for (let i = 0; i < addressesArray.length; i++) {
      const address = addressesArray[i];

      const res = await fetch("https://api.harpie.io/v2/validateAddress", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: "74778fa4-88a8-4e35-922a-02bd82005edd",
          address: address,
        }),
      });

      const result = await res.json();

      // Save result to aave-malicious.json
      await writeFile(
        `aggregated-data/aave-malicious-${i}.json`,
        JSON.stringify(result, null, 2)
      );

      console.log(`Data saved to aave-malicious-${i}.json`);
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
