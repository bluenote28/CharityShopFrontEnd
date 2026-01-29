import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function handleClick(url) {
  window.open(url, '_blank');
}

function CharityShopCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.image_url}
        style={{ margin: "auto", width: "200px", height: "200px", objectFit: "contain" }} />
      <Card.Body className='d-flex flex-column justify-content-center'>
        <Card.Title>{props.charity_name}</Card.Title>
        <Card.Text>
         {props.description}
        </Card.Text>
        <Button variant="primary" onClick={()=> handleClick(props.url)}>View Shop</Button>
      </Card.Body>
    </Card>
  );
}

export default CharityShopCard;
