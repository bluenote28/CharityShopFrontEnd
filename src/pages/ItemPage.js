import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import NormalSpinner from '../components/Spinner';
import { Container, Row, Col, Button, ButtonGroup, Modal} from 'react-bootstrap';
import { convertIdToCharityName, covertUrlToAffiliateLink, ebayListingUrl } from '../utilities/Converters';
import { useSelector, useDispatch } from "react-redux";
import { getCharities } from '../actions/charityActions';
import { getSingleItem, recordPurchase } from '../utilities/BackEndClient';
import CharityDisplay from '../components/CharityDisplay';
import ItemImageCarousel from '../components/ItemImageCarousel';
import FavoritesButton from '../components/FavoritesButton';
import AiChat from '../components/AiChat';
import { useLocation } from 'react-router-dom';

function todaysDate() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
}

function formatDonationPercentage(value) {
    if (value == null || value === '') {
        return null;
    }
    const number = Number(String(value).replace('%', '').trim());
    if (Number.isNaN(number)) {
        return null;
    }
    return number.toFixed(1);
}

function stateBelongsToItem(state, itemId) {
    if (!state || itemId == null || itemId === '') {
        return false;
    }
    const stateId = state.ebay_id || state.id;
    return stateId != null && String(stateId) === String(itemId);
}

function isCurrentItem(item, itemId) {
    if (!item || itemId == null || itemId === '') {
        return false;
    }
    if (item.ebay_id != null && String(item.ebay_id) === String(itemId)) {
        return true;
    }
    return item.id != null && String(item.id) === String(itemId);
}

function ItemPage() {

    const { item_id } = useParams()
    const charitiesState = useSelector((state) => state.charities);
    const { loading, charities} = charitiesState;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [charity, setCharity] = useState(null);
    const location = useLocation();
    const [itemData, setItemData] = useState(() => (
      stateBelongsToItem(location.state, item_id) ? location.state : {}
    ));
    const [loadingItem, setLoadingItem ] = useState(false)
    const [loadingSellerDescription, setLoadingSellerDescription] = useState(
      Boolean((location.state || {}).name) && (location.state || {}).seller_description == null
    )
    const [showPurchasePrompt, setShowPurchasePrompt] = useState(false)
    const [savingPurchase, setSavingPurchase] = useState(false)
    const [itemFetched, setItemFetched] = useState(false)

    useEffect(() => {
      if (!loading && (!charities || charities.length === 0)){
          dispatch(getCharities());
      }
    }, [dispatch, charities, loading]);

    useEffect(() => {
      const next = stateBelongsToItem(location.state, item_id) ? location.state : {};
      setItemData(next);
      setCharity(null);
      setItemFetched(false);
      setLoadingItem(!next.name);
      setLoadingSellerDescription(Boolean(next.name) && next.seller_description == null);
    }, [item_id]);

    useEffect(() => {
      let cancelled = false;

      async function fetchItem() {
          if (!itemData.name) {
            setLoadingItem(true);
          }
          if (itemData.name && itemData.seller_description == null) {
            setLoadingSellerDescription(true);
          }
          try {
            const data = await getSingleItem(item_id);
            if (!cancelled) {
              setItemData((current) => (
                stateBelongsToItem(current, item_id) ? { ...current, ...data } : data
              ));
            }
          } finally {
            if (!cancelled) {
              setLoadingItem(false);
              setLoadingSellerDescription(false);
              setItemFetched(true);
            }
          }
        }
      fetchItem();
      return () => {
        cancelled = true;
      };
    }, [item_id]);

    const ebayLink = ebayListingUrl(
      itemData.ebay_id || item_id,
      itemData.web_url || itemData.url
    );
    const itemIsCurrent = isCurrentItem(itemData, item_id);

    useEffect(() => {
      if (!loading && itemIsCurrent && itemData) {
        const foundCharity = charities.find((c) => c.id === itemData.charity);
        setCharity(foundCharity);
      }
    }, [itemData, charities, loading, itemIsCurrent])

    function handleClick(e, url){
        e.preventDefault()
        url = covertUrlToAffiliateLink(url);
        window.open(url, '_blank');
        if (userInfo) {
            setShowPurchasePrompt(true);
        }
    }

    function handlePurchaseNo() {
        setShowPurchasePrompt(false);
    }

    async function handlePurchaseYes() {
        const userId = userInfo?.id;
        const token = userInfo?.token || userInfo?.access;
        const charityId = itemData.charity?.id || itemData.charity || charity?.id;
        const donationPercentage = formatDonationPercentage(itemData.donation_percentage);
        const itemName = (itemData.name || '').slice(0, 100);
        const amount = Number(itemData.price);
        const username = userInfo?.username || userInfo?.email;

        if (!userId || !token || !charityId || donationPercentage == null || !itemName || Number.isNaN(amount)) {
            alert('Unable to record this purchase. Please try again after signing in.');
            setShowPurchasePrompt(false);
            return;
        }

        try {
            setSavingPurchase(true);
            await recordPurchase(userId, {
                username,
                user: userId,
                item_name: itemName,
                amount: amount.toFixed(2),
                donation_percentage: donationPercentage,
                charity: charityId,
                purchased_at: todaysDate(),
            }, token);
            setShowPurchasePrompt(false);
        } catch (error) {
            alert(error.message || 'Failed to record purchase');
        } finally {
            setSavingPurchase(false);
        }
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
                <Col sm={6} className='mb-3 mb-sm-0'>
                  <ItemImageCarousel itemData={itemData} />
                </Col>
                <Col sm={6} className='d-flex flex-column align-items-center'>
                <Container className="border rounded-2 mt-2 p-5" style={{backgroundColor: "#f8f9fa"}}>
                  <Row><h2 style={{textAlign:"center"}}>Item Details</h2></Row>
                  <Row><h4>Price: ${itemData.price}</h4></Row>
                  {itemData.shipping_price ? <Row><h4>Shipping: ${itemData.shipping_price}</h4></Row> : <></>}
                  {itemData.condition ? <Row><h4>Condition: {itemData.condition}</h4></Row> : <></>}
                  <Row><h4>Seller: {itemData.seller?.username}</h4></Row>
                  <Row><h4>Total Seller Feedback: {itemData.seller?.feedbackScore}</h4></Row>
                  <Row><h4>Seller Positive Feeback: {itemData.seller?.feedbackPercentage}%</h4></Row>
                  <Row>
                    <h4>
                      Benefits: {(charity?.id || itemData.charity) ? (
                        <Link to={`/charities/${charity?.id || itemData.charity}`}>
                          {convertIdToCharityName(charities, itemData.charity)}
                        </Link>
                      ) : convertIdToCharityName(charities, itemData.charity)}
                    </h4>
                  </Row>
              </Container>
              <ButtonGroup className='mt-3 w-100'>
                <Button variant="primary" onClick={(e) => handleClick(e, ebayLink)}>Go to item on Ebay</Button>
              </ButtonGroup>
              {userInfo && (
                <div className="mt-2 w-100">
                  <FavoritesButton id={itemData.ebay_id || itemData.id || item_id} labeled />
                </div>
              )}
                </Col>
            </Row>
          
          {(loadingSellerDescription || itemData.seller_description) && (
            <Row className="mt-4">
              <Col>
                <Container className="border rounded-2 p-3 p-md-4" style={{backgroundColor: "#f8f9fa"}}>
                  <h3 className="text-center">Description from Seller</h3>
                  {loadingSellerDescription ? (
                    <div className="seller-description-loading">
                      <NormalSpinner />
                    </div>
                  ) : (
                    <div
                      className="seller-description"
                      dangerouslySetInnerHTML={{ __html: itemData.seller_description }}
                    />
                  )}
                </Container>
              </Col>
            </Row>
          )}

          <Row className="mt-4">
            <Col>
              <AiChat
                itemId={item_id}
                itemName={itemData.name}
                ebayId={itemData.ebay_id || item_id}
                itemLink={itemData.web_url || itemData.url}
                existingDescription={itemData.ai_description}
                enabled={itemIsCurrent}
                ready={itemFetched}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <CharityDisplay
                image_url={charity?.image_url}
                description={charity?.description}
                donation_url={charity?.donation_url}
                donation_percentage={itemData.donation_percentage}
                charity_name={charity?.name || convertIdToCharityName(charities, itemData.charity)}
              />
            </Col>
          </Row>
        </Container>
        <Modal show={showPurchasePrompt} onHide={handlePurchaseNo} centered>
          <Modal.Header closeButton>
            <Modal.Title>Did you purchase this item?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please let us know if you purchased this item on eBay.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlePurchaseNo} disabled={savingPurchase}>No</Button>
            <Button variant="primary" onClick={handlePurchaseYes} disabled={savingPurchase}>
              {savingPurchase ? 'Saving...' : 'Yes'}
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
}

export default ItemPage
