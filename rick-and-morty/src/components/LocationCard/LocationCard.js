import './LocationCard.css';

function LocationCard({location}) {
  return (
    <div key={location.id} className="location-card">
      <div class="location-name-container">
        <p>{location.name}</p>
      </div>
    </div>
  );
}

export default LocationCard;
