import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import SearchBar from './SearchBar';

function Header() {

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user
  const dispatch = useDispatch();
  const SEARCH_BAR_WIDTH= "500px"

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (  
    <Navbar expand="lg" style={{backgroundColor: "#1406d4"}}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='mx-auto'>
             <Nav.Link as={Link} to="/">Home</Nav.Link>
           
             {userInfo ? (
                <>
                  {userInfo.isAdmin && (
                    <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                  )}

                  <Container style={{ width: SEARCH_BAR_WIDTH }}>
                    <SearchBar />
                  </Container>
                  
                  {userInfo.name != " " ?
                  
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/favorites">Favorites</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                :
                  <NavDropdown title={"Welcome"} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/favorites">Favorites</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                }
                </>
                

             ) : (

              <>

                <Container style={{ width: SEARCH_BAR_WIDTH }}>
                  <SearchBar />
                </Container>

                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>

             )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;