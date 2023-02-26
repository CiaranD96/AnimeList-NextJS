import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import EpisodeCard from './EpisodeCard';
import Pagination from '@/components/pagination/Pagination';

export default function EpisodesTab() {
  const [episodes, setEpisodes] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const id = parseInt(router.query.id);

      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/episodes?page=${pageNumber}`
      );
      const data = await res.json();

      setEpisodes(data);
    })();
  }, [pageNumber]);

  const handlePageButton = (increment) => {
    const pageMax = episodes.pagination.last_visible_page;
    if (increment === 'previous' && pageNumber !== 1)
      setPageNumber(pageNumber - 1);
    if (increment === 'next' && pageNumber !== pageMax)
      setPageNumber(pageNumber + 1);
  };

  return (
    <div className='episodes-tab'>
      <div className='episodes-tab-grid'>
        {episodes !== null && episodes.data.length > 0 ? (
          episodes.data.map((episode) => (
            <EpisodeCard key={episode.mal_id} episode={episode} />
          ))
        ) : (
          <h2>Oops, we have no character information yet!</h2>
        )}
      </div>

      {episodes !== null && episodes.pagination.last_visible_page > 1 ? (
        <Pagination
          pagination={episodes.pagination}
          handlePageButton={handlePageButton}
          currentPage={pageNumber}
        />
      ) : (
        ''
      )}
    </div>
  );
}
