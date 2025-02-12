export default async function imageLoader(config) {
	const [urlStart, urlEnd] = config.src.split("upload/");
	const transformations = `w_200,q_${config.quality}`;
	return `${urlStart}upload/${transformations}/${urlEnd}`;
}
