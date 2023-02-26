import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Pagination from '@/components/pagination/Pagination';
import ReviewCard from './ReviewCard';

export default function ReviewTab() {
  const [reviews, setReviews] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const id = parseInt(router.query.id);

      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/reviews?page=${pageNumber}`
      );
      const data = await res.json();

      setReviews(data);
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
    <div className='review-tab'>
      <div className='review-tab-grid'>
        {reviews !== null
          ? reviews.data.map((review) => <ReviewCard review={review} />)
          : 'Oops, we have no reviews yet!'}
      </div>

      {reviews !== null && reviews.pagination.last_visible_page > 1 ? (
        <Pagination
          pagination={reviews.pagination}
          handlePageButton={handlePageButton}
        />
      ) : (
        ''
      )}
    </div>
  );
}
