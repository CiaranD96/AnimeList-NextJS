import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '@/components/layout/layout/Layout';
import AnimeCard from '@/components/anime-card/AnimeCard';
import Pagination from '@/components/pagination/Pagination';

export default function SearchResultsPage() {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const [results, setResults] = useState(null);

  const searchValue = router.query.value;

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchValue}&page=${pageNumber}&sfw=${true}&order_by=rank`
      );
      const data = await res.json();

      setResults(data);
    })();
  }, [searchValue, pageNumber]);

  const handlePageButton = (increment) => {
    const pageMax = results.pagination.last_visible_page;
    if (increment === 'previous' && pageNumber !== 1)
      setPageNumber(pageNumber - 1);
    if (increment === 'next' && pageNumber !== pageMax)
      setPageNumber(pageNumber + 1);
  };

  return (
    <Layout title={`Search Results for: ${searchValue}`}>
      <h1>Search results for: {searchValue} </h1>
      <div className='top-anime-grid'>
        {results &&
          results.data.map((show) => (
            <AnimeCard key={show.mal_id} show={show} />
          ))}
      </div>

      {results && (
        <Pagination
          pagination={results.pagination}
          handlePageButton={handlePageButton}
        />
      )}
    </Layout>
  );
}
