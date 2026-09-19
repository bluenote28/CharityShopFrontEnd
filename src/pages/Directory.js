import { Container, Row, Col } from "react-bootstrap"
import CharityShopCard from "../components/CharityShopsCard"
import { DIRECTORY } from "../constants/directoryConstants"

const categoryKeys = Object.keys(DIRECTORY)

function DirectoryPage() {

    return (

      <>
        <h1 className="text-center">Other ways to shop for charity</h1>

        {
          categoryKeys.map((category) => {
            return (
              <Container className="mb-5" key={category}>
                <h2 className="text-center mb-3">{category}</h2>
                <Row>
                  {
                    DIRECTORY[category].map((shop) => {
                      return (
                        <Col key={shop.url}>
                          <CharityShopCard
                            url={shop.url}
                            image_url={shop.image_url}
                            name={shop.name}
                            description={shop.description}
                          />
                        </Col>
                      )
                    })
                  }
                </Row>
              </Container>
            )
          })
        }

      </>
    )
}

export default DirectoryPage
