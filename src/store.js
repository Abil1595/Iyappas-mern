import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productsReducer from "./slices/productsSlice"
import productReducer from "./slices/productSlice"
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"
import userReducer from "./slices/userSlice"
import offerProductReducer from "./slices/offerProductSlice"; // New offer product slice
import offerProductsReducer from "./slices/offerProductsSlice"
const reducer=combineReducers({
   productsState:productsReducer,
   productState:productReducer,
   authState:authReducer,
   cartState:cartReducer,
   orderState:orderReducer,
   userState:userReducer,
   offerProduct: offerProductReducer,
   offerProducts:offerProductsReducer
})
const store = configureStore({
    reducer,
    // Use only default middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
export default store;