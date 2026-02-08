import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import FavoritesButton from "./FavoritesButton";
import { useState, useEffect } from "react";

const imageStyle = {
  width: "100%",
  object: "cover",
  height: "315px",
  cursor: "pointer",
};

const charityImageStyle = {
  margin: "auto", width: "300px", height: "200px", objectFit: "contain"
}

function ItemListing(props) {
  const charitiesState = useSelector((state) => state.charities);
  const { errorCharities, loading, charities } = charitiesState;
  const favoritesData = useSelector((state) => state.favorites);
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

  else if (!favoritesData.error) {

    return (
      <Container className="border" style={{ height: "20rem" }}>
        <Row>
          <Col xs={4}>
            <Image src={props.img_url} style={imageStyle} onClick={(e) => handleClick(e, props.id)}/>
          </Col>
          <Col xs={4} sm={5}>
            <Row sm={1} className="fs-5 fw-bold mt-2">
              <Col style={{ cursor: "pointer" }} onClick={(e) => handleClick(e, props.id)}>
                <h6 className="text-center">{props.name}</h6>
              </Col>
            </Row>
            <Row className="fs-4 mb-3 mt-3 d-flex justify-content-between">
              <Col><h6 className="text-center">Price: ${props.price}</h6></Col>
            </Row>
            <Row className="w-25 m-auto">
              <Col>
                <FavoritesButton id={props.id} />
              </Col>
            </Row>
          </Col>
          <Col xs={4} sm={3} className="bg-light">
            <Row><h4 className="text-center mt-2">Benefits</h4></Row>
            <Row>
              <Image src={charity?.image_url} style={charityImageStyle} />
            </Row>
            <Row>
            <p className="text-center fw-bold">{charity?.name}</p>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
  else {

    return (
      <Container className="border" style={{ height: "20rem" }}>
        <Row>
          <Col xs={4} sm={4}>
            <Image src={props.img_url} style={imageStyle} onClick={(e) => handleClick(e, props.id)}/>
          </Col>
          <Col xs={4} sm={5}>
            <Row className="fs-5 fw-bold mt-2">
              <Col style={{ cursor: "pointer" }} onClick={(e) => handleClick(e, props.id)}>
                <h6 className="text-center">{props.name}</h6>
              </Col>
            </Row>
            <Row className="fs-4 mb-3 mt-3 d-flex justify-content-between">
              <Col><h6 className="text-center">Price: ${props.price}</h6></Col>
            </Row>
          </Col>
          <Col xs={4} sm={3} className="bg-light">
            <Row><h4 className="text-center mt-2">Benefits</h4></Row>
            <Row>
              <Image src={charity?.img_url} style={charityImageStyle} />
            </Row>
            <Row>
            <p className="text-center fw-bold">{charity?.name}</p>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ItemListing;
