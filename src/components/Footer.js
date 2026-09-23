import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import footerimage from '../images/footerlogo.png'

function Footer(){
    const user = useSelector((state) => state.userLogin);
    const { userInfo } = user

    return (

        <footer className="marketplace-footer">
           <Image src={footerimage} alt="Charity Shop" className="marketplace-footer-logo" />
           <div className="d-flex flex-row align-items-center gap-3 mb-4">
             <Link to="/about" className="marketplace-footer-link">About</Link>
             <Link to="/directory" className="marketplace-footer-link">Other Charity Shops</Link>
             {userInfo?.isAdmin && (
               <Link to="/admin" className="marketplace-footer-link">Admin</Link>
             )}
           </div>
        </footer>
    )

}

export default Footer;