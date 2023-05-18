import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const toastOption = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: 'light'
}

//-1: Đơn hàng khách huỷ
//0: Đang chờ xử ý
//1: Đã duyệt đơn
//2: Đã hoàn thành
//-2: Không chấp nhận

const genders = [
    {
        id: 1,
        title: "Nam"
    },
    {
        id: 2,
        title: "Nữ"
    },
    {
        id: 3,
        title: "Khác"
    }
]

const routeUserPage = [
    {
        id: 1,
        icon: AccountCircleOutlinedIcon,
        title: "Tài khoản của tôi",
        path: "profile"
    },
    {
        id: 2,
        icon: InventoryOutlinedIcon,
        title: "Đơn mua",
        path: "purchase"
    }
]

const sideBarAdmin = [
    {
        id: 1,
        icon: DashboardOutlinedIcon,
        title: "Thống kê",
        path: ""
    },
    {
        id: 2,
        icon: SmartphoneIcon,
        title: "Sản phẩm",
        path: "products"
    },
    {
        id: 3,
        icon: AccountCircleOutlinedIcon,
        title: "Khách hàng",
        path: "users"
    },
    {
        id: 4,
        icon: ShoppingCartOutlinedIcon,
        title: "Đơn hàng",
        path: "orders"
    }
]


const routeOrderAdmin = [
    {
        id: 1,
        path: "",
        title: "Chờ xử lý"
    },
    {
        id: 2,
        path: "confirmed",
        title: "Đã xác nhận"
    },
    {
        id: 3,
        path: "success",
        title: "Thành công"
    },
    {
        id: 4,
        path: "refuse",
        title: "Đã huỷ bỏ"
    },
    {
        id: 5,
        path: "cancel",
        title: "Khách huỷ"
    }
]

const routesPurchasePage = [
    {
        id: 1,
        path: "",
        title: "Chờ xác nhận"
    },
    {
        id: 2,
        path: "toship",
        title: "Đang giao"
    },
    {
        id: 3,
        path: "complete",
        title: "Hoàn thành"
    },
    {
        id: 4,
        path: "cancel",
        title: "Đã huỷ"
    },
]

const categorys = [
    {
        name: "Android",
        id: 1
    },
    {
        name: "iPhone (IOS)",
        id: 2
    },
    {
        name: "Khác",
        id: 3
    }
]
const producers = [
    {
        id: 1,
        name: "iPhone"
    },
    {
        id: 2,
        name: "SAMSUNG"
    },
    {
        id: 3,
        name: "OPPO"
    },
    {
        id: 4,
        name: "XIAOMI"
    },
    {
        id: 5,
        name: "VIVO"
    },
    {
        id: 6,
        name: "Realme"
    },
    {
        id: 7,
        name: "NOKIA"
    },
    {
        id: 8,
        name: "iTel"
    },
    {
        id: 9,
        name: "Masstel"
    },
]

const SUMMER_SHOP = "summerShop"
export {
    genders,
    routesPurchasePage,
    routeUserPage,
    SUMMER_SHOP,
    sideBarAdmin,
    routeOrderAdmin,
    toastOption,
    categorys,
    producers
}

