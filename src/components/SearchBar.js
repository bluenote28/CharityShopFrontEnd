import Container from 'react-bootstrap/Container';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SearchBar() {

        const [search, setSearch] = useState('')
        const navigate = useNavigate();

        const searchHandler = (e) => {

            e.preventDefault();
            if (search) {      
                const params = {search: search}
                navigate({pathname: '/search', search: `?${createSearchParams(params)}`})
            }
         }

        return (
            <Container className='mt-1 mb-3' fluid>
                <Form className="d-flex" role="search" onSubmit={searchHandler}>
                    <Form.Control className="form-control" type="search" placeholder="Search all items" aria-label="Search" onChange={(e) => setSearch(e.target.value)}
                        onSubmit={(e) => {searchHandler(e)}}  
                    />
                    <Button className='mx-1' variant='primary' type="submit">Search</Button>
                </Form>
            </Container>
        )


}

export default SearchBar;