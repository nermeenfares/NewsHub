import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  const apiKey = process.env.GUARDIAN_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key for The Guardian is not configured" },
      { status: 500 }
    );
  }

  const guardianURL = `https://content.guardianapis.com/search?show-fields=thumbnail,trailText,bodyText&page-size=20&api-key=${apiKey}${
    section ? `&section=${section}` : ""
  }`;

  try {
    const response = await fetch(guardianURL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: "Failed to fetch data from The Guardian API",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy to Guardian API failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
