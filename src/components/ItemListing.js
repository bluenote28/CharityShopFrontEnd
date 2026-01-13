import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector} from "react-redux"
import Image from 'react-bootstrap/Image';
import { convertIdToCharityName } from '../utilities/Converters';
import NormalSpinner from './Spinner';
import { useNavigate } from "react-router-dom";
import FavoritesButton from './FavoritesButton';

const imageStyle = {
  width: '100%',
  object: 'cover',
  height: '315px'
}

const bodyStyle = {
  height: '20rem',
  padding: '0',
  backgroundColor: '#eaeaeaff',
  border: 'solid'
}

function ItemListing(props){

  const charitiesState = useSelector((state) => state.charities);
  const { errorCharities, loadingCharities, charities} = charitiesState;
  const favoritesData = useSelector((state) => state.favorites);
  const navigate = useNavigate()

  function handleClick(e, id){
        e.preventDefault()
        navigate("/item/" + id)
  }

if (errorCharities){
  console.log(errorCharities)
}  

else if (loadingCharities){
    return <NormalSpinner />
} 
else if (favoritesData){
    
      return (
      <Container style={bodyStyle}>
         <Row>   
            <Col xs={4}>     
                <Image src={props.image} style={imageStyle}/>
            </Col>         
            <Col xs={8}>      
                <Row className="fs-4 fw-bold"><Col>{props.title}</Col></Row>
                <Row className="fs-3"><Col>Price: ${props.price}</Col></Row>
                <Row className="fs-3"><Col>Benefits: {convertIdToCharityName(charities, props.charity)}</Col></Row>  
                <Row className='mt-3'><Col><Button onClick={(e) => handleClick(e,props.id)}>Go to Item</Button></Col>
                    <Col><FavoritesButton id={props.id}/></Col><Col></Col><Col></Col><Col></Col></Row>             
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
                <Row className="fs-4 fw-bold"><Col>{props.title}</Col></Row>
                <Row className="fs-3"><Col>Price: ${props.price}</Col></Row>
                <Row className="fs-3"><Col>Benefits: {convertIdToCharityName(charities, props.charity)}</Col></Row>
                <Row><Col><Button onClick={(e) => handleClick(e,props.id)}>Go to Item</Button></Col></Row>
            </Col>
        </Row>
      </Container>
      );
    }
}

export default ItemListing;