import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import NormalSpinner from '../components/Spinner';
import { Container, Row, Col, Image, Button, ButtonGroup} from 'react-bootstrap';
import { convertIdToCharityName, covertUrlToAffiliateLink, convertItemPageImageUrl } from '../utilities/Converters';
import { useSelector, useDispatch } from "react-redux";
import { getCharities } from '../actions/charityActions';
import { getSingleItem } from '../utilities/BackEndClient';
import CharityDisplay from '../components/CharityDisplay';
import { useLocation } from 'react-router-dom';

function ItemPage() {

    const { item_id } = useParams()
    const charitiesState = useSelector((state) => state.charities);
    const { errorCharities, loading, charities} = charitiesState;
    const dispatch = useDispatch();
    const [allImages, setAllImages ] = useState(null)
    const navigate = useNavigate()
    const [mainImageUrl, setMainImageUrl] = useState(null);
    const [charity, setCharity] = useState(null);
    const location = useLocation();
    const [itemData, setItemData] = useState(location.state || {});
    const [loadingItem, setLoadingItem ] = useState(false)

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

    console.log(itemData)

    useEffect(() => {
      if (!loading && (!charities || charities.length === 0)){
          dispatch(getCharities());
      }
    }, [dispatch, charities, loading]);

    useEffect(() => {
      async function fetchItem() {
          if (!itemData.name) {
            setLoadingItem(true);
            const data = await getSingleItem(item_id);
            setItemData(data);
            setLoadingItem(false);
          }
        }
      fetchItem();
    }, [item_id, itemData.name]);

    useEffect(() => {

      if (itemData){
        setAllImages([{"imageUrl": itemData.img_url}].concat(itemData.additional_images?.additionalImages || []))
        setMainImageUrl(itemData.img_url)
      }

      if (!charity && !loading && itemData) {
        const foundCharity = charities.find((c) => c.id === itemData.charity);
        setCharity(foundCharity);
      }
    }, [itemData, charities, charity, loading])

    function handleClick(e, url){
        e.preventDefault()
        url = covertUrlToAffiliateLink(url);
        window.open(url, '_blank');
    }

    if (loading || !charities|| loadingItem){
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
                    <Row><h4>Seller: {itemData.seller?.username}</h4></Row>
                    <Row><h4>Total Seller Feedback: {itemData.seller?.feedbackScore}</h4></Row>
                    <Row><h4>Seller Positive Feeback: {itemData.seller?.feedbackPercentage}%</h4></Row>
                    <Row><h4>Benefits: {convertIdToCharityName(charities, itemData.charity)}</h4></Row>
              </Container>
              <ButtonGroup className='mt-3 w-100'>
                <Button variant="primary" onClick={(e) => handleClick(e,itemData.web_url)}>Go to item on Ebay</Button>
              </ButtonGroup>
                </Col>
            </Row>
            <Row className='d-flex justify-content-start mt-4'>
                <Col>
                  {allImages && allImages.length > 1 ?
                  <Container className='border rounded-2 py-2'>
                   <h5 style={{textAlign:"center"}}>All Images</h5>
                  {allImages ? allImages.map((item,index) => {
                    return <Image key={index} style={SMALL_IMAGE_STYLE} src={convertItemPageImageUrl(item.imageUrl)} thumbnail onClick={() => {
                        setMainImageUrl(convertItemPageImageUrl(item.imageUrl))
                    }} />}) : <></>
                  }
                  </Container>
                  : <></>
                  }
                </Col>
                <Col></Col>
          </Row>

          <Row>
            <Col>
              <CharityDisplay image_url={charity?.image_url} description={charity?.description} donation_url={charity?.donation_url} />
            </Col>
          </Row>
        </Container>
        </>
    )
}

export default ItemPage
