
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
import Purchase from './components/purchase/Purchase';

import Order from './pages/order/Order';

import { useSelector } from 'react-redux';
import Layout from './layout/Layout';
import LayoutAdmin from './layout/LayoutAdmin';

import ProductPage from './Admin/pages/product/ProductPage';
import OrderPage from './Admin/pages/order/OrderPage';
import DashBoardPage from './Admin/pages/dashboard/DashBoardPage';
import OrderSuccess from './Admin/pages/orderSuccess/OrderSuccess';
import OrderRefuse from './Admin/pages/orderRefuse/OrderRefuse';
import OrderPending from './Admin/pages/orderPending/OrderPending';
import OrderConfirn from './Admin/pages/orderConfirm/OrderConfirn';
import OrderCancel from './Admin/pages/orderCancel/OrderCancel';


import CompletedOrder from './pages/completedOrder/CompletedOrder';
import ToShipOrder from './pages/toShipOrder/ToShipOrder';
import PendingOrder from './pages/pendingOrder/PendingOrder';
import CancelledOrder from './pages/cancelledOrder/CancelledOrder';

// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { toastOption } from './constants';
import UserAdmin from './Admin/pages/user/UserAdmin';
import NewProduct from './Admin/pages/newProduct/NewProduct';
import ListProduct from './Admin/components/listProduct/ListProduct';
import CountProductDeletedProvider from './context/countProductDeleted';

import ListUser from './Admin/components/listUser/ListUser';
import ListProductDeleted from './Admin/components/listProduct/ListProductDeleted';
import ListUserDeleted from './Admin/components/listUser/ListUserDeleted';
import CountUserDeletedProvider from './context/countUserDeleted';
import DetailProduct from './Admin/pages/detailProduct/DetailProduct';
import UserDetail from './Admin/pages/userDetail/UserDetail';

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }
  const AdminRoute = ({ children }) => {
    if (!currentUser.isAdmin) {
      return <Navigate to="/" />
    }
    // toast.success("Bạn đã đăng nhập với vai trò Admin", toastOption)
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
              element: <Purchase />,
              children: [
                {
                  path: "",
                  element: <PendingOrder />
                },
                {
                  path: "toship",
                  element: <ToShipOrder />
                },
                {
                  path: "complete",
                  element: <CompletedOrder />
                },
                {
                  path: "cancel",
                  element: <CancelledOrder />
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
      path: "/2020606605/admin",
      element: <ProtectedRoute><AdminRoute><LayoutAdmin /></AdminRoute></ProtectedRoute>,
      children: [
        {
          path: "",
          element: <DashBoardPage />
        },
        {
          path: "products",
          element: <CountProductDeletedProvider><ProductPage /></CountProductDeletedProvider> ,
          children: [
            {
              path: "",
              element: <ListProduct />
            },
            {
              path: "new-product",
              element: <NewProduct />
            },
            {
              path: "deleted-product",
              element: <ListProductDeleted />
            },
            {
              path: "detail-product/:id",
              element: <DetailProduct />
            }
          ]
        },
        {
          path: "users",
          element: <CountUserDeletedProvider><UserAdmin /></CountUserDeletedProvider>,
          children: [
            {
              path: "",
              element: <ListUser />
            },
            {
              path: "deleted-user",
              element: <ListUserDeleted />
            },
            {
              path: "detail-user/:id",
              element: <UserDetail />
            }
          ]
        },
        {
          path: "orders",
          element: <OrderPage />,
          children: [
            {
              path: "",
              element: <OrderPending />
            },
            {
              path: "confirmed",
              element: <OrderConfirn />
            },
            {
              path: "success",
              element: <OrderSuccess />
            },
            {
              path: "refuse",
              element: <OrderRefuse />
            },
            {
              path: "cancel",
              element: <OrderCancel />
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
