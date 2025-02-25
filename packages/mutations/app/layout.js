import "./globals.css";

export default function LoginRootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
