import "@/app/globals.css";
import LogoutBtn from "@/components/logout-btn";

export const metadata = {
	title: "Next Auth",
	description: "Next.js Authentication",
};

export default function AuthRootLayout({ children }) {
	return (
		<>
			<header id="auth-header">
				<p>Welcome back!</p>
				<LogoutBtn />
			</header>
			{children}
		</>
	);
}
