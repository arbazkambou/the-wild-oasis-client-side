import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

// export function middleware(req) {
//   //   return NextResponse.json({ message: "success" }, { status: 200 });
//   return NextResponse.redirect(new URL("/about", req.url));
// }

export const middleware = auth;
export const config = {
  matcher: ["/account"],
};
