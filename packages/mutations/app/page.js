import { Suspense } from "react";

import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";

export async function generateMetadata() {
	const posts = await getPosts();
	const numberOfPosts = posts.length;
	return {
		title: "Latest Posts",
		description: `The most recent ${numberOfPosts} posts from all users.`,
	};
}

async function LatestPosts() {
	const latestPosts = await getPosts(3);
	return <Posts posts={latestPosts} />;
}

export default async function Home() {
	return (
		<>
			<h1>Welcome back!</h1>
			<p>{process.env.NODE_ENV === "development" ? "Dev" : "Prod"} mode</p>
			<p>Here's what you might've missed.</p>
			<section id="latest-posts">
				<Suspense fallback={<p>Loading recent posts...</p>}>
					<LatestPosts />
				</Suspense>
			</section>
		</>
	);
}
