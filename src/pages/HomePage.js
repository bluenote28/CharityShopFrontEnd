import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CharityItemRoulette from '../components/CharityItemRoulette';
import { CATEGORY_OPTIONS } from '../constants/categoryFilterOptions';

const HOME_CHIPS = [
  "Women's Clothing",
  "Men's Clothing",
  'Collectibles',
  'Video Games & Consoles',
  'Electronics',
  'Home & Garden',
];

const HOME_ROULETTES = [
  {
    title: 'Video Games',
    category: 'Video Games & Consoles',
  },
  {
    title: 'Collectibles',
    category: 'Collectibles',
  },
  {
    title: 'Electronics',
    category: 'Consumer Electronics',
  },
];

function HomePage() {
  const navigate = useNavigate();
  const chips = CATEGORY_OPTIONS.filter((option) => HOME_CHIPS.includes(option.label));

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

        {HOME_ROULETTES.map((reel, index) => (
          <CharityItemRoulette
            key={reel.category}
            title={reel.title}
            category={reel.category}
            stepDelay={index * 800}
          />
        ))}
      </Container>
    </div>
  );
}

export default HomePage
