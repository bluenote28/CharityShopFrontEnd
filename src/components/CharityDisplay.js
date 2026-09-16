import { Container, Row, Col, Image } from 'react-bootstrap';

function formatDonationPercent(value) {
  if (value == null || value === '') {
    return null;
  }

  const text = String(value).trim();
  if (!text) {
    return null;
  }

  return text.endsWith('%') ? text : `${text}%`;
}

function CharityDisplay(props){
  const donationPercent = formatDonationPercent(props.donation_percentage);
  const charityName = props.charity_name;

  return (
    <Container className='border rounded-3 mt-3 mb-5 p-3'>
      <Row>
        <Col sm={4} className='d-flex justify-content-end'>
          <Image style={{ margin: "auto", width: "300px", height: "200px", objectFit: "contain" }}
            className='mb-1' src={props.image_url} />
        </Col>
        <Col sm={4} className='d-flex flex-column justify-content-center'>
          {donationPercent && charityName && (
            <p className="fw-semibold mb-2">
              {donationPercent} of this sale will benefit {charityName}
            </p>
          )}
          <p className="mb-0">{props.description}</p>
        </Col>
        <Col sm={4} className='d-flex align-items-center justify-content-center'>
          <Row><a href={props.donation_url}>Support</a></Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CharityDisplay
