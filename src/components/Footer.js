import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import footerimage from '../images/footerlogo.png'

function Footer(){

    return (

        <footer className='d-flex flex-column justify-content-center align-items-center mt-auto' style={{backgroundColor: "#1406d4", width: "100%"}}>
           <Image src={footerimage} />
           <Link to="/about" className="footer-about-link mb-5">About</Link>
        </footer>
    )

}

export default Footer;