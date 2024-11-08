import { createSlice } from "@reduxjs/toolkit";

const offerProductSlice = createSlice({
    name: 'offerProduct',
    initialState: {
        loading: false,
        offerProduct: {}, // Store the details of a single offer product
        isReviewSubmitted: false,
        isOfferProductCreated: false,
        isOfferProductDeleted: false,
        isOfferProductUpdated: false,
        isReviewDeleted: false,
        reviews: [] // Store reviews for the offer product
    },
    reducers: {
        offerProductRequest(state, action) {
            return {
                ...state,
                loading: true,
            };
        },
        offerProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                offerProduct: action.payload.product // Update the state with the fetched offer product
            };
        },
        offerProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        },
        createOfferReviewRequest(state, action) {
            return {
                ...state,
                loading: true
            };
        },
        createOfferReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true
            };
        },
        createOfferReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        },
        clearOfferReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            };
        },
        clearOfferError(state, action) {
            return {
                ...state,
                error: null
            };
        },
        clearOfferProduct(state, action) {
            return {
                ...state,
                offerProduct: {}
            };
        },
        newOfferProductRequest(state, action) {
            return {
                ...state,
                loading: true
            };
        },
        newOfferProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                offerProduct: action.payload.offerProduct,
                isOfferProductCreated: true
            };
        },
        newOfferProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isOfferProductCreated: false
            };
        },
        clearOfferProductCreated(state, action) {
            return {
                ...state,
                isOfferProductCreated: false
            };
        },
        deleteOfferProductRequest(state, action) {
            return {
                ...state,
                loading: true
            };
        },
        deleteOfferProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOfferProductDeleted: true
            };
        },
        deleteOfferProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        clearOfferProductDeleted(state, action) {
            return {
                ...state,
                isOfferProductDeleted: false
            };
        },
        updateOfferProductRequest(state, action) {
            return {
                ...state,
                loading: true
            };
        },
        updateOfferProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                offerProduct: action.payload.offerProduct,
                isOfferProductUpdated: true
            };
        },
        updateOfferProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        clearOfferProductUpdated(state, action) {
            return {
                ...state,
                isOfferProductUpdated: false
            };
        },
        offerReviewsRequest(state, action) {
            return {
                ...state,
                loading: true
            };
        },
        offerReviewsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews // Store reviews for the offer product
            };
        },
        offerReviewsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        },
        deleteOfferReviewRequest(state, action) {
            return {
                ...state,
                loading: true
            };
        },
        deleteOfferReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewDeleted: true
            };
        },
        deleteOfferReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        clearOfferReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            };
        },
    }
});

// Extract actions and reducer
const { actions, reducer } = offerProductSlice;
export const {
    offerProductRequest,
    offerProductSuccess,
    offerProductFail,
    createOfferReviewRequest,
    createOfferReviewSuccess,
    createOfferReviewFail,
    clearOfferReviewSubmitted,
    clearOfferError,
    clearOfferProduct,
    newOfferProductRequest,
    newOfferProductSuccess,
    newOfferProductFail,
    clearOfferProductCreated,
    deleteOfferProductRequest,
    deleteOfferProductSuccess,
    deleteOfferProductFail,
    clearOfferProductDeleted,
    updateOfferProductRequest,
    updateOfferProductSuccess,
    updateOfferProductFail,
    clearOfferProductUpdated,
    offerReviewsRequest,
    offerReviewsSuccess,
    offerReviewsFail,
    deleteOfferReviewRequest,
    deleteOfferReviewSuccess,
    deleteOfferReviewFail,
    clearOfferReviewDeleted,
} = actions;

export default reducer;
