import AuthForm from "@/components/auth-form";

export default async function Home({ searchParams }) {
	const mode = searchParams.mode || "signup";

	return <AuthForm mode={mode} />;
}
