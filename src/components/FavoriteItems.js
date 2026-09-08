import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserFavorites } from '../actions/userActions';
import NormalSpinner from './Spinner';
import Row from 'react-bootstrap/esm/Row';
import { Col, Card } from 'react-bootstrap';
import ItemListing from './ItemListing';
import FavoritesButton from './FavoritesButton';

function FavoriteItems() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoritesData = useSelector((state) => state.favorites);
  const { error, loading, favorites } = favoritesData;

  useEffect(() => {
    if (!favorites && !loading) {
      dispatch(getUserFavorites());
    }
  }, [dispatch, favorites, loading]);

  if ((loading && !favorites) || !favorites) {
    return <NormalSpinner />;
  }

  if (error) {
    return <h3>{error?.message || error?.toString() || 'An error occurred'}</h3>;
  }

  if (!favorites?.items?.length && !favorites?.charities?.length) {
    return <p>No items saved yet.</p>;
  }

  return (
    <>
      {favorites.charities?.length > 0 && (
        <>
          <h2 className="mt-3 mb-3">Charities</h2>
          <Row className="g-3 mb-4">
            {favorites.charities.map((charity) => (
              <Col key={charity.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="charity-browse-card h-100"
                  onClick={() => navigate(`/charities/${charity.id}`)}
                >
                  <div className="charity-browse-card-image">
                    <Card.Img variant="top" src={charity.image_url} alt="" />
                  </div>
                  <Card.Body>
                    <Card.Title>{charity.name}</Card.Title>
                  </Card.Body>
                  <Card.Footer
                    className="charity-browse-favorite"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <FavoritesButton charityId={charity.id} />
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
      {favorites.items?.length > 0 && (
        <>
          {favorites.charities?.length > 0 && <h2 className="mt-3 mb-3">Items</h2>}
          {favorites.items.map((item) => (
            <Row key={item.ebay_id} className="mb-3">
              <ItemListing
                name={item.name}
                img_url={item.img_url}
                url={item.web_url}
                id={item.ebay_id}
                favorites={favorites.items}
                charity={item.charity}
                price={item.price}
                additional_images={item.additional_images} 
                shippingPrice={item.shipping_price}
                condition={item.condition}
                seller={item.seller}
                donation_percentage={item.donation_percentage}
                seller_description={item.seller_description}
              />
            </Row>
          ))}
        </>
      )}
    </>
  );
}

export default FavoriteItems;