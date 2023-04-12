import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { cookies } = request;

  const authCookie = cookies.get(process.env.NEXT_PUBLIC_LUJAN_EN_5_KEY);
  if (!authCookie) {
    return NextResponse.redirect(process.env.LOGIN_APP);
  }
}
