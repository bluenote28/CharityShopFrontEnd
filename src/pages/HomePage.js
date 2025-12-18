import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image';
import CharityShopLogo from '../images/charityShopLogo.png'
import { Col, Row } from 'react-bootstrap';
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
                        <Image src={CharityShopLogo} fluid/>
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
                                    <Row key={index} className='mb-3'>
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