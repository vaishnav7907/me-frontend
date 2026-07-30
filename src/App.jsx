import "./App.css";
import Signin from "./components/authentication/signin/Signin";
import Signup from "./components/authentication/signup/Signup";
import { MeProvider } from "./components/context/Meprovider";
import Brands from "./components/dashboard/dashboardPages/brands/Brands";
import Cart from "./components/dashboard/dashboardPages/cart/Cart";
import MainPage from "./components/dashboard/dashboardPages/MainPage/MainPage";
import LuxurJackets from "./components/dashboard/dashboardPages/newcollections/newcollectionpages/jackets/LuxurJackets";
import PremiumShirts from "./components/dashboard/dashboardPages/newcollections/newcollectionpages/premiumShirts/PremiumShirts";
import NewCollections from "./components/dashboard/dashboardPages/newcollections/NewCollections";
import Sales from "./components/dashboard/dashboardPages/sales/Sales";
import Maindashboard from "./components/dashboard/maindashboard/Maindashboard";
// import MaindashboardSidebar from "./components/sidebars/MaindashboardSidebar";
import Welcomepage from "./components/welcomePage/Welcomepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
    <MeProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Welcomepage />} />
          {/* <Route path='/signup' element={<Signup/>} />
      <Route path='/signin' element={<Signin/>} /> */}
          <Route path="/dashboard" element={<Maindashboard />} />

          {/* main page navbar */}
          <Route path="/mainpage" element={<MainPage/>}>
            <Route index element={<NewCollections/>} />
            <Route path="Brands" element={<Brands/>} />
            <Route path="Sales" element={<Sales/>} />
            <Route path="Cart" element={<Cart/>} />
            {/* <Route path="DashboardSidebar" element={<MaindashboardSidebar/> } /> */}
          </Route>
          {/* main page navbar */}


          {/* new collections */}
          <Route path="/premiumShirts" element={<PremiumShirts/>} />
          <Route path="/luxuryJackets" element={<LuxurJackets/>}/>
          {/* end new collections */}
        </Routes>
      </BrowserRouter>
      </MeProvider>
    </>
  );
}

export default App;
