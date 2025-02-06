"use client";

import { useFormStatus } from "react-dom";

export default function FormSubmit() {
	const { pending } = useFormStatus();

	if (pending) {
		return (
			<button type="submit" disabled>
				Creating Post...
			</button>
		);
	}

	return (
		<>
			<button type="reset">Reset</button>
			<button type="submit">Create Post</button>
		</>
	);
}
