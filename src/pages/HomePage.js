import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image';
import CharityShopLogo from '../images/charityShopLogo.png'
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '../components/CategoryIcon';
import { CATEGORY_OPTIONS } from "../constants/categoryFilterOptions";

function HomePage() {

    const navigate = useNavigate();

    function loadIcons(){
        const icons = []

        for (let i = 1; i < CATEGORY_OPTIONS.length; i++) {
            icons.push(
                <CategoryIcon
                    key={CATEGORY_OPTIONS[i].value}
                    src={'icons/' + CATEGORY_OPTIONS[i].value + '.png'}
                    label={CATEGORY_OPTIONS[i].label}
                    onclick={() => navigate(`/category?category=${encodeURIComponent(CATEGORY_OPTIONS[i].label)}`)}
                />
            )
        }

        return icons
    }

    return (
        <>
            <Container className="px-3">
                <Row className="justify-content-center">
                    <Col xs={10} sm={8} md={6} className="d-flex justify-content-center py-3">
                        <Image src={CharityShopLogo} alt="Charity Shop" fluid className="home-logo" />
                    </Col>
                </Row>
                <Row className="g-2 g-md-3 pb-4">
                    {loadIcons()}
                </Row>
            </Container>
        </>
    )
}

export default HomePage
