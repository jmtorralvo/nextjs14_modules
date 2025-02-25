import { logout } from "@/actions/auth";
import logo from "@/assets/logo.png";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
	const { user } = await auth();
	console.log("user", user);
	return (
		<header id="main-header">
			<Link href="/posts">
				<Image src={logo} alt="Mobile phone with posts feed on it" priority />
			</Link>
			{user.image && (
				<Image
					src={user.image}
					width={48}
					height={48}
					alt={`${user.name} avatar`}
				/>
			)}
			<p>{user.email}</p>
			<nav>
				<ul>
					<li>
						<Link href="/posts/feed">Feed</Link>
					</li>
					<li>
						<Link className="cta-link" href="/posts/new-post">
							New Post
						</Link>
					</li>
					<li>
						<button onClick={logout} type="button">
							Logout
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
