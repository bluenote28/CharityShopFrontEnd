import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LoginFormContainer({children}) {
  return (

        <Container className='mt-5'>
            <Row>
                <Col>
                    {children}
                </Col>
            </Row>
        </Container>
  
  );
}

export default LoginFormContainer;
