import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
}

const bodyStyle = {
  height: '9rem',
}


function handleClick(e, url){

      e.preventDefault()

      window.open(url, "_blank")

  }


function ListingCard(props) {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.image} style={imageStyle}/>
      <Card.Body style={bodyStyle}>
        <Card.Title className='fs-6'>{props.title}</Card.Title>
        <Button onClick={(e) => handleClick(e,props.url)}>Go to Item</Button>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
