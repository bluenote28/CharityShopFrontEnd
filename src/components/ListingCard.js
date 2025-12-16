import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux"
import { addFavorite, getUserFavorites, removeFavorite } from '../actions/userActions';
import Image from 'react-bootstrap/Image';
import StarUnchecked from '../images/starunchecked.png'
import StarChecked from '../images/starchecked.png'

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
}

const bodyStyle = {
  height: '10rem',
  padding: '0'
}

function handleClick(e, url){

      e.preventDefault()

      window.open(url, "_blank")

  }

function ListingCard(props) {

  const dispatch = useDispatch()

  function onImageClick(id){

  dispatch(addFavorite(id))

  }

  function onCheckedImageClick(id){

    dispatch(removeFavorite(id))

  }

  function isItemInFavorites(id){
  
    for (let i = 0; i < props.favorites.length; i++){

          if (props.favorites[i].ebay_id === id){
            return true
          }
      }

      return false;

  }

if (props.favorites){
      return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={props.image} style={imageStyle}/>
          <Card.Body style={bodyStyle}>
            <Container className='d-flex flex-column justify-content-around h-100'>
              <Card.Title className='fs-6 px-2'>{props.title}</Card.Title>
              <Container className='d-flex justify-content-between'>
                  <Button className='' onClick={(e) => handleClick(e,props.url)}>Go to Item</Button> 

                  {
                    isItemInFavorites(props.id) ? <Image src={StarChecked} className='w-25' onClick={() => {onCheckedImageClick(props.id)}}/> 
                    : <Image src={StarUnchecked} className='w-25' onClick={() => {onImageClick(props.id)}}/>
                  }

              </Container>
            </Container>
          </Card.Body>
        </Card>
      );
}

else{
      return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={props.image} style={imageStyle}/>
          <Card.Body style={bodyStyle}>
            <Container className='d-flex flex-column justify-content-around h-100'>
              <Card.Title className='fs-6 px-2'>{props.title}</Card.Title>
              <Container className='d-flex justify-content-center'>
                  <Button className='' onClick={(e) => handleClick(e,props.url)}>Go to Item</Button> 
              </Container>
            </Container>
          </Card.Body>
        </Card>
      );
    }
}

export default ListingCard;
