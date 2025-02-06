export function GET(request) {
	console.log("GET request", request);

	return new Response("Hello worker!");
}
