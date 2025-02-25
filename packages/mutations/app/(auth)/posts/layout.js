import "@/app/globals.css";
import Header from "@/components/header";

export const metadata = {
	title: "NextPosts",
	description: "Browse and share amazing posts.",
};

export default function RootLoginLayout({ children }) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}
