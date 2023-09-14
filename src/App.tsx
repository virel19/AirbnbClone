import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import UserContext from './context/UserContext';
import MyProfilePage from './pages/MyProfilePage';
import MyPlacesPage from './pages/MyPlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import MyBookingsPage from './pages/MyBookingsPage';
import PlacePage from './pages/PlacePage';
import ReservationConfirmationPage from './pages/ReservationConfirmationPage';
import BookingContext from './context/BookingContext';
import BookingPage from './pages/BookingPage';
import SearchQueryContext  from './context/SearchQueryContext';
import MyFavoritesPage from './pages/MyFavoritesPage';
import FavoriteContext from './context/FavoriteContext';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContext>
      <SearchQueryContext>
        <BookingContext>
          <FavoriteContext>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<MyProfilePage />} />
              <Route path="/account/places" element={<MyPlacesPage />} />
              <Route path="/account/bookings" element={<MyBookingsPage />} />
              <Route path="/account/bookings/:id" element={<BookingPage />} />
              <Route path="/account/places/new" element={<PlacesFormPage />} />
              <Route path="/account/places/:id" element={<PlacesFormPage />} />
              <Route path="/account/favorites" element={<MyFavoritesPage />} />
              <Route path="/place/:id" element={<PlacePage />} />
            </Route>
            <Route path="/reservation-confirmation" element={<ReservationConfirmationPage />} />
          </Routes>
          </FavoriteContext>
        </BookingContext>
      </SearchQueryContext>
    </UserContext>
  )
}

export default App;
