import Head from 'next/head';
import Header from '../header/Header';

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords}></meta>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <Header />

      <div className='container'>{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: 'My Anime List',
  description: 'Discover new anime!',
  keywords: 'anime, api, find, new, discover',
};
