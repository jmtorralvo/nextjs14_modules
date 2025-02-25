"use client";
import { login } from "@/actions/auth";
import { useActionState } from "react";

export default function LoginForm() {
	const [formState, formAction] = useActionState(
		(prevState, formData) => ({ prevState, formData }),
		{},
	);

	const [gitHubFormState, gitHubFormAction] = useActionState(login, {});

	return (
		<>
			<form id="login-form" action={formAction}>
				<p>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="email" />
				</p>
				<p>
					<label htmlFor="pwd">Password</label>
					<input type="pwd" name="pwd" id="pwd" />
				</p>
				<p>
					<button type="submit">Login</button>
				</p>
			</form>
			<form id="signup-form" action={gitHubFormAction}>
				<p>
					<button type="submit">Login With Github</button>
				</p>
			</form>
		</>
	);
}
