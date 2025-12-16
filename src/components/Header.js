import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

function Header() {

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (  
    <Navbar expand="lg" >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
             <Nav.Link as={Link} to="/">Home</Nav.Link>
           
             {userInfo ? (
                <>
                  {userInfo.isAdmin && (
                    <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                  )}
                  
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

                <Nav.Link as={Link} to="/login">Login</Nav.Link>

             )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;