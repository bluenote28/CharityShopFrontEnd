import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import StarUnchecked from '../images/starunchecked.png'
import StarChecked from '../images/starchecked.png'
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from '../actions/userActions';
import NormalSpinner from './Spinner';

function FavoritesButton(props) {
  const favoritesData = useSelector((state) => state.favorites);
  const { error, loading, favorites } = favoritesData
  const isFavorite = favorites?.items?.some(item => item.ebay_id === props.id);
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch()

  const handleClick = (id) => {

        if (isFavorite){
            dispatch(removeFavorite(id))
        }
        else{
            dispatch(addFavorite(id))
        }

        setPending(false)
    } 

  return (
    <Button
      variant="outline-light"
      onClick={() => {setPending(true); setTimeout(() => handleClick(props.id), 300)}}
      disabled={pending}
    >
      {pending || loading ? <NormalSpinner /> : <Image src={isFavorite ? StarChecked : StarUnchecked} />}
     </Button>
  );
}

export default FavoritesButton;