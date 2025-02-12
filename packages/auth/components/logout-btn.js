"use client";

import { logout } from "@/actions/auth";
import { useFormState } from "react-dom";

export default function LogoutBtn() {
	const [formState, formAction] = useFormState(logout, {});
	return (
		<form action={formAction}>
			<button type="submit">Logout</button>
		</form>
	);
}
