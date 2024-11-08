import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [], // Store the list of products
        productsCount: 0, // Total number of products
        resPerPage: 0, // Number of products per page
        error: null, // Error state,
        offerProducts:[]
    },
    reducers: {
        productsRequest(state) {
            // Set loading to true when fetching products
            state.loading = true;
        },
        productsSuccess(state, action) {
            // Update state with fetched products
            state.loading = false;
            state.products = action.payload.products; // Update products
            state.productsCount = action.payload.count; // Update products count
            state.resPerPage = action.payload.resPerPage; // Update products per page
            state.error = null; // Clear any previous error
        },
        productsFail(state, action) {
            // Handle error state
            state.loading = false;
            state.error = action.payload; // Update error
        },
        
        adminProductsRequest(state, action){
            return {
                loading: true
            }
        },
        adminProductsSuccess(state, action){
            return {
                loading: false,
                products: action.payload.products,
            }
        },
        adminProductsFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        clearProducts(state) {
            // Optional: Clear products if needed
            state.products = [];
            state.productsCount = 0;
            state.resPerPage = 0;
            state.error = null; // Clear any existing error
        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        }
    }
});

// Extract actions and reducer
const { actions, reducer } = productsSlice;
export const { productsRequest, productsSuccess, productsFail, clearProducts,adminProductsFail,adminProductsRequest,
    adminProductsSuccess,clearError
 } = actions;
export default reducer;
