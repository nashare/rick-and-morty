import './CharacterCard.css';

function CharacterCard({character}) {
  return (
    <div key={character.id} className="character-card" style={{
      backgroundImage: `url(${character.image})`
    }}>
      <div class="character-name-container">
        <p>{character.name}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
