import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        count: 0,
        total: 0,
    },
    reducers: {
        //Get Cart
        setCart: (state, action) => {
            state.products = action.payload;
            state.count = action.payload.length;
            state.total = action.payload.reduce((total, product) => total + product.price * product.quantity, 0);
        },

        addProduct: (state, action) => {
            const { id_filter, price, quantity } = action.payload;

            const existingProductIndex = state.products.findIndex(
                (product) => product.id_filter === id_filter
            );
            if (existingProductIndex >= 0) {
                state.products[existingProductIndex].quantity += quantity;
            } else {
                state.products.push(action.payload);
                state.count += 1;
            }
            state.total += price * quantity;
        },
        removeProduct: (state, action) => {
            console.log("payload: ", action.payload);
            state.count -= 1;
            state.total -= action.payload.price * action.payload.quantity;
            
            const existingProductIndex = state.products.findIndex(
                (pro) => pro.id_filter === action.payload.id_filter
            );
            state.products.splice(existingProductIndex, 1)
        },
        clearCart: (state) => {
            state.count = 0;
            state.products = [];
            state.total = 0
        }
    }
})

export const { addProduct, setCart, clearCart, removeProduct } = cartSlice.actions
export default cartSlice.reducer