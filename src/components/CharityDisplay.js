import { Container, Row, Col, Image } from 'react-bootstrap';

function CharityDisplay(props){

return (
  <Container className='border rounded-3 mt-3 mb-5 p-3'>
    <Row>
      <Col sm={4} className='d-flex justify-content-end'>
        <Image style={{ margin: "auto", width: "300px", height: "200px", objectFit: "contain" }}
          className='mb-1' src={props.image_url} />
      </Col>
      <Col sm={4} className='d-flex align-items-center'>
        <Row><p>{props.description}</p></Row>
      </Col>
      <Col sm={4} className='d-flex align-items-center justify-content-center'>
        <Row><a href={props.donation_url}>Support</a></Row>
      </Col>
    </Row>
  </Container>

    );
}

export default CharityDisplay
