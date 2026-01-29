import { Container, Row, Col } from "react-bootstrap"
import CharityShopCard from "../components/CharityShopsCard"

function DirectoryPage() {

    return (

      <>
        <h1 className="text-center">Directory of not-for-profit shops</h1>

        <Container className="mb-5">
          <h2 className="text-center mb-3">Food and Drink</h2>
          <Row>
            <Col>
              <CharityShopCard url={"https://www.mysticmonkcoffee.com/"}
                image_url={"https://www.mysticmonkcoffee.com/cdn/shop/files/Web_logo_2_7c9a958a-48df-4880-8b03-87902c2525cb.png?v=1630574429&width=140"}
                name={"Mystic Monk Coffee"}
                description={"Sells coffee and tea to support their monastery"}
              />
            </Col>
            <Col>
              <CharityShopCard url={"https://monasterygreetings.com/"}
                image_url={"https://monasterygreetings.com/cdn/shop/files/Monastery_Greetings_Logo.jpg?v=1736458211&width=600"}
                name={"Monastery Greetings "}
                description={"Sells products from Abbeys, Convents, Hermitages & Monasteries"}
              />
            </Col>
          </Row>
        </Container>

        <Container className="mb-5">
          <h2 className="text-center mb-3">General Merchandise</h2>
          <Row>
            <Col>
              <CharityShopCard url={"https://giftshop.stjude.org/index"}
                image_url={"https://giftshop.stjude.org/on/demandware.static/Sites-giftshop-Site/-/default/dwd0f84bb9/images/logo.png"}
                name={"St. Jude Gift Shop"}
                description={"Sells merchandise to support St Jude's Research Hospital"}
              />
            </Col>
          </Row>
        </Container>

        <Container className="mb-5">
          <h2 className="text-center mb-3">Arts and Crafts</h2>
          <Row>
            <Col>
              <CharityShopCard url={"https://globalgoodspartners.org/"}
                image_url={"https://globalgoodspartners.org/cdn/shop/files/GGP-logo-website.png?v=1738786034&width=300"}
                name={"Global Goods Partners"}
                description={"Sells crafts to support artisans"}
              />
            </Col>
          </Row>
        </Container>





      </>
    )
}

export default DirectoryPage
