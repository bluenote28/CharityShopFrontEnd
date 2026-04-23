import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import NormalSpinner from '../components/Spinner';
import { getOrder } from '../utilities/BackEndClient';

function OrderConfirmationPage() {
    const { order_id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [order, setOrder] = useState(location.state?.order || null);
    const [loading, setLoading] = useState(!order);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!order) {
            async function fetchOrder() {
                try {
                    const data = await getOrder(order_id);
                    setOrder(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
            fetchOrder();
        }
    }, [order_id, order]);

    if (loading) return <NormalSpinner />;

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
                <Button onClick={() => navigate('/')}>Go Home</Button>
            </Container>
        );
    }

    const fmt = (val, currency) =>
        val != null ? `$${parseFloat(val).toFixed(2)} ${currency || ''}` : '—';

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col md={7}>
                    <div className="text-center mb-4">
                        <span style={{ fontSize: '3rem' }}>✓</span>
                        <h2 className="mt-2">Order Confirmed!</h2>
                        <p className="text-muted">
                            Thank you for your purchase. eBay will send confirmation details to your email.
                        </p>
                    </div>

                    <Card className="p-4 mb-3">
                        <h5 className="mb-3">Order Details</h5>
                        <Row className="mb-2">
                            <Col xs={5} className="text-muted">eBay Order ID</Col>
                            <Col><code>{order?.ebay_order_id || order_id}</code></Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={5} className="text-muted">Status</Col>
                            <Col>{order?.status || '—'}</Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={5} className="text-muted">Order Total</Col>
                            <Col><strong>{fmt(order?.order_total, order?.currency)}</strong></Col>
                        </Row>
                    </Card>

                    {order?.ebay_response && (
                        <Card className="p-4 mb-3">
                            <h5 className="mb-3">Items</h5>
                            {(order.ebay_response.lineItems || []).map((item, i) => (
                                <div key={i} className="d-flex justify-content-between mb-2">
                                    <span>{item.title || 'Item'}</span>
                                    <span className="text-muted">x{item.quantity}</span>
                                </div>
                            ))}
                        </Card>
                    )}

                    <div className="d-flex gap-3 justify-content-center mt-4">
                        <Button variant="primary" onClick={() => navigate('/')}>Continue Shopping</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default OrderConfirmationPage;
