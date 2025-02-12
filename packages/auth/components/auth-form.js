"use client";

import { auth } from "@/actions/auth";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function AuthForm({ mode }) {
	const [formState, formAction] = useFormState(auth.bind(null, mode), {});

	return (
		<form id="auth-form" action={formAction}>
			<div>
				<img src="/images/auth-icon.jpg" alt="A lock icon" />
			</div>
			<p>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" />
			</p>
			<p>
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
			</p>
			{formState.errors && (
				<ul id="form-errors">
					{formState.errors.map((error, i) => (
						<li key={`${error.message}${i}`}>{error.message}</li>
					))}
				</ul>
			)}
			<p>
				<button type="submit">
					{mode === "login" ? "Login" : "Create Account"}
				</button>
			</p>
			<p>
				{mode === "login" ? (
					<Link href="/?mode=signup">Create a new account.</Link>
				) : (
					<Link href="/?mode=login">Login with existing account.</Link>
				)}
			</p>
		</form>
	);
}
