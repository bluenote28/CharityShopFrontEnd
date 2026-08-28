import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';

function CategoryIcon(props) {

return (
  <Col xs={6} md={4} className="mb-2 mb-md-3">
      <Image src={props.src} alt={props.label || ''} fluid rounded 
        onClick={props.onclick}
        className="home-category-icon"
        style={{ cursor: 'pointer' }} />
  </Col>
  );
}

export default CategoryIcon
