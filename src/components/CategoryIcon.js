import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';


function CategoryIcon(props) {

  return (
    <Col>
      <Image src={props.src} fluid rounded onClick={props.onclick} />
    </Col>
  );
}

export default CategoryIcon