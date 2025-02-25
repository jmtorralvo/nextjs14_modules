import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
	const session = await auth();
	console.log("session", session);
	if (!session) {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}

export const config = {
	matcher: "/posts",
};
