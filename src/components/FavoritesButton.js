import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import StarUnchecked from '../images/starunchecked.png'
import StarChecked from '../images/starchecked.png'
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from '../actions/userActions';
import { useRef } from 'react';

function FavoritesButton({ id, labeled = false }) {
  const favoritesData = useSelector((state) => state.favorites);
  const { favorites } = favoritesData
  const isFavorite = favorites?.items?.some(item => item.ebay_id === id);
  const pendingRef = useRef(false);
  const dispatch = useDispatch()

  const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (pendingRef.current) {
            return;
        }

        pendingRef.current = true;
        const request = isFavorite ? dispatch(removeFavorite(id)) : dispatch(addFavorite(id));
        Promise.resolve(request).finally(() => {
            pendingRef.current = false;
        });
    }

  const label = isFavorite ? 'Remove from Watch List' : 'Add to Watch List';

  if (labeled) {
    return (
      <Button
        type="button"
        className="favorites-button w-100 d-flex align-items-center justify-content-center gap-2"
        variant={isFavorite ? "outline-secondary" : "outline-primary"}
        onClick={handleClick}
        aria-pressed={!!isFavorite}
        aria-label={label}
      >
        <Image src={isFavorite ? StarChecked : StarUnchecked} alt="" style={{ pointerEvents: 'none', width: 24, height: 24 }} />
        {label}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      className="favorites-button"
      variant="outline-light"
      onClick={handleClick}
      aria-pressed={!!isFavorite}
      aria-label={label}
    >
      <Image src={isFavorite ? StarChecked : StarUnchecked} alt="" style={{ pointerEvents: 'none' }} />
    </Button>
  );
}

export default FavoritesButton;
