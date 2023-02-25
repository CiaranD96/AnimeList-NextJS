import { useEffect, useState } from 'react';

import Layout from '@/components/layout/layout/Layout';
import AnimeCard from '@/components/anime-card/AnimeCard';
import Pagination from '@/components/pagination/Pagination';

export default function TopAnimePage() {
  const [anime, setAnime] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://api.jikan.moe/v4/top/anime?page=${pageNumber}`
      );
      const animeData = await res.json();
      setAnime(animeData);
    })();
  }, [pageNumber]);

  const handlePageButton = (increment) => {
    const pageMax = anime.pagination.last_visible_page;
    if (increment === 'previous' && pageNumber !== 1)
      setPageNumber(pageNumber - 1);
    if (increment === 'next' && pageNumber !== pageMax)
      setPageNumber(pageNumber + 1);
  };

  return (
    <Layout title='Top Anime'>
      <h1>Top Anime</h1>
      <div className='top-anime-grid'>
        {anime &&
          anime.data.map((show) => <AnimeCard key={show.mal_id} show={show} />)}
      </div>

      {anime && (
        <Pagination
          pagination={anime.pagination}
          handlePageButton={handlePageButton}
        />
      )}
    </Layout>
  );
}
