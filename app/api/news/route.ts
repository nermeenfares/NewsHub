// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const category = searchParams.get("category");

//   const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20${
//     category ? `&category=${category}` : ""
//   }`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: process.env.NEWS_API_KEY!, // server-side only, not public
//     },
//   });

//   const data = await response.json();
//   return NextResponse.json(data);
// }
