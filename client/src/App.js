import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './components/Form/LoginPage';
import EnterOtp from './Pages/EnterOtp/EnterOtp';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import SendMail from './Pages/SendMail/SendMail';
import SignUp from './components/Form/SignUp';
import Landing from './Pages/HomePage/Landing';
import Body from './Pages/HotelList/Body';
import Hotel from './Pages/HotelList/Hotel';
import Profile from './Pages/UserProfile/Profile';
import Car from './Pages/HotelList/Car';
import CarDes from './Pages/HotelList/CarDes';
import Admin from './Pages/AdminPage/Admin';
import HotelDes from './Pages/HotelList/HotelDes';
import CarBook from './Pages/HotelList/CarBook';
import Success from './Pages/HotelList/Success';
import Dashboard from './Pages/AdminPage/Dashboard';
import HotelReview from './Pages/AdminPage/Review';
import CarDashboard from './Pages/AdminPage/Car/Dashboard';
import CarReview from './Pages/AdminPage/Car/Review';
import UserLocationProvider from './Services/useUserLocation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HotelOffers from './Pages/AdminPage/HotelOffers';
import HotelDetails from './Pages/AdminPage/HotelDetails';
import HotelAdd from './Pages/AdminPage/HotelAdd';
import CarAdd from './Pages/AdminPage/Car/CarAdd';
import CarOffers from './Pages/AdminPage/Car/CarOffers';
import CarDetails from './Pages/AdminPage/Car/CarDetails';
import FilterProvider from './Services/useFilter';
import UserType from './Services/useType';
import UserProfile from './Services/useProfile';
import LocalOffer from './Pages/LocalOfferPage/LocalOffer';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProfile>
          <ToastContainer />
          <UserType>
            <UserLocationProvider>
              <FilterProvider>
                <Routes>
                  <Route path={'/login'} element={<LoginPage />} />
                  <Route path={'/register'} element={<SignUp />} />
                  <Route path={'/otp'} element={<EnterOtp />} />
                  <Route path={'/reset'} element={<ResetPassword />} />
                  <Route path="/sendmail" element={<SendMail />} />
                  <Route path="/offer" element={<LocalOffer />} />
                  <Route path="/" element={<Landing />} />
                  <Route path="search" element={<Body />}>
                    <Route index element={<Hotel />} />
                    <Route path="hotel" element={<Hotel />} />
                    <Route path="car" element={<Car />} />
                  </Route>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cardescription/:id" element={<CarDes />} />
                  <Route path="/hoteldescription/:id" element={<HotelDes />} />
                  <Route path="admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="hoteldetail" element={<HotelDetails />} />
                    <Route path="offer" element={<HotelOffers />} />
                    <Route path="review" element={<HotelReview />} />
                    <Route path="adddetail" element={<HotelAdd />} />
                    <Route path="caradd" element={<CarAdd />} />
                    <Route path="carreview" element={<CarReview />} />
                    <Route path="caroffers" element={<CarOffers />} />
                    <Route path="cardetails" element={<CarDetails />} />
                    <Route path="cardashboard" element={<CarDashboard />} />
                  </Route>
                  <Route path="/carbook" element={<CarBook />} />
                  <Route path="/success" element={<Success />} />
                </Routes>
              </FilterProvider>
            </UserLocationProvider>
          </UserType>
        </UserProfile>
      </BrowserRouter>
    </>
  );
}

export default App;
