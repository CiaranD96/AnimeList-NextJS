import Link from 'next/link';
import Image from 'next/image';

export default function AnimeCard({ show }) {
  return (
    <Link className='card' href={`/anime/${show.mal_id}`}>
      <div className='anime-rank'>
        <strong>{show.rank}</strong>
      </div>
      <Image
        src={show.images.webp.image_url}
        width={300}
        height={380}
        alt='show image'
        className='card-image'
      />
      <div className='card-body'>
        <h3 className='card-title'>
          {show.title} ({show.year})
        </h3>
        <p>Studio: {show.studios.map((studio) => studio.name)}</p>
        <div className='card-genres'>
          <span>
            Genre:
            <br />
          </span>
          {show.genres.map((genre) => (
            <span>{genre.name}&nbsp;</span>
          ))}
        </div>
        <p>
          {show.score
            ? `Score: ${show.score} (${show.scored_by} votes)`
            : `Score: N/A`}
        </p>
        <p>
          Type: {show.type}
          {show.type === 'TV'
            ? ` (${show.episodes} episodes)`
            : ` (${show.duration})`}
        </p>
        <p>Status: {show.status}</p>
      </div>
    </Link>
  );
}
