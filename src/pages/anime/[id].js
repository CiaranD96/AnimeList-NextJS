import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import dayjs from 'dayjs';

import Layout from '@/components/layout/layout/Layout';
import AboutTab from '@/components/tabs/about/about-tab';
import CharactersTab from '@/components/tabs/characters/CharactersTab';
import EpisodesTab from '@/components/tabs/episodes/EpisodesTab';
import ReviewTab from '@/components/tabs/reviews/ReviewTab';

export default function SingleShowPage({ show, characters }) {
  const showData = show.data;
  const dateFrom = dayjs(showData.aired.from).format('DD/MM/YYYY');
  const dateTo = dayjs(showData.aired.to).format('DD/MM/YYYY');

  return (
    <Layout title={`AnimeList: ${showData.title}`}>
      <div className='show-container'>
        <div className='show-title'>
          <h1 className='title'>{showData.title}</h1>
          <h3 className='subtitle'>{showData.title_english}</h3>
        </div>

        <div className='show-info-container'>
          <section className='show-card'>
            <div className='anime-rank'>
              <strong className='single-anime-card-rank'>
                {showData.rank}
              </strong>
            </div>
            <Image
              src={showData.images.webp.large_image_url}
              width={400}
              height={600}
              alt='anime'
              className='show-image'
            />
            <div className='show-card-body'>
              <h3>Studio: {showData.studios[0].name}</h3>
              <p>Rating: {showData.rating}</p>
              <div className='card-genres'>
                <span>
                  Genre:
                  <br />
                </span>
                {showData.genres.map((genre) => (
                  <span key={genre.name}>{genre.name}&nbsp;</span>
                ))}
              </div>
              <p>
                {showData.score
                  ? `Score: ${showData.score} (${showData.scored_by} votes)`
                  : `Score: N/A`}
              </p>
              <p>
                Aired: {dateFrom}
                {dateTo !== 'Invalid Date' && ` -${dateTo}`}
              </p>
              <p>
                Type: {showData.type}
                {showData.type === 'TV'
                  ? ` (${showData.episodes} episodes)`
                  : ` (${showData.duration})`}
              </p>
              <p>Status: {showData.status}</p>
            </div>
          </section>

          <main className='show-info'>
            <Tabs>
              <TabList>
                <Tab>About</Tab>
                <Tab>Characters</Tab>
                <Tab>Episodes</Tab>
                <Tab>Reviews</Tab>
              </TabList>

              <TabPanel>
                <AboutTab
                  description={showData.synopsis}
                  trailer={showData.trailer.embed_url}
                />
              </TabPanel>
              <TabPanel>
                <CharactersTab characters={characters} />
              </TabPanel>
              <TabPanel>
                <EpisodesTab />
              </TabPanel>
              <TabPanel>
                <ReviewTab />
              </TabPanel>
            </Tabs>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const showRes = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const show = await showRes.json();

  const charactersRes = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/characters`
  );
  const characters = await charactersRes.json();

  return {
    props: {
      show,
      characters,
    },
  };
}
