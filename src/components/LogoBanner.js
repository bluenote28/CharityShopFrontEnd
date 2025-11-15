import Image from 'react-bootstrap/Image';
import acMarketingBanner from '../images/acMarketingBanner.png';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/esm/Row';

function LogoBanner(){

    return (
        <Row className='w-50 m-auto'>
            <Image src={acMarketingBanner}/>
        </Row> )
  

}

export default LogoBanner;