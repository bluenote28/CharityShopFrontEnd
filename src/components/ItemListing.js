import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux"
import { addFavorite, removeFavorite } from '../actions/userActions';
import Image from 'react-bootstrap/Image';
import StarUnchecked from '../images/starunchecked.png'
import StarChecked from '../images/starchecked.png'
import {Row, Col} from 'react-bootstrap'
import { convertIdToCharityName } from '../utilities/Converters';
import NormalSpinner from './Spinner';

const imageStyle = {
  width: '100%',
  object: 'cover',
  height: '315px'
}

const bodyStyle = {
  height: '20rem',
  padding: '0',
  backgroundColor: '#dd1f7eff',
  border: 'solid'
}

function ItemListing(props){

  const dispatch = useDispatch()
  const charitiesState = useSelector((state) => state.charities);
  const { errorCharities, loadingCharities, charities} = charitiesState;

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

   function handleClick(e, url){

        e.preventDefault()

        window.open(url, "_blank")

    }

if (errorCharities){
    console.log(errorCharities)
}  

else if (loadingCharities){
    return <NormalSpinner />
} 
else if (props.favorites){
    
      return (
      <Container style={bodyStyle}>
         <Row>   
            <Col xs={4}>     
                <Image src={props.image} style={imageStyle}/>
            </Col>         
            <Col xs={8}>      
                <Row className="fs-4 text-white fw-bold"><Col>{props.title}</Col></Row>
                <Row className="fs-3 text-white"><Col>Price: ${props.price}</Col></Row>
                <Row className="fs-3 text-white"><Col>Benefits: {convertIdToCharityName(charities, props.charity)}</Col></Row>
                {
                    isItemInFavorites(props.id) ? 
                    <Row className='mt-3'><Col><Button onClick={(e) => handleClick(e,props.url)}>Go to Item</Button></Col>
                                                                       <Col><Image src={StarChecked} onClick={() => {onCheckedImageClick(props.id)}}/></Col><Col></Col><Col></Col><Col></Col></Row>
                    : 
                    <Row className='mt-3'><Col><Button onClick={(e) => handleClick(e,props.url)}>Go to Item</Button></Col>
                                                                       <Col><Image src={StarUnchecked} onClick={() => {onImageClick(props.id)}}/></Col><Col></Col><Col></Col><Col></Col></Row>           
                }
            </Col>   
        </Row>
      </Container>
      );
}

else{
      return (
       
        <Container style={bodyStyle}>
         <Row>   
            <Col xs={4}>     
                <Image src={props.image} style={imageStyle}/>
            </Col>
            <Col xs={8}>      
                <Row className="fs-4 text-white fw-bold"><Col>{props.title}</Col></Row>
                <Row className="fs-3 text-white"><Col>Price: ${props.price}</Col></Row>
                <Row className="fs-3 text-white"><Col>Benefits: {convertIdToCharityName(charities, props.charity)}</Col></Row>
                <Row><Col><Button onClick={(e) => handleClick(e,props.url)}>Go to Item</Button></Col></Row>
            </Col>
        </Row>
      </Container>
      );
    }
}

export default ItemListing;