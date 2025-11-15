import Image from 'react-bootstrap/Image';
import footerimage from '../images/footerlogo.png'
import Container from 'react-bootstrap/Container'

function Footer(){


    return (

        <Container className='d-flex flex-column w-25 m-auto mt-5'>
              <Image src={footerimage} />
        </Container>
    )

}

export default Footer;