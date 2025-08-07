import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const apiKey = process.env.NEWSAPI_KEY;

  console.log("--- NEWSAPI PROXY ROUTE ---");
  console.log("Is API Key a string?", typeof apiKey === "string");
  console.log("API Key length:", apiKey ? apiKey.length : "undefined");
  if (apiKey) {
    console.log(
      `API Key preview: ${apiKey.substring(0, 4)}...${apiKey.substring(
        apiKey.length - 4
      )}`
    );
  } else {
    console.log("API Key is MISSING (undefined or null)!");
  }
  console.log("---------------------------");

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key for NewsAPI is not configured on the server." },
      { status: 500 }
    );
  }

  const newsApiURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}${
    category ? `&category=${category}` : ""
  }`;

  try {
    const response = await fetch(newsApiURL, { next: { revalidate: 3600 } });
    console.log("response for news api", response);
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to fetch data from NewsAPI", details: errorData },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy to NewsAPI failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
