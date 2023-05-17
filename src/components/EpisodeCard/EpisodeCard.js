import './EpisodeCard.css';

function EpisodeCard({episode}) {
  return (
    <div key={episode.id} className="episode-card">
      <div className="episode-name-container">
        <p>{episode.episode}</p>
      </div>
    </div>
  );
}

export default EpisodeCard;
