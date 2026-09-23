import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';
import SearchBar from './SearchBar';
import Image from 'react-bootstrap/Image';
import CharityShopLogo from '../images/charityShopLogo.png';

function Header() {

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const logoutHandler = () => {
    dispatch(logout());
    window.location.href = "/";
  }

  return (
    <Navbar expand="lg" className="marketplace-header" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/" className="marketplace-brand">
          <Image src={CharityShopLogo} alt="Charity Shop" className="marketplace-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-3">
            {!isHome && (
              <div className="header-search">
                <SearchBar />
              </div>
            )}
            <Nav.Link as={Link} to="/about">How It Works</Nav.Link>
            <Nav.Link as={Link} to="/charities">Charities</Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name !== ' ' ? userInfo.name : 'Account'} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/favorites">Watch List</NavDropdown.Item>
                <NavDropdown.Item href="/purchases">Purchases</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Account</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
