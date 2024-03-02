import fetch from "node-fetch";
import { writeFile } from "fs/promises";

export async function POST(req) {
  try {
    const addresses = [];
    let nextCursor = "";
    const baseUrl =
      "https://api.boardroom.info/v1/protocols/aave/voters?key=a9e2a08afc04b15bd17e20f05373b9e5";
    let apiCalls = 0; // Counter for API calls

    do {
      const url = nextCursor ? `${baseUrl}&nextCursor=${nextCursor}` : baseUrl;

      const options = {
        method: "GET",
        headers: { Accept: "application/json" },
      };

      const res = await fetch(url, options);
      const data = await res.json();

      // Iterate through the fetched data and extract addresses
      for (const item of data.data) {
        addresses.push(item.address);
      }

      // Update nextCursor
      nextCursor = data.nextCursor;

      // Increment the API call counter
      apiCalls++;

      // Break the loop after 10 API calls
      if (apiCalls >= 50) {
        break;
      }
    } while (nextCursor); // Continue loop until nextCursor is falsy

    // Save addresses array to a JSON file
    await writeFile(
      "aggregated-data/aave.json",
      JSON.stringify(addresses, null, 2)
    );

    console.log("Addresses saved to aave.json:", addresses);

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
