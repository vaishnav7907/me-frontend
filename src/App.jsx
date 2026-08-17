import "./App.css";
import AdminDashboard from "./components/adminPanel/adminDashboard/AdminDashboard";
// import AdminDashboard from "./components/adminPanel/adminDashboard/AdminDashboard";
import Profile from "./components/authentication/profile/Profile";
import Settings from "./components/authentication/settings/Settings";
import Signin from "./components/authentication/signin/Signin";
import Signup from "./components/authentication/signup/Signup";
import { MeProvider } from "./components/context/Meprovider";
import Brands from "./components/dashboard/dashboardPages/brands/Brands";
import BrandSubpage from "./components/dashboard/dashboardPages/brands/brandsSubpages/BrandSubpage";
import Cart from "./components/dashboard/dashboardPages/cart/Cart";
import CartOrder from "./components/dashboard/dashboardPages/cart/cartOrder/CartOrder";
import MenCollection from "./components/dashboard/dashboardPages/collections/Collections";
import MainPage from "./components/dashboard/dashboardPages/MainPage/MainPage";
import LuxurJackets from "./components/dashboard/dashboardPages/newcollections/newcollectionpages/jackets/LuxurJackets";
import PremiumPants from "./components/dashboard/dashboardPages/newcollections/newcollectionpages/pants/PremiumPants";
import PremiumShirts from "./components/dashboard/dashboardPages/newcollections/newcollectionpages/premiumShirts/PremiumShirts";
import Tshirts from "./components/dashboard/dashboardPages/newcollections/newcollectionpages/tshirts/Tshirts";
import NewCollections from "./components/dashboard/dashboardPages/newcollections/NewCollections";
import OfferPage from "./components/dashboard/dashboardPages/sales/offer/OfferPage";
import Sales from "./components/dashboard/dashboardPages/sales/Sales";
import Maindashboard from "./components/dashboard/maindashboard/Maindashboard";
import ProductInfo from "./components/productInformation/ProductInfo";
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
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/dashboard" element={<Maindashboard />} />

            {/* main page navbar */}
            <Route path="/mainpage" element={<MainPage />}>
              <Route index element={<NewCollections />} />
              <Route path="Brands" element={<Brands />} />
              <Route path="Sales" element={<Sales />} />
              <Route path="Cart" element={<Cart />} />
              <Route path="Collections" element={<MenCollection />} />
              {/* <Route path="DashboardSidebar" element={<MaindashboardSidebar/> } /> */}
            </Route>
            {/* main page navbar */}

            {/* new collections */}
            <Route path="/premiumShirts" element={<PremiumShirts />} />
            <Route path="/luxuryJackets" element={<LuxurJackets />} />
            <Route path="/Tshirts" element={<Tshirts />} />
            <Route path="/PremiumPants" element={<PremiumPants />} />
            {/* end new collections */}

            {/* brand subpage*/}
            <Route path="/BrandSubpage" element={<BrandSubpage />} />
            <Route path="/productInfo" element={<ProductInfo />} />
            <Route path="/Offers" element={<OfferPage />} />
            <Route path="/CartOrder" element={<CartOrder />} />
            {/* end brand subpage */}


            <Route path="/adminDash" element={<AdminDashboard/>}/>
          </Routes>
        </BrowserRouter>
      </MeProvider>
    </>
  );
}

export default App;
