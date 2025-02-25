"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

const createPostSchema = z.object({
	title: z.string().min(1, "User name is required"),
	content: z.string().min(1, "Content is required"),
	image: z
		.instanceof(File, "The file is not valid")
		.refine((file) => file?.size <= MAX_FILE_SIZE, "Max image size is 5MB.")
		.refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported.",
		),
});

export async function createPost(prevState, formData) {
	const title = formData.get("title");
	const content = formData.get("content");
	const image = formData.get("image");
	const result = createPostSchema.safeParse({
		title,
		content,
		image,
	});

	if (!result.success) {
		return { errors: result.error.errors };
	}

	let imageUrl;
	try {
		imageUrl = await uploadImage(image);
	} catch (error) {
		throw new Error("Error uploading image");
	}

	await storePost({
		imageUrl,
		title,
		content,
		userId: 1,
	});

	revalidatePath("/posts", "layout");
	redirect("/posts/feed");
}

export async function togglePostLikeStatus(postId) {
	await updatePostLikeStatus(postId, 2);
	revalidatePath("/posts", "layout");
}
