import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, Badge } from 'react-bootstrap';
import { initiateCheckout, updateShippingOption, applyCoupon, placeOrder } from '../utilities/BackEndClient';

const STEP_SHIPPING_INFO = 1;
const STEP_REVIEW = 2;

function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const itemData = location.state?.itemData || {};

    const [step, setStep] = useState(STEP_SHIPPING_INFO);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form fields
    const [form, setForm] = useState({
        buyer_email: '',
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'US',
    });

    // Session state (after initiation)
    const [session, setSession] = useState(null);
    const [selectedShippingOptionId, setSelectedShippingOptionId] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponError, setCouponError] = useState(null);
    const [couponLoading, setCouponLoading] = useState(false);

    if (!itemData.item_id && !itemData.id) {
        return (
            <Container className="mt-5 text-center">
                <h4>No item selected for checkout.</h4>
                <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
            </Container>
        );
    }

    function handleFormChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleInitiateCheckout(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const payload = {
            buyer_email: form.buyer_email,
            item_id: itemData.item_id || itemData.id,
            quantity: 1,
            first_name: form.first_name,
            last_name: form.last_name,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
            postal_code: form.postal_code,
            country: form.country,
        };

        try {
            const data = await initiateCheckout(payload);
            setSession(data);
            const lineItems = data.ebay_response?.lineItems || [];
            if (lineItems.length > 0 && lineItems[0].shippingOptions?.length > 0) {
                setSelectedShippingOptionId(lineItems[0].shippingOptions[0].shippingOptionId);
            }
            setStep(STEP_REVIEW);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleShippingChange(lineItemId, shippingOptionId) {
        setSelectedShippingOptionId(shippingOptionId);
        setError(null);
        setLoading(true);
        try {
            const data = await updateShippingOption(session.ebay_session_id, lineItemId, shippingOptionId);
            setSession(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleApplyCoupon() {
        if (!couponCode.trim()) return;
        setCouponError(null);
        setCouponLoading(true);
        try {
            const data = await applyCoupon(session.ebay_session_id, couponCode.trim());
            setSession(data);
            setCouponApplied(true);
        } catch (err) {
            setCouponError(err.message);
        } finally {
            setCouponLoading(false);
        }
    }

    async function handlePlaceOrder() {
        setError(null);
        setLoading(true);
        try {
            const order = await placeOrder(session.ebay_session_id);
            navigate('/order/' + order.ebay_order_id, { state: { order } });
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    const lineItems = session?.ebay_response?.lineItems || [];
    const firstLineItem = lineItems[0] || null;
    const shippingOptions = firstLineItem?.shippingOptions || [];

    return (
        <Container className="mt-4 mb-5">
            <Row className="mb-3">
                <Col>
                    <h2>Checkout</h2>
                    <div className="d-flex gap-2 align-items-center">
                        <StepBadge num={1} active={step === STEP_SHIPPING_INFO} done={step > STEP_SHIPPING_INFO} label="Shipping Info" />
                        <span style={{ color: '#ccc' }}>›</span>
                        <StepBadge num={2} active={step === STEP_REVIEW} done={false} label="Review & Pay" />
                    </div>
                </Col>
            </Row>

            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

            {step === STEP_SHIPPING_INFO && (
                <Row>
                    <Col md={7}>
                        <Card className="p-4">
                            <h5 className="mb-3">Contact & Shipping</h5>
                            <Form onSubmit={handleInitiateCheckout}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="buyer_email"
                                        value={form.buyer_email}
                                        onChange={handleFormChange}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="first_name"
                                                value={form.first_name}
                                                onChange={handleFormChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="last_name"
                                                value={form.last_name}
                                                onChange={handleFormChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleFormChange}
                                        placeholder="555-555-5555"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={form.address}
                                        onChange={handleFormChange}
                                        placeholder="123 Main St"
                                        required
                                    />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={form.city}
                                                onChange={handleFormChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="state"
                                                value={form.state}
                                                onChange={handleFormChange}
                                                placeholder="CA"
                                                maxLength={2}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>ZIP</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="postal_code"
                                                value={form.postal_code}
                                                onChange={handleFormChange}
                                                placeholder="90210"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select name="country" value={form.country} onChange={handleFormChange}>
                                        <option value="US">United States</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="CA">Canada</option>
                                        <option value="AU">Australia</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                                    {loading ? <><Spinner size="sm" className="me-2" />Processing...</> : 'Continue to Review'}
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                    <Col md={5}>
                        <ItemSummaryCard itemData={itemData} />
                    </Col>
                </Row>
            )}

            {step === STEP_REVIEW && session && (
                <Row>
                    <Col md={7}>
                        <Card className="p-4 mb-3">
                            <h5 className="mb-3">Shipping Options</h5>
                            {shippingOptions.length === 0 && <p className="text-muted">No shipping options available.</p>}
                            {shippingOptions.map((opt) => (
                                <Form.Check
                                    key={opt.shippingOptionId}
                                    type="radio"
                                    id={opt.shippingOptionId}
                                    name="shippingOption"
                                    label={
                                        <span>
                                            <strong>{opt.serviceType || opt.optionType}</strong>
                                            {' — '}
                                            {opt.shippingCost?.value === '0.00' || opt.shippingCost?.value === '0'
                                                ? 'Free'
                                                : `$${opt.shippingCost?.value}`}
                                        </span>
                                    }
                                    checked={selectedShippingOptionId === opt.shippingOptionId}
                                    onChange={() => handleShippingChange(firstLineItem.lineItemId, opt.shippingOptionId)}
                                    disabled={loading}
                                    className="mb-2"
                                />
                            ))}
                        </Card>

                        <Card className="p-4 mb-3">
                            <h5 className="mb-3">Coupon / Promo Code</h5>
                            {couponApplied
                                ? <Alert variant="success" className="mb-0">Coupon applied!</Alert>
                                : (
                                    <>
                                        <div className="d-flex gap-2">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                disabled={couponLoading}
                                            />
                                            <Button variant="outline-secondary" onClick={handleApplyCoupon} disabled={couponLoading || !couponCode.trim()}>
                                                {couponLoading ? <Spinner size="sm" /> : 'Apply'}
                                            </Button>
                                        </div>
                                        {couponError && <div className="text-danger mt-2 small">{couponError}</div>}
                                    </>
                                )
                            }
                        </Card>

                        <Button
                            variant="success"
                            size="lg"
                            className="w-100"
                            onClick={handlePlaceOrder}
                            disabled={loading}
                        >
                            {loading ? <><Spinner size="sm" className="me-2" />Placing order...</> : `Place Order — $${session.total || '—'}`}
                        </Button>
                        <p className="text-muted text-center mt-2 small">
                            By placing your order you agree to eBay's terms. Your payment is processed securely by eBay.
                        </p>
                    </Col>
                    <Col md={5}>
                        <ItemSummaryCard itemData={itemData} />
                        <PricingSummaryCard session={session} />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

function StepBadge({ num, active, done, label }) {
    const bg = done ? 'success' : active ? 'primary' : 'secondary';
    return (
        <span className="d-flex align-items-center gap-1">
            <Badge bg={bg}>{num}</Badge>
            <span style={{ fontWeight: active ? 600 : 400, color: active ? '#000' : '#888' }}>{label}</span>
        </span>
    );
}

function ItemSummaryCard({ itemData }) {
    return (
        <Card className="p-3 mb-3">
            <h6 className="mb-2">Order Summary</h6>
            {itemData.img_url && (
                <img src={itemData.img_url} alt={itemData.name} style={{ width: '100%', maxHeight: '180px', objectFit: 'contain', marginBottom: '12px' }} />
            )}
            <p className="mb-1" style={{ fontSize: '0.9rem' }}><strong>{itemData.name}</strong></p>
            <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>Item price: ${itemData.price}</p>
        </Card>
    );
}

function PricingSummaryCard({ session }) {
    const ebay = session?.ebay_response?.pricingSummary || {};

    const subtotal = session.subtotal || ebay.priceSubtotal?.value;
    const shipping = session.shipping_cost || ebay.deliveryCost?.value;
    const tax = session.tax || ebay.tax?.value;
    const total = session.total || ebay.total?.value;
    const currency = session.currency || 'USD';

    const fmt = (val) => val != null ? `$${parseFloat(val).toFixed(2)} ${currency}` : '—';

    return (
        <Card className="p-3">
            <h6 className="mb-2">Price Summary</h6>
            <div className="d-flex justify-content-between"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="d-flex justify-content-between"><span>Shipping</span><span>{fmt(shipping)}</span></div>
            <div className="d-flex justify-content-between"><span>Tax</span><span>{fmt(tax)}</span></div>
            <hr />
            <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>{fmt(total)}</span></div>
        </Card>
    );
}

export default CheckoutPage;
