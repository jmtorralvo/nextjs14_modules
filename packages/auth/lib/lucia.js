import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import db from "./db";

const adapter = new BetterSqlite3Adapter(db, {
	user: "users",
	session: "sessions",
});

const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
});

function setCookies(sessionCookie) {
	cookies().set({
		name: sessionCookie.name,
		value: sessionCookie.value.id,
		attributes: sessionCookie.attributes,
	});
}

export async function createAuthSesion(userId) {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session);
	setCookies(sessionCookie);
}

export async function verifyAuth() {
	const undefinedSession = {
		user: null,
		session: null,
	};
	const sessionCookie = cookies().get(lucia.sessionCookieName);
	if (!sessionCookie) {
		return undefinedSession;
	}

	const sessionId = sessionCookie.value;

	if (!sessionId) {
		return undefinedSession;
	}

	const result = await lucia.validateSession(sessionId);

	try {
		if (result.session?.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session);
			setCookies(sessionCookie);
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			setCookies(sessionCookie);
		}
	} catch (error) {}

	return result;
}

export async function destroyAuthSession() {
	const { session } = await verifyAuth();
	if (!session) {
		return {
			error: "Unauthorized!",
		};
	}

	await lucia.invalidateSession(session.id);
	const blankSessionCookie = lucia.createBlankSessionCookie();
	setCookies(blankSessionCookie);
}
