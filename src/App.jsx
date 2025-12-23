import Home from "./pages/home";
import LogIn from "./pages/log-in/log-in";
import SignUP from "./pages/sign-up/signUp";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard/dashboard";
import Payment from "./pages/payment/payment";
import Account from "./pages/account/account";
import GuestDashboard from "./pages/dashboard/guesDashboard";

function App() {

return(
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home></Home>}/>
  <Route path="/login" element={<LogIn></LogIn>}/>
  <Route path="/signup" element={<SignUP></SignUP>}/>
  <Route path="/dashboard" element={<Dashboard></Dashboard>}/>
  <Route path="/payment" element={<Payment></Payment>}/>
  <Route path="/account" element={<Account></Account>}/>
  <Route path="/guest" element={<GuestDashboard></GuestDashboard>}/>
  


</Routes>

</BrowserRouter>

);
    
      
  
}

export default App
