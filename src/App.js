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
import { getUserFavorites } from './actions/userActions';
import { getCharities } from './actions/charityActions';

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
