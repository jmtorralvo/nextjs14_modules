import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function ImagePage({ params }) {
	const { slug } = params;
	const item = await getNewsItem(slug);

	if (!item) {
		notFound();
	}

	return (
		<div className="fullscreen-image">
			<img src={`/images/news/${item.image}`} alt={item.image} />
		</div>
	);
}
