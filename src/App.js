
import './style.scss';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import Home from './pages/home/Home';
import ProductDetail from './pages/productDetail/ProductDetail';
import Cart from './pages/cart/Cart';
import User from './pages/user/User';
import Profile from './components/profile/Profile';

import Order from './pages/order/Order';

import { useSelector } from 'react-redux';
import Layout from './layout/Layout';



import 'react-toastify/dist/ReactToastify.css';

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }


  const Logged = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: "/",
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
              element: <h1>Purchase</h1>
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
