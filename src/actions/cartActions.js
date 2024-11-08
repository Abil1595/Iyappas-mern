import {addCartItemRequest, addCartItemSuccess} from '../slices/cartSlice';
import axios from 'axios'

export const addItemToCart = (id, quantity) => async(dispatch) => {
    try {
        dispatch(addCartItemRequest())
        const {data } = await axios.get(`/api/v1/product/${id}`)
        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            offerprice:data.product.offerprice,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity
        }))
    } catch (error) {
        
    }
}