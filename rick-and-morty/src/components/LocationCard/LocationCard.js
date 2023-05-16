import './LocationCard.css';

function LocationCard({location}) {
  return (
    <div key={location.id} className="location-card">
      <div className="location-name-container">
        <p>{location.name}</p>
      </div>
    </div>
  );
}

export default LocationCard;
