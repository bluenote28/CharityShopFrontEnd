import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPurchases } from '../utilities/BackEndClient';
import { convertIdToCharityName } from '../utilities/Converters';
import NormalSpinner from '../components/Spinner';
import AlertBox from '../components/Alert';

function asPurchaseList(data) {
    if (Array.isArray(data)) {
        return data;
    }
    if (Array.isArray(data?.results)) {
        return data.results;
    }
    if (Array.isArray(data?.purchases)) {
        return data.purchases;
    }
    return [];
}

function formatMoney(value) {
    const number = Number(value);
    if (Number.isNaN(number)) {
        return value ?? '';
    }
    return `$${number.toFixed(2)}`;
}

function formatPercent(value) {
    if (value == null || value === '') {
        return '';
    }
    const number = Number(value);
    if (Number.isNaN(number)) {
        return String(value);
    }
    return `${number.toFixed(1)}%`;
}

function formatDate(value) {
    if (!value) {
        return '';
    }
    const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
        return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])).toLocaleDateString();
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleDateString();
}

function charityLabel(purchase, charities) {
    if (purchase.charity && typeof purchase.charity === 'object') {
        return purchase.charity.name || purchase.charity.id;
    }
    return convertIdToCharityName(charities || [], purchase.charity) || purchase.charity || '';
}

function donationAmount(purchase) {
    const amount = Number(purchase.amount);
    const percent = Number(purchase.donation_percentage);
    if (Number.isNaN(amount) || Number.isNaN(percent)) {
        return 0;
    }
    return amount * percent / 100;
}

function PurchasesPage() {
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const charitiesState = useSelector((state) => state.charities);
    const { charities } = charitiesState;
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        async function fetchPurchases() {
            const userId = userInfo?.id;
            const token = userInfo?.token || userInfo?.access;
            if (!userId || !token) {
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const data = await getPurchases(userId, token);
                setPurchases(asPurchaseList(data));
            } catch (err) {
                setError(err.message || 'Failed to load purchases');
            } finally {
                setLoading(false);
            }
        }

        fetchPurchases();
    }, [userInfo]);

    if (!userInfo || loading) {
        return <NormalSpinner />;
    }

    if (error) {
        return (
            <Container className="mt-3">
                <AlertBox message={error} />
            </Container>
        );
    }

    const totalSpent = purchases.reduce((sum, purchase) => sum + Number(purchase.amount || 0), 0);
    const totalDonated = purchases.reduce((sum, purchase) => sum + donationAmount(purchase), 0);

    return (
        <Container className="mt-3 mb-5">
            <h1 style={{textAlign: 'center'}}>Purchases</h1>
            {purchases.length === 0 ? (
                <p style={{textAlign: 'center'}}>No purchases recorded yet.</p>
            ) : (
                <>
                    <Container className="border rounded-2 mt-3 mb-4 p-3" style={{backgroundColor: '#f8f9fa'}}>
                        <p className="mb-1"><strong>Total spent:</strong> {formatMoney(totalSpent)}</p>
                        <p className="mb-0"><strong>Estimated donation:</strong> {formatMoney(totalDonated)}</p>
                    </Container>
                    <div className={purchases.length > 10 ? 'charities-table-scroll' : undefined}>
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Amount</th>
                                    <th>Donation</th>
                                    <th>Charity</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.map((purchase, index) => (
                                    <tr key={purchase.id || index}>
                                        <td>{purchase.item_name}</td>
                                        <td>{formatMoney(purchase.amount)}</td>
                                        <td>{formatPercent(purchase.donation_percentage)}</td>
                                        <td>{charityLabel(purchase, charities)}</td>
                                        <td>{formatDate(purchase.purchased_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </>
            )}
        </Container>
    );
}

export default PurchasesPage;
