import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (value !== '') {
      router.push(`/anime/search-results?value=${value}`);
    }
  };

  return (
    <form className='search-form' onSubmit={handleSearch}>
      <input
        type='search'
        name='search'
        id='search'
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        type='submit'
        className='btn-secondary btn-search'
        value='Search'
      />
    </form>
  );
}
