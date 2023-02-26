import { useEffect, useState } from 'react';

import Layout from '@/components/layout/layout/Layout';
import AnimeCard from '@/components/anime-card/AnimeCard';
import Pagination from '@/components/pagination/Pagination';

export default function SeasonalAnimePage() {
  // get current season based on what month it is
  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month > 3 && month < 6) {
      return 'spring';
    }

    if (month > 6 && month < 9) {
      return 'summer';
    }

    if (month > 9 && month < 12) {
      return 'fall';
    }

    if (month >= 1 && month < 3) {
      return 'winter';
    }
  };

  const [year, setYear] = useState(new Date().getFullYear());
  const [season, setSeason] = useState(getCurrentSeason());
  const [results, setResults] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${pageNumber}`
      );
      const shows = await res.json();

      setResults(shows);
    })();
  }, [year, season, pageNumber]);

  const handlePageButton = (increment) => {
    const pageMax = results.pagination.last_visible_page;
    if (increment === 'previous' && pageNumber !== 1)
      setPageNumber(pageNumber - 1);
    if (increment === 'next' && pageNumber !== pageMax)
      setPageNumber(pageNumber + 1);
  };

  // get list of years from 1917 to currnet year
  let yearOptions = [];
  (() => {
    const currentYear = new Date().getFullYear();
    for (let i = 1917; i <= currentYear; i++) {
      yearOptions.push(i);
    }
  })();

  return (
    <Layout title='Seasonal Anime'>
      <h1>Seasonal Anime</h1>
      <div className='season-selection-container'>
        <div className='select-group'>
          <label htmlFor='season' className='season-label'>
            Season:{' '}
          </label>
          <select
            name='season'
            id='season'
            value={getCurrentSeason()}
            onChange={(e) => setSeason(e.target.value)}
            className='season-select'
          >
            <option value='spring'>Spring</option>
            <option value='summer'>Summer</option>
            <option value='fall'>Fall</option>
            <option value='winter'>Winter</option>
          </select>
        </div>

        <div className='select-group'>
          <label htmlFor='year' className='season-label'>
            Year:
          </label>
          <select
            name='year'
            id='year'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='season-select'
          >
            {yearOptions.length > 0 &&
              yearOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
      </div>

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
