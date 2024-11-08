import { createSlice } from "@reduxjs/toolkit";

const offerProductsSlice = createSlice({
    name: 'offerProducts',
    initialState: {
        loading: false,
        offerProducts: [], // Store the list of offer products
        offerProductsCount: 0, // Total number of offer products
        resPerPage: 0, // Number of offer products per page
        error: null, // Error state
    },
    reducers: {
        offerProductsRequest(state) {
            // Set loading to true when fetching offer products
            state.loading = true;
        },
        offerProductsSuccess(state, action) {
            // Update state with fetched offer products
            state.loading = false;
            state.offerProducts = action.payload.products; // Update offer products
            state.offerProductsCount = action.payload.count; // Update offer products count
            state.resPerPage = action.payload.resPerPage; // Update products per page
            state.error = null; // Clear any previous error
        },
        offerProductsFail(state, action) {
            // Handle error state
            state.loading = false;
            state.error = action.payload; // Update error
        },
        clearOfferProducts(state) {
            // Optional: Clear offer products if needed
            state.offerProducts = [];
            state.offerProductsCount = 0;
            state.resPerPage = 0;
            state.error = null; // Clear any existing error
        },
        clearOfferError(state) {
            state.error = null; // Clear any existing offer error
        }
    }
});

// Extract actions and reducer
const { actions, reducer } = offerProductsSlice;
export const {
    offerProductsRequest,
    offerProductsSuccess,
    offerProductsFail,
    clearOfferProducts,
    clearOfferError,
} = actions;
export default reducer;
