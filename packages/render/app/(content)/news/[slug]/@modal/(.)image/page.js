import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function InterceptedImagePage({ params }) {
	const { slug } = params;
	const item = await getNewsItem(slug);

	if (!item) {
		notFound();
	}

	return (
		<>
			<ModalBackdrop />
			<dialog className="modal" open>
				<div className="fullscreen-image">
					<img src={`/images/news/${item.image}`} alt={item.image} />
				</div>
			</dialog>
		</>
	);
}
