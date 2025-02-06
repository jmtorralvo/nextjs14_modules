"use client";

import { togglePostLikeStatus } from "@/actions/posts";
import { formatDate } from "@/lib/format";
import { useOptimistic } from "react";
import LikeButton from "./like-icon";

function Post({ post, action }) {
	return (
		<article className="post">
			<div className="post-image">
				<img src={post.image} alt={post.title} />
			</div>
			<div className="post-content">
				<header>
					<div>
						<h2>{post.title}</h2>
						<p>
							Shared by {post.userFirstName} on{" "}
							<time dateTime={post.createdAt}>
								{formatDate(post.createdAt)}
							</time>
						</p>
					</div>
					<div>
						<form
							action={action.bind(null, post.id)}
							className={post.isLiked ? "liked" : ""}
						>
							<LikeButton />
						</form>
					</div>
				</header>
				<p>{post.content}</p>
			</div>
		</article>
	);
}

export default function Posts({ posts }) {
	const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
		posts,
		(prevPosts, updatePostId) => {
			return prevPosts.map((post) => {
				if (post.id === updatePostId) {
					return {
						...post,
						isLiked: !post.isLiked,
						likes: post.isLiked ? post.likes - 1 : post.likes + 1,
					};
				}
				return post;
			});
		},
	);

	if (!optimisticPosts || optimisticPosts.length === 0) {
		return <p>There are no posts yet. Maybe start sharing some?</p>;
	}

	async function updatePost(postId) {
		updateOptimisticPosts(postId);
		await togglePostLikeStatus(postId);
	}

	return (
		<ul className="posts">
			{optimisticPosts.map((post) => (
				<li key={post.id}>
					<Post post={post} action={updatePost} />
				</li>
			))}
		</ul>
	);
}
