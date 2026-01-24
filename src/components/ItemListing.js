import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import NormalSpinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import FavoritesButton from "./FavoritesButton";
import { useState } from "react";

const imageStyle = {
  width: "100%",
  object: "cover",
  height: "315px",
  cursor: "pointer",
};

function ItemListing(props) {
  const charitiesState = useSelector((state) => state.charities);
  const { errorCharities, loadingCharities, charities } = charitiesState;
  const favoritesData = useSelector((state) => state.favorites);
  const navigate = useNavigate();
  const [charity, SetCharity] = useState(null);

  function handleClick(e, id) {
    e.preventDefault();
    navigate("/item/" + id);
  }

  function loadCharity() {
    const charity = charities.find((charity) => charity.id === props.charity);
    SetCharity(charity);
  }

  if (errorCharities) {
    console.log(errorCharities);
  }
  else if (loadingCharities) {
    return <NormalSpinner />;
  }
  else if (!favoritesData.error) {
    if (!charity) {
      loadCharity();
    }

    return (
      <Container className="border" style={{ height: "20rem" }}>
        <Row>
          <Col xs={4}>
            <Image
              src={props.image}
              style={imageStyle}
              onClick={(e) => handleClick(e, props.id)}
            />
          </Col>
          <Col>
            <Row className="fs-5 fw-bold">
              <Col className="d-flex justify-content-between">
                <h5
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleClick(e, props.id)}
                >
                  {props.title}
                </h5>
              </Col>
            </Row>
            <Row className="fs-4 mb-3 d-flex justify-content-between">
              <Col>Price: ${props.price}</Col>
            </Row>
            <Row>
              <Col>
                <FavoritesButton id={props.id} />
              </Col>
              <Col>
                <Image src={charity?.image_url} style={{ width: "300px", height: "200px" }} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
  else {
    if (!charity) {
      loadCharity();
    }

    return (
      <Container className="border" style={{ height: "20rem" }}>
        <Row>
          <Col xs={4}>
            <Image
              src={props.image}
              style={imageStyle}
              onClick={(e) => handleClick(e, props.id)}
            />
          </Col>
          <Col>
            <Row className="fs-5 fw-bold">
              <Col
                style={{ cursor: "pointer" }}
                onClick={(e) => handleClick(e, props.id)}
              >
                <h5>{props.title}</h5>
              </Col>
            </Row>
            <Row className="fs-4 mb-3 mt-3 d-flex justify-content-between">
              <Col>Price: ${props.price}</Col>
              <Col className="">
                <Image
                  src={charity?.image_url}
                  style={{ width: "300px", height: "200px" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ItemListing;
