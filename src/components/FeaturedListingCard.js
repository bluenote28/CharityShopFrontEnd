import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { convertIdToCharityName } from '../utilities/Converters';

function FeaturedListingCard({ item }) {
  const navigate = useNavigate();
  const charitiesState = useSelector((state) => state.charities);
  const { charities } = charitiesState;
  const charityName = convertIdToCharityName(charities || [], item.charity) || 'Charity';
  const listingId = item.ebay_id || item.id;

  function openItem() {
    navigate('/item/' + encodeURIComponent(listingId), { state: item });
  }

  return (
    <article className="featured-card" onClick={openItem} role="link" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') openItem(); }}>
      <div className="featured-card-photo">
        <img src={item.img_url} alt="" />
      </div>
      <div className="featured-card-body">
        <span className="featured-card-charity">{charityName}</span>
        <h3 className="featured-card-title">{item.name}</h3>
        {item.donation_percentage != null && item.donation_percentage !== '' && (
          <p className="featured-card-meta">{item.donation_percentage}% of this sale benefits {charityName}</p>
        )}
        <p className="featured-card-price">${item.price}</p>
      </div>
    </article>
  );
}

export default FeaturedListingCard;
