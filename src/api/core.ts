export async function get(url: string) {
	const request = {
		method: "GET",
		headers: { "Content-Type": "application/json; charset=utf-8" },
	};

	return await fetch(url, request);
}
