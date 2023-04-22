import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar/NavBar"
import Bottom from "../components/bottom/Bottom"
import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../requestMethod"
import { useDispatch } from "react-redux"
import { SUMMER_SHOP } from "../constants"
import { setCart } from "../redux/cartRedux"

const Layout = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const getCart = async () => {
            const res = await axios.get(`${BASE_URL}/cart`, {
                headers: {Authorization: `Bearer ${localStorage[SUMMER_SHOP]}`}
            })
            //console.log(res.data);
            dispatch(setCart(res.data.cart))
        }
        getCart();
    }, [dispatch])

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
export default Layout