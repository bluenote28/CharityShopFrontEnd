import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavorites } from '../actions/userActions';
import NormalSpinner from './Spinner';
import Row from 'react-bootstrap/esm/Row';
import ItemListing from './ItemListing';
import { getCharities } from '../actions/charityActions';

function FavoriteItems() {
  const dispatch = useDispatch();
  const favoritesData = useSelector((state) => state.favorites);
  const { error, loading, favorites } = favoritesData;
  const charitiesState = useSelector((state) => state.charities);

  useEffect(() => {
    
    if (!favorites){
       dispatch(getUserFavorites());
    }

   if (!charitiesState.loading && (!charitiesState.charities || charitiesState.charities.length === 0)){
      dispatch(getCharities());
    }
  }, [dispatch, charitiesState.charities, charitiesState.loading, favorites]);

  if (loading) {
    return <NormalSpinner />;
  }

  if (error) {
    return <h3>{error?.message || error?.toString() || 'An error occurred'}</h3>;
  }

  if (!favorites?.items || favorites.items.length === 0) {
    return <p>No favorites yet.</p>;
  }

  return (
    <>
      {favorites.items.map((item) => (
        <Row key={item.ebay_id} className="mb-3">
          <ItemListing
            title={item.name}
            image={item.img_url}
            url={item.web_url}
            id={item.ebay_id}
            favorites={favorites.items}
            charity={item.charity}
            price={item.price}
          />
        </Row>
      ))}
    </>
  );
}

export default FavoriteItems;