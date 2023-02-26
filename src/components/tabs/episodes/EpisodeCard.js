import dayjs from 'dayjs';

export default function EpisodeCard({ episode }) {
  let airDate = 'N/A';

  if (airDate !== null) airDate = dayjs(episode.aired).format('DD/MM/YYYY');

  return (
    <div className='episode-card'>
      <h3>{episode.title}</h3>
      <p>Aired: {airDate} </p>
      <p>Score: {episode.score !== null ? episode.score : 'N/A'}</p>
      <p>Recap: {episode.recap ? 'Yes' : 'No'}</p>
      <p>Filler / Canon: {episode.filler ? 'Filler' : 'Canon'}</p>
    </div>
  );
}
