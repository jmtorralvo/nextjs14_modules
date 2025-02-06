import MainHeader from "@/components/main-header";
import "../globals.css";
import Providers from "../providers";

export const metadata = {
	title: "Next.js Page Routing & Rendering",
	description: "Learn how to route to different pages.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<div id="page">
					<Providers>
						<MainHeader />
						{children}
					</Providers>
				</div>
			</body>
		</html>
	);
}
