import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import FavoritesButton from "./FavoritesButton";
import { useState, useEffect } from "react";

function CharityImage({ charity, itemId }) {
  const image = (
    <Image
      src={charity?.image_url}
      alt=""
      className="item-listing-charity-image"
    />
  );

  if (!charity?.name) {
    return image;
  }

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`charity-tooltip-${itemId}`}>{charity.name}</Tooltip>}
    >
      <span className="item-listing-charity">
        {image}
        <span className="item-listing-charity-name d-md-none">{charity.name}</span>
      </span>
    </OverlayTrigger>
  );
}

function ItemListing(props) {
  const charitiesState = useSelector((state) => state.charities);
  const { errorCharities, loading, charities } = charitiesState;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    if (charities && props.charity && !charity) {
       const foundCharity = charities.find((c) => c.id === props.charity);
       setCharity(foundCharity);
     }
  }, [charities, props.charity, charity, loading]);

  function handleClick(e, id) {
    e.preventDefault();
    navigate("/item/" + id, {
      state: props,
  });
  }

  if (errorCharities) {
    console.log(errorCharities);
  }

  else {

    return (
      <Container fluid className="item-listing border rounded-3">
        <Row className="g-2 g-md-0 align-items-center">
          <Col xs={5} md={4} className="p-2">
            <div className="item-listing-image-wrap" onClick={(e) => handleClick(e, props.id)}>
              <Image src={props.img_url} alt="" />
            </div>
          </Col>
          <Col xs={7} md={5} className="item-listing-details py-2">
            <h6 className="item-listing-title" onClick={(e) => handleClick(e, props.id)}>
              {props.name}
            </h6>
            <p className="item-listing-price">Price: ${props.price}</p>
            {userInfo && (
              <div className="item-listing-favorite">
                <FavoritesButton id={props.id} />
              </div>
            )}
          </Col>
          <Col xs={12} md={3} className="item-listing-benefits">
            <div className="item-listing-benefits-label">Benefits</div>
            <CharityImage charity={charity} itemId={props.id} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ItemListing;
