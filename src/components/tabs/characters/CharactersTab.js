import CharacterCard from './CharacterCard';

export default function CharactersTab({ characters }) {
  return (
    <div className='character-card-grid'>
      {characters && characters.data.length > 0 ? (
        characters.data.map((character) => (
          <CharacterCard
            key={character.character.mal_id}
            character={character}
          />
        ))
      ) : (
        <h2>Oops, we have no character information yet!</h2>
      )}
    </div>
  );
}
