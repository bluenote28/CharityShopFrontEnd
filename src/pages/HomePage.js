import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image';
import acMarketing from '../images/acMarketingLogo.png'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CategoryIcon from '../components/CategoryIcon';
import { CATEGORY_OPTIONS } from "../constants/categoryFilterOptions";
import formatItemsIntoRows from '../utilities/ItemsGridFormatter';
import SearchBar from '../components/SearchBar';

function HomePage() {

    const navigate = useNavigate();
    const [category, setCategory] = useState("")
    const icons = []

    if (category) {
        navigate(`/search?category=${category}`)
    }  
     
    function loadIcons(){

        for (let i = 1; i < CATEGORY_OPTIONS.length; i++) {
            icons.push(<CategoryIcon src={'icons/' + CATEGORY_OPTIONS[i].value + '.png'} onclick={() => setCategory(CATEGORY_OPTIONS[i].value)} />)
        }

        return formatItemsIntoRows(icons, 3);

    }

    return (
        <>
            <Container>
                <Row>
        
                        <Container className='d-flex justify-content-center'>
                            <Image src={acMarketing} fluid />
                    
                            <Container className='align-self-center mx-2 mt-5'>
                            <h4 style={{textAlign:'center'}}>About Us</h4>
                            <p>AC Marketing is a company that works very closely with non-profit organizations. We have created this site to highlight our
                                amazing clients all in one place. Every item you see on this site benefits charity anywhere from 10 to 100%. The site works along side with Ebay to
                                host these listings and allow users to purchase these items. We hope you enjoy our site and help charity in any way possible.
                            </p>
                            </Container>
                        </Container>
                
                </Row>
           
            </Container>        

            <Container>
                <Row>
                    <SearchBar />
                </Row>
                {   
                    loadIcons().map((item, index) => { 
                            
                            return (
                                    <Row key={index} sm={3} className='mb-3'>
                                        {item.map((item) => { return item }
                                            )}
                                    </Row>
                                )}
                            )      
                } 
            </Container>
        
        </>
    )   
}

export default HomePage