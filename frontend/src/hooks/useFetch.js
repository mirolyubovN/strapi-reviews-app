import { useEffect, useState } from 'react';

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(false);

			try {
				const response = await fetch(url);
				const json = await response.json();

				setData(json.data);
				setLoading(false);
			} catch (err) {
				setError(true);
				setLoading(false);
			}
		};

		fetchData();
	}, [url])
	return {loading, error, data}
}

export default useFetch;
