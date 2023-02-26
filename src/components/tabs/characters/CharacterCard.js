import Image from 'next/image';

export default function CharacterCard({ character }) {
  return (
    <div className='character-card'>
      <Image
        src={character.character.images.webp.image_url}
        width={280}
        height={380}
        alt='show image'
        className='card-image'
      />
      <div className='card-body'>
        <h3 className='card-title'>{character.character.name}</h3>
        <p>Role: {character.role}</p>
        <div className='voice-actors'>
          <p>Voice actors:</p>
          {character.voice_actors &&
            character.voice_actors.map((actor) => (
              <p key={actor.person.name}>
                {actor.person.name} ({actor.language})
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
