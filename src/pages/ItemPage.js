import { useEffect, useState } from 'react';
import { BACKEND_API_BASE_URL } from '../constants/apiContants';
import { useParams, useNavigate, Link } from 'react-router-dom'
import NormalSpinner from '../components/Spinner';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { convertIdToCharityName, covertUrlToAffiliateLink } from '../utilities/Converters';
import { useSelector, useDispatch } from "react-redux";
import { getCharities } from '../actions/charityActions';
import ImageCarousel from '../components/ImageCarousel';

function ItemPage() {

    const { item_id } = useParams()
    const [itemData, setItemData] = useState(null)
    const charitiesState = useSelector((state) => state.charities);
    const { errorCharities, loadingCharities, charities} = charitiesState;
    const dispatch = useDispatch();
    const [mainImage, setMainImage] = useState(null)
    const [altImages, setAltImages ] = useState(null)
    const navigate = useNavigate()

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

        if (!itemData){
            fetchItem()
        }

        if (itemData){
            setMainImage(itemData.img_url)
            setAltImages(itemData.additional_images.additionalImages)
        }
    }, [item_id, itemData])

    function handleClick(e, url){
        e.preventDefault()
        url = covertUrlToAffiliateLink(url);
        window.open(url, '_blank');
    }

    if (itemData == null){
        return <NormalSpinner />
    }

    console.log(itemData)

    return (
        <>
        <Container className='mt-3'>
            <Row>
                <h2 style={{textAlign: "center"}}>{itemData.name}</h2>
            </Row>
            <Row>
              <Container className='d-flex justify-content-around mt-3'>
                <Link onClick={() => navigate(-1)}>Go back to search results</Link>
                <Link onClick={(e) => handleClick(e,itemData.web_url)}>Go to item on Ebay</Link>
              </Container>
            </Row>
            <Row className='mt-4'>
                <Col className='d-flex flex-column align-items-center'>
                   <Row><ImageCarousel mainImage={mainImage} altImages={altImages} /></Row>
                </Col>
                <Col className='d-flex flex-column align-items-center'>
                    <Container className="border rounded-2 mt-2 p-5" style={{backgroundColor: "#f8f9fa"}}>
                        <Row><h2 style={{textAlign:"center"}}>Item Details</h2></Row>
                        <Row><h4>Price: ${itemData.price}</h4></Row>
                        {itemData.shipping_price ? <Row><h4>Shipping: ${itemData.shipping_price}</h4></Row> : <></>}
                        {itemData.condition ? <Row><h4>Condition: {itemData.condition}</h4></Row> : <></>}
                        <Row><h4>Seller: {itemData.seller.username}</h4></Row>
                        <Row><h4>Total Seller Feedback: {itemData.seller.feedbackScore}</h4></Row>
                        <Row><h4>Seller Positive Feeback: {itemData.seller.feedbackPercentage}%</h4></Row>
                        <Row><h4>Benefits: {convertIdToCharityName(charities, itemData.charity)}</h4></Row>
                    </Container>
                </Col>
            </Row>
        </Container>
        </>
    )   
}

export default ItemPage