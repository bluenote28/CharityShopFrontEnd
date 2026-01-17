import { useEffect, useState } from 'react';
import { BACKEND_API_BASE_URL } from '../constants/apiContants';
import { useParams, useNavigate } from 'react-router-dom'
import NormalSpinner from '../components/Spinner';
import { Container, Row, Col, Image, Button, ButtonGroup} from 'react-bootstrap';
import { convertIdToCharityName, covertUrlToAffiliateLink, convertItemPageImageUrl } from '../utilities/Converters';
import { useSelector, useDispatch } from "react-redux";
import { getCharities } from '../actions/charityActions';

function ItemPage() {

    const { item_id } = useParams()
    const [itemData, setItemData] = useState(null)
    const charitiesState = useSelector((state) => state.charities);
    const { errorCharities, loading, charities} = charitiesState;
    const dispatch = useDispatch();
    const [allImages, setAllImages ] = useState(null)
    const navigate = useNavigate()
    const [mainImageUrl, setMainImageUrl] = useState(null); 
    const MAIN_IMAGE_STYLE = {
         maxWidth: '100%',
         height: '500px',
         objectFit: 'contain'
    }

    const MAIN_IMAGE_CONTAINER_STYLE = {
        maxWidth: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        overflow: "hidden"
    }

    const SMALL_IMAGE_STYLE = {
        width: "80px",
        height: "80px",
        cursor: 'pointer' 
    }

    useEffect(() => {
        if (!loading && (!charities || charities.length === 0)){
            dispatch(getCharities());
        }
    }, [dispatch, charities, loading]);
    
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
            setAllImages([{"imageUrl": itemData.img_url}].concat(itemData.additional_images?.additionalImages || []))
            setMainImageUrl(itemData.img_url)
        }
    }, [item_id, itemData])

    function handleClick(e, url){
        e.preventDefault()
        url = covertUrlToAffiliateLink(url);
        window.open(url, '_blank');
    }

    if (itemData == null || loading || !charities){
        return <NormalSpinner />
    }

    return (
        <>
        <Container className='mt-3'>
            <Row>
                <h2 style={{textAlign: "center"}}>{itemData.name}</h2>
            </Row>
            <Row>
              <Container className='d-flex justify-content-around mt-3'>
                <ButtonGroup>
                    <Button variant="outline-dark" onClick={() => navigate(-1)}>Go back to search results</Button>
                    <Button variant="outline-dark" onClick={(e) => handleClick(e,itemData.web_url)}>Go to item on Ebay</Button>
                </ButtonGroup>
              </Container>
            </Row>

            <Row className='mt-4'>
                <Col>
                  <Container style={MAIN_IMAGE_CONTAINER_STYLE}>
                  <Image src={mainImageUrl} style={MAIN_IMAGE_STYLE} fluid />
                  </Container>
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
            <Row className='mt-2'>
                <Container>
                  {allImages ? allImages.map((item,index) => {
                    return <Image key={index} style={SMALL_IMAGE_STYLE} src={convertItemPageImageUrl(item.imageUrl)} thumbnail onClick={() => {
                        setMainImageUrl(convertItemPageImageUrl(item.imageUrl))
                    }} />}) : <></>
                  }
                </Container>
            </Row>
        </Container>
        </>
    )   
}

export default ItemPage