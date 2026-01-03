import { useEffect, useState } from 'react';
import { BACKEND_API_BASE_URL } from '../constants/apiContants';
import { useParams } from 'react-router-dom'
import NormalSpinner from '../components/Spinner';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { convertIdToCharityName } from '../utilities/Converters';
import { useSelector, useDispatch } from "react-redux";
import { getCharities } from '../actions/charityActions';

function ItemPage() {

    const { item_id } = useParams()
    const [itemData, setItemData] = useState(null)
    const charitiesState = useSelector((state) => state.charities);
    const { errorCharities, loadingCharities, charities} = charitiesState;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!charities || charities.length === 0){
            dispatch(getCharities());
        }
    }, [dispatch, charities]);
    
    useEffect(() => {
        const fetchItem = async () => {
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            const response = await fetch(BACKEND_API_BASE_URL + 'items/ebaycharityitems/' + item_id, config)
            const data = await response.json()
            setItemData(data)
        }

        fetchItem()
    }, [item_id])

    function handleClick(e, url){

        e.preventDefault()

        window.open(url, '_blank');
    }

    if (itemData == null){
        return <NormalSpinner />
    }

    return (
        <>
            <Container className='d-flex flex-column align-items-center mt-4'>
                <h1>{itemData.name}</h1>
            </Container>

            <Container className='d-flex flex-column align-items-center mt-4 mb-4'>
                <Image src={itemData.img_url} style={{maxWidth: '400px'}}/>
            </Container>

            <Container className='d-flex flex-column align-items-center mb-4'>
                <h4>Price: ${itemData.price}</h4>
                <h4>Benefits: {convertIdToCharityName(charities, itemData.charity)}</h4>
                <Button onClick={(e) => handleClick(e,itemData.web_url)}>Go to item on Ebay</Button>
            </Container>
        </>
    )   
}

export default ItemPage