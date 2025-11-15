import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';



function FormPageLayout({children}){


return (    
    <Container>
            <Row>
                <Col></Col>
                <Col>{children}</Col>
                <Col></Col>
            </Row>
    </Container>
)

}

export default FormPageLayout;