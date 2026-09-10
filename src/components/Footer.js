import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import footerimage from '../images/footerlogo.png'

function Footer(){
    const user = useSelector((state) => state.userLogin);
    const { userInfo } = user

    return (

        <footer className='d-flex flex-column justify-content-center align-items-center mt-auto' style={{backgroundColor: "#1406d4", width: "100%"}}>
           <Image src={footerimage} />
           <div className="d-flex flex-row align-items-center gap-3 mb-5">
             <Link to="/about" className="footer-about-link">About</Link>
             {userInfo?.isAdmin && (
               <Link to="/admin" className="footer-about-link">Admin</Link>
             )}
           </div>
        </footer>
    )

}

export default Footer;