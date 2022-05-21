import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {Navbar} from "./components/Navbar"
import { LoginScreen } from './screen/login';
import { RegisterScreen } from './screen/register';
import { EditProfile } from './screen/editProfile';
import { ProfileScreen } from './screen/profile';
import {Footer} from './components/Footer'
import { MyOrders  } from './screen/myBooking';

function App() {
  return (
    <div> 
     <Router>
      <Navbar/>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
          <Footer/>
        </Router>
    </div>
  );
}

export default App;
