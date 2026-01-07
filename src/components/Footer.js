import Image from 'react-bootstrap/Image';
import footerimage from '../images/footerlogo.png'

function Footer(){

    return (

        <footer className='d-flex justify-content-center mt-auto' style={{backgroundColor: "#1406d4", width: "100%"}}>
           <Image src={footerimage} />
        </footer>
    )

}

export default Footer;