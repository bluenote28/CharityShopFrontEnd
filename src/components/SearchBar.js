import { createSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SearchBar({ variant = 'header' }) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate();
  const isHero = variant === 'hero';

  const searchHandler = (e) => {
    e.preventDefault();
    if (search) {
      const params = {search: search}
      navigate({pathname: '/search', search: `?${createSearchParams(params)}`})
    }
  }

  return (
    <Form className={isHero ? 'home-search-hero' : 'd-flex'} role="search" onSubmit={searchHandler}>
      <Form.Control
        className={isHero ? 'home-search-input' : 'form-control'}
        type="search"
        placeholder="Search all items"
        aria-label="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button className={isHero ? 'home-search-button' : 'mx-1'} variant="primary" type="submit">
        Search
      </Button>
    </Form>
  )
}

export default SearchBar;
