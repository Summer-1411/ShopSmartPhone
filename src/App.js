
import './style.scss';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
// import NavBar from './components/navbar/NavBar';
import NavBar from "./components/navbar/Navbar"
import Bottom from './components/bottom/Bottom'
import Home from './pages/home/Home';
import ProductDetail from './pages/productDetail/ProductDetail';
import Cart from './pages/cart/Cart';
import User from './pages/user/User';
import Profile from './components/profile/Profile';
import Purchase from './components/purchase/Purchase';
import PurchaseProduct from './components/purchaseProduct/PurchaseProduct';
import Order from './pages/order/Order';


function App() {
  const currentUser = true
  const Layout = () => {
    return (
      <div className="theme-light">
          <NavBar />
          <div className="wrapper-container">
            <Outlet />
          </div>
          <Bottom />
        </div>
      
    )
  }
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children
  }

  const Logged = ({children}) => {
    if(currentUser){
      return <Navigate to="/" />
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
      children: [
        {
          path:"/",
          element: <Home />
        },
        {
          path: "/product/:id",
          element: <ProductDetail />
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/order",
          element: <Order />
        },
        {
          path: "/user",
          element: <User />,
          children: [
            {
              path: "profile",
              element: <Profile />
            },
            {
              path: "purchase",
              element: <Purchase />,
              children: [
                {
                  path: "",
                  element: <PurchaseProduct />
                },
                {
                  path: "ordered",
                  element: <h1>Đã đặt</h1>
                },
                {
                  path: "complete",
                  element: <h1>Hoàn thành</h1>
                },
                {
                  path: "cancel",
                  element: <h1>Đã huỷ</h1>
                }
              ]
            },
            {
              path: "logout",
              element: <h1>Đăng xuất</h1>
            }
          ]
        }
      ]
    },
    {
      path: "/login",
      element: <Logged><Login /></Logged>,
    },
    {
      path: "/register",
      element: <Logged><Register /></Logged>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
