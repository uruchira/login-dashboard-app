interface IProduct {
  id: string;
  name: string;
  price: number;
}

import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/products");

        // Manual error check: fetch only rejects on network failure
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: IProduct[] = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty array ensures this runs once on mount

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>
          {p.name} | ${p.price.toFixed(2)}
        </li>
      ))}
    </ul>
  );
};

export default Home;
