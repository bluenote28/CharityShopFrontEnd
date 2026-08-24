import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import StarUnchecked from '../images/starunchecked.png'
import StarChecked from '../images/starchecked.png'
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from '../actions/userActions';
import { useRef } from 'react';

function FavoritesButton(props) {
  const favoritesData = useSelector((state) => state.favorites);
  const { favorites } = favoritesData
  const isFavorite = favorites?.items?.some(item => item.ebay_id === props.id);
  const pendingRef = useRef(false);
  const dispatch = useDispatch()

  const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (pendingRef.current) {
            return;
        }

        pendingRef.current = true;
        const request = isFavorite ? dispatch(removeFavorite(props.id)) : dispatch(addFavorite(props.id));
        Promise.resolve(request).finally(() => {
            pendingRef.current = false;
        });
    }

  return (
    <Button
      type="button"
      variant="outline-light"
      onClick={handleClick}
      aria-pressed={!!isFavorite}
      aria-label={isFavorite ? 'Remove from watch list' : 'Add to watch list'}
    >
      <Image src={isFavorite ? StarChecked : StarUnchecked} alt="" style={{ pointerEvents: 'none' }} />
    </Button>
  );
}

export default FavoritesButton;
