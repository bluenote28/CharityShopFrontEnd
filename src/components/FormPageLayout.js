import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';



function FormPageLayout({children}){


return (    
    <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={6} lg={5}>
                    {children}
                </Col>
            </Row>
    </Container>
)

}

export default FormPageLayout;
