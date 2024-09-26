export interface UnsplashPhoto {
	id: string;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	description: string | null;
	alt_description: string;
	urls: {
		raw: string;
		full: string;
		regular: string;
		small: string;
		thumb: string;
	};
	user: {
		id: string;
		username: string;
		name: string;
		portfolio_url: string | null;
		bio: string | null;
		location: string | null;
	};
}

export interface UnsplashResponse {
	total: number;
	total_pages: number;
	results: UnsplashPhoto[];
}

// Fetch photos function using the native fetch API
export const fetchUnsplashImages = async (query = "african", perPage = 8): Promise<UnsplashPhoto[]> => {
	const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY as string;
	const BASE_URL = import.meta.env.VITE_UNSPLASH_BASE_URL as string;

	try {
		const response = await fetch(`${BASE_URL}search/photos?query=${query}&per_page=${perPage}&client_id=${API_KEY}`);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const data: UnsplashResponse = await response.json();
		return data.results;
	} catch (error) {
		console.error("Error fetching photos from Unsplash:", error);
		throw error; // Re-throw the error to handle it where the function is used
	}
};
