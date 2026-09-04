import { useState, useEffect } from 'react';
import { Container, Form, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DisplayListings from '../components/DisplayListings';
import CharityDisplay from '../components/CharityDisplay';
import NormalSpinner from '../components/Spinner';

function CharityItemsPage() {
    const { charityId } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchText = searchParams.get('search') || '';
    const [searchInput, setSearchInput] = useState(searchText);
    const charitiesState = useSelector((state) => state.charities);
    const { loading, charities } = charitiesState;
    const charity = (charities || []).find((item) => String(item.id) === String(charityId));

    useEffect(() => {
        setSearchInput(searchText);
    }, [searchText]);

    function handleSearch(e) {
        e.preventDefault();
        const nextSearch = searchInput.trim();
        const params = new URLSearchParams(searchParams);
        params.delete('page');
        if (nextSearch) {
            params.set('search', nextSearch);
        } else {
            params.delete('search');
        }
        setSearchParams(params);
    }

    if (loading || !charities) {
        return <NormalSpinner />;
    }

    if (!charity) {
        return (
            <Container className="mt-3 mb-5">
                <h1 className="text-center">Charity not found</h1>
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="outline-dark" onClick={() => navigate('/charities')}>
                        Back to charities
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="mt-3 mb-5">
            <h1 className="text-center">Items benefiting {charity.name}</h1>
            <div className="d-flex justify-content-center mt-3 mb-3">
                <ButtonGroup>
                    <Button variant="outline-dark" onClick={() => navigate('/charities')}>
                        Back to charities
                    </Button>
                </ButtonGroup>
            </div>
            <CharityDisplay
                image_url={charity.image_url}
                description={charity.description}
                donation_url={charity.donation_url}
                charity_name={charity.name}
            />
            <Form className="d-flex mb-4" onSubmit={handleSearch}>
                <Form.Control
                    type="search"
                    placeholder={`Search items for ${charity.name}`}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    aria-label="Search items for this charity"
                />
                <Button className="mx-1" variant="primary" type="submit">Search</Button>
            </Form>
            {searchText && (
                <h2 className="text-center mb-4">Search results for: {searchText}</h2>
            )}
            <DisplayListings charityId={charityId} search={searchText || null} />
        </Container>
    );
}

export default CharityItemsPage;
