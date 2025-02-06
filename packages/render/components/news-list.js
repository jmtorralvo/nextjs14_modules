import Link from "next/link";

export default function NewsList({ news }) {
	return (
		<ul className="news-list">
			{news.map((newsItem) => (
				<li key={newsItem.id}>
					<Link href={`/news/${newsItem.slug}`}>
						<figure>
							<img
								src={`/images/news/${newsItem.image}`}
								alt={newsItem.title}
							/>
							<figcaption>{newsItem.title}</figcaption>
						</figure>
					</Link>
				</li>
			))}
		</ul>
	);
}
