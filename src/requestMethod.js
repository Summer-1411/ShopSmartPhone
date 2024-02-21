// import axios from "axios";
// import { SUMMER_SHOP } from "./constants";

const BASE_URL = 'https://api-summer-shop.vercel.app/api'
const IMAGE_LINK = 'https://api-summer-shop.vercel.app/images'
const IMAGE_DEFAULT = 'https://api-summer-shop.vercel.app/images/default.jpg'
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
export {
    BASE_URL,
    IMAGE_LINK,
    IMAGE_DEFAULT
}
// console.log({TOKEN});
// console.log(localStorage.getItem(SUMMER_SHOP));
// console.log("123");
// const clientRequest = axios.create({
//     baseURL: BASE_URL,
// })

// // const userRequest = axios.create({
// //     baseURL: BASE_URL,
// //     headers: {token:`Bearer ${TOKEN}`}
// // })

// export {
//     clientRequest
// }