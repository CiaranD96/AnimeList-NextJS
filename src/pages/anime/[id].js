import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import dayjs from 'dayjs';

import Layout from '@/components/layout/layout/Layout';
import AboutTab from '@/components/tabs/about/about-tab';

export default function SingleShowPage({ show }) {
  const showData = show.data;

  const dateFrom = dayjs(showData.aired.from).format('DD/MM/YYYY');
  const dateTo = dayjs(showData.aired.to).format('DD/MM/YYYY');

  console.log(dateFrom, dateTo);
  console.log(showData);
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
                Aired: {dateFrom} - {dateTo}
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
                <h1>Characters</h1>
              </TabPanel>
              <TabPanel>
                <h1>Episodes</h1>
              </TabPanel>
              <TabPanel>
                <h1>Reviews</h1>
              </TabPanel>
            </Tabs>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const show = await res.json();

  return {
    props: {
      show,
    },
  };
}
