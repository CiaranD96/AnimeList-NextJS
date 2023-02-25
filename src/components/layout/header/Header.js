import Link from 'next/link';

import SearchBar from '@/components/search-bar/search-bar';

export default function Header() {
  return (
    <header className='header'>
      <Link href='/' className='nav-link'>
        Home
      </Link>

      <SearchBar />

      <nav className='navbar'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link href='/anime/top-anime' className='nav-link'>
              Top Anime
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
