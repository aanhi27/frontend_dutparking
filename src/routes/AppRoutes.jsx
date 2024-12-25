import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import Register from "../components/Register";
import Profile from "../components/Profile";
import UpdateProfile from "../components/UpdateProfile";
import Recharge from "../components/Recharge";
import Ticket from "../components/Ticket";
import Buyticket from "../components/Buyticket";
import Cart from "../components/Cart";
import Allprofile from "../components/Allprofile";
import Alluserticket from "../components/Alluserticket";



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/buyticket" element={<Buyticket />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/allprofile" element={<Allprofile />} />
        <Route path="/alluserticket" element={<Alluserticket />} />
        
        
      </Routes>
    </Router>
  );
};

export default AppRoutes; 