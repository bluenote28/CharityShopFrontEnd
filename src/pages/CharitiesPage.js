import { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NormalSpinner from '../components/Spinner';

function CharitiesPage() {
    const navigate = useNavigate();
    const charitiesState = useSelector((state) => state.charities);
    const { loading, charities } = charitiesState;
    const [filter, setFilter] = useState('');

    if (loading || !charities) {
        return <NormalSpinner />;
    }

    const visibleCharities = charities
        .filter((charity) => charity.name.toLowerCase().includes(filter.trim().toLowerCase()))
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Container className="mt-3 mb-5">
            <h1 className="text-center">Shop by Charity</h1>
            <p className="text-center mb-4">Choose a charity to view and search items that benefit it.</p>
            <Form.Control
                className="mb-4"
                type="search"
                placeholder="Search charities"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            {visibleCharities.length === 0 ? (
                <p className="text-center">No charities to display.</p>
            ) : (
                <Row className="g-3">
                    {visibleCharities.map((charity) => (
                        <Col key={charity.id} xs={12} sm={6} md={4} lg={3}>
                            <Card
                                className="charity-browse-card h-100"
                                onClick={() => navigate(`/charities/${charity.id}`)}
                            >
                                <div className="charity-browse-card-image">
                                    <Card.Img variant="top" src={charity.image_url} alt="" />
                                </div>
                                <Card.Body>
                                    <Card.Title>{charity.name}</Card.Title>
                                    <Card.Text className="charity-browse-card-description">
                                        {charity.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default CharitiesPage;
