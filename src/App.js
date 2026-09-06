import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/Admin';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ItemPage from './pages/ItemPage';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import PurchasesPage from './pages/PurchasesPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/About';
import Footer from './components/Footer';
import DirectoryPage from './pages/Directory';
import CharitiesPage from './pages/CharitiesPage';
import CharityItemsPage from './pages/CharityItemsPage';
import './App.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserFavorites, logout } from './actions/userActions';
import { getCharities } from './actions/charityActions';
import { getAuthToken, getTokenExpiry, isTokenExpired } from './utilities/auth';

const MAX_TIMEOUT_MS = 2147483647;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {

  const dispatch = useDispatch()
  const charitiesState = useSelector((state) => state.charities);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(()=> {
    if (userInfo?.token) {
      dispatch(getUserFavorites())
    }
      
    if (charitiesState.charities.length === 0){
      dispatch(getCharities());
    }
  }, [dispatch, userInfo, charitiesState.charities.length])

  useEffect(() => {
    const token = getAuthToken(userInfo);
    if (!token) {
      return undefined;
    }

    let timeoutId;

    const logoutWhenExpired = () => {
      if (isTokenExpired(token)) {
        dispatch(logout({ redirect: true }));
        return;
      }
      const expiry = getTokenExpiry(token);
      const delay = Math.min(expiry - Date.now(), MAX_TIMEOUT_MS);
      timeoutId = setTimeout(logoutWhenExpired, delay);
    };

    logoutWhenExpired();
    return () => clearTimeout(timeoutId);
  }, [dispatch, userInfo])

  return (
    <Router>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path='/' Component={HomePage} exact />
        <Route path='/search' Component={SearchPage} />
        <Route path='/admin' Component={AdminPage} exact />
        <Route path='/login' Component={LoginPage} exact />
        <Route path='/register' Component={RegisterPage} exact />
        <Route path='/profile' Component={ProfilePage} exact />
        <Route path='/favorites' Component={FavoritesPage} exact />
        <Route path='/purchases' Component={PurchasesPage} exact />
        <Route path='/item/:item_id' Component={ItemPage} exact />
        <Route path='/category' Component={CategoryPage} exact />
        <Route path='/about' Component={AboutPage} exact />
        <Route path='/directory' Component={DirectoryPage} exact />
        <Route path='/charities' Component={CharitiesPage} exact />
        <Route path='/charities/:charityId' Component={CharityItemsPage} exact />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
