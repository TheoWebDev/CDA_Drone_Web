import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Home from './components/pages/Home';
import DronesPage from './components/pages/Drones';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/pages/Register';
import SignIn from './components/pages/SignIn';
import UserDashboard from './components/UserDashboard';
import Cart from './components/pages/Cart';
import { ParallaxProvider } from 'react-scroll-parallax';
import ErrorSection from './components/Error404';
import UsersDetails from './components/UsersDetails';
import UserOrders from './components/UserOrders';
import UserOrdersHistory from './components/UserOrdersHistory';
import UpdateUsersDetails from './components/UpdateUsersDetails';
import { ModalProvider } from 'styled-react-modal'

const isConnected = () => { // initialise l'état de la connexion
  const auth = localStorage.getItem('user')
  const authParsed = JSON.parse(auth)
  if (auth && authParsed && authParsed.token) {
      return true
  } else {
      return false
  }
}

const globalState = {
  auth: isConnected(),
}

const GlobalStateContext = React.createContext(globalState)
const DispatchStateContext = React.createContext(undefined)

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    globalState
    )
  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};


export const useGlobalState = () => [
  React.useContext(GlobalStateContext),
  React.useContext(DispatchStateContext)
]



const App = () => {
  return (
    <>
    <GlobalStateProvider>
      <ParallaxProvider>
        <ModalProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' exact element={<Home />}></Route>
              <Route path='/products/*' exact element={<DronesPage />}></Route>
              <Route path='/sign-up' exact element={<Register />}></Route>
              <Route path='/sign-in' exact element={<SignIn />}></Route>
              <Route path='/dashboard' exact element={<UserDashboard />}></Route>
              <Route path='/cart' exact element={<Cart />}></Route>
              <Route path='/userdetails' exact element={<UsersDetails />}></Route>
              <Route path='/orders' exact element={<UserOrders />}></Route>
              <Route path='/ordershistory' exact element={<UserOrdersHistory />}></Route>
              <Route path='/updateuserdetails' exact element={<UpdateUsersDetails />}></Route>
              <Route path='/*' exact element={<ErrorSection />}></Route>
            </Routes>
            <Footer />
          </Router>
        </ModalProvider>
      </ParallaxProvider>
    </GlobalStateProvider>
    </>
  );
}

export default App;