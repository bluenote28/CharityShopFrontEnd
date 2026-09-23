import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import CharityItemRoulette from '../components/CharityItemRoulette';
import { CATEGORY_OPTIONS } from '../constants/categoryFilterOptions';
import NormalSpinner from '../components/Spinner';

const HOME_CHIPS = [
  "Women's Clothing",
  "Men's Clothing",
  'Collectibles',
  'Video Games & Consoles',
  'Electronics',
  'Home & Garden',
];

const ROULETTE_COUNT = 3;

function pickCharities(charities, count) {
  const shuffled = [...charities].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function HomePage() {
  const navigate = useNavigate();
  const charitiesState = useSelector((state) => state.charities);
  const { loading, charities } = charitiesState;
  const [picked, setPicked] = useState([]);
  const chips = CATEGORY_OPTIONS.filter((option) => HOME_CHIPS.includes(option.label));
  const pickedIds = picked.map((charity) => charity.id);

  useEffect(() => {
    if (!charities?.length || picked.length) {
      return;
    }
    setPicked(pickCharities(charities, ROULETTE_COUNT));
  }, [charities, picked.length]);

  return (
    <div className="home-marketplace">
      <Container>
        <SearchBar variant="hero" />
        <div className="home-chips" role="navigation" aria-label="Departments">
          {chips.map((option) => (
            <button
              key={option.value}
              type="button"
              className="home-chip"
              onClick={() => navigate(`/category?category=${encodeURIComponent(option.label)}`)}
            >
              {option.label === 'Video Games & Consoles' ? 'Video Games' : option.label}
            </button>
          ))}
          <button type="button" className="home-chip" onClick={() => navigate('/charities')}>
            Charities
          </button>
        </div>

        {loading && !charities?.length && <NormalSpinner />}
        {picked.map((charity, index) => (
          <CharityItemRoulette
            key={charity.id}
            charity={charity}
            excludeIds={pickedIds}
            stepDelay={index * 800}
          />
        ))}
      </Container>
    </div>
  );
}

export default HomePage
