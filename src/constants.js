import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

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
const routesPurchasePage = [
    {
        id: 1,
        path: "",
        title: "Chờ xác nhận"
    },
    {
        id: 2,
        path: "ordered",
        title: "Đã đặt"
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

export {
    genders,
    routesPurchasePage,
    routeUserPage
}

