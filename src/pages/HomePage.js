import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image';
import CharityShopLogo from '../images/charityShopLogo.png'
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
                            <Image src={CharityShopLogo} fluid />
                    
                            <Container className='align-self-center mx-5 mb-5'>
                            <h4 style={{textAlign:'center'}}>About Us</h4>
                            <p>The Charity Shop is a site that filters listings on Ebay that benefits charity. Every item you see on this site benefits charity anywhere from 10 to 100%</p>
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