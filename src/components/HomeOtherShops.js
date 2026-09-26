import { useNavigate } from 'react-router-dom';
import { DIRECTORY } from '../constants/directoryConstants';

const shops = Object.entries(DIRECTORY).flatMap(([category, entries]) =>
  entries.map((shop) => ({ ...shop, category }))
);

function HomeOtherShops() {
  const navigate = useNavigate();

  return (
    <section className="home-other-shops" aria-labelledby="home-other-shops-title">
      <div className="home-featured-header">
        <h2 id="home-other-shops-title" className="home-featured-title">
          Other ways to shop for charity
        </h2>
        <button type="button" className="home-view-all" onClick={() => navigate('/directory')}>
          View all shops →
        </button>
      </div>
      <p className="home-other-shops-lead">
        These shops are not on eBay. You buy on their own site.
      </p>
      <div className="home-featured-grid">
        {shops.map((shop) => (
          <a
            key={shop.url}
            className="featured-card home-shop-card"
            href={shop.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="featured-card-photo home-shop-logo">
              <img
                src={shop.image_url}
                alt=""
                onError={(event) => {
                  event.currentTarget.hidden = true;
                }}
              />
            </div>
            <div className="featured-card-body">
              <span className="featured-card-charity">{shop.category}</span>
              <h3 className="featured-card-title">{shop.name}</h3>
              <p className="home-shop-description">{shop.description}</p>
              <span className="home-shop-action">
                View Shop
                <span className="visually-hidden"> (opens in a new tab)</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default HomeOtherShops;
