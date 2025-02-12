"use server";

import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createAuthSesion, destroyAuthSession } from "@/lib/lucia";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";
import { z } from "zod";

const signupSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function signup(prevState, formData) {
	const email = formData.get("email");
	const password = formData.get("password");

	const result = signupSchema.safeParse({
		email,
		password,
	});

	if (!result.success) {
		return { errors: result.error.errors };
	}

	const hashedPassword = hashUserPassword(password);
	try {
		const id = createUser({ email, password: hashedPassword });
		await createAuthSesion(id);
		redirect("/training");
	} catch (error) {
		if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
			return { errors: [{ message: "User already exists" }] };
		}
		throw error;
	}
}

export async function login(prevState, formData) {
	const email = formData.get("email");
	const password = formData.get("password");

	const existingUser = getUserByEmail(email);

	if (!existingUser) {
		return { errors: [{ message: "Invalid email" }] };
	}

	const isvalidPwd = verifyPassword(existingUser.password, password);

	if (!isvalidPwd) {
		return { errors: [{ message: "Invalid password" }] };
	}

	await createAuthSesion(existingUser.id);
	redirect("/training");
}

export async function logout() {
	destroyAuthSession();
	redirect("/");
}

export async function auth(mode, prevState, formData) {
	if (mode === "login") {
		return login(prevState, formData);
	}
	return signup(prevState, formData);
}
