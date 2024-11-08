import axios from "axios";
import { offerProductsFail, offerProductsRequest, offerProductsSuccess } from "../slices/offerProductsSlice";
import { offerProductFail, offerProductRequest, offerProductSuccess } from "../slices/offerProductSlice";
export const getOfferProducts = () => async (dispatch) => {
    try {
        dispatch(offerProductsRequest());
        const { data } = await axios.get('/api/v1/offerproducts');
        console.log("Fetched offer products:", data); // Log the fetched data
        dispatch(offerProductsSuccess(data));
    } catch (error) {
        console.error("Error fetching offer products:", error); // Log the error
        dispatch(offerProductsFail(error.response?.data?.message || 'Error fetching offer products'));
    }
};
export const getofferProduct = (id) => async (dispatch) => {
    if (!id) {
        console.error("Invalid ID for getofferProduct:", id);
        return;
    }

    try {
        dispatch(offerProductRequest());
        const { data } = await axios.get(`/api/v1/offerproducts/${id}`);
        console.log("Fetched Offer Product Data:", data); // Log the data
        dispatch(offerProductSuccess(data));
    } catch (error) {
        dispatch(offerProductFail(error.response?.data?.message || "An error occurred"));
    }
};

