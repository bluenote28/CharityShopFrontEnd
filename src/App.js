import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/Admin';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import Footer from './components/Footer';
import './App.css'

function App() {
  return (
    <Router>
      <Header />

      <Routes>
            <Route path='/' Component={HomePage} exact />   
            <Route path='/search' Component={SearchPage} />
            <Route path='/admin' Component={AdminPage} exact />
            <Route path='/login' Component={LoginPage} exact />
            <Route path='/register' Component={RegisterPage} exact />
            <Route path='/profile' Component={ProfilePage} exact />
            <Route path='/favorites' Component={FavoritesPage} exact />
      </Routes>

      <Footer />
     
    </Router>
  );
}

export default App;
