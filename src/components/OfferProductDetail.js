import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getofferProduct } from '../actions/offerproductActions';
import Countdown from './Countdown';
import { toast } from 'react-toastify';
import './OfferProductDetail.css'; // Ensure this CSS file is correctly set up
import { addItemToCart } from '../actions/cartActions';

const OfferProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    // Select the offerProduct from the Redux store
    const { offerProduct, loading, error } = useSelector(state => state.offerProduct);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            dispatch(getofferProduct(id));
        }
    }, [dispatch, id]);

    const increaseQty = () => {
        if (offerProduct.stock === 0 || quantity >= offerProduct.stock) return;
        setQuantity(prevQty => prevQty + 1);
    };

    const decreaseQty = () => {
        if (quantity === 1) return;
        setQuantity(prevQty => prevQty - 1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Fragment>
            <div className="offer-product-detail container">
                {offerProduct && Object.keys(offerProduct).length > 0 ? (
                    <>
                        <div className="product-image">
                            <img
                                src={offerProduct.images && offerProduct.images.length > 0 
                                    ? offerProduct.images[0].image 
                                    : 'default-image.jpg'} 
                                alt={offerProduct.name || 'Product Image'} 
                            />
                        </div>
                        <div className="product-details">
                            <h1>{offerProduct.name}</h1>
                            <h3>
                                <del style={{ color: 'red' }}>${offerProduct.price}</del> -{' '}
                                <ins style={{ color: 'green' }}>${offerProduct.offerprice}</ins>
                            </h3>
                            <p>{offerProduct.description}</p>
                            <div className="discount-badge">{offerProduct.discount}% OFF</div>

                            {/* Countdown Timer */}
                            <Countdown endTime={localStorage.getItem(`countdown_${id}`)} />

                            <div className="stockCounter d-inline">
                                <button className="btn btn-danger minus" onClick={decreaseQty}>-</button>
                                <input
                                    type="number"
                                    className="form-control count d-inline"
                                    value={quantity}
                                    readOnly
                                />
                                <button className="btn btn-primary plus" onClick={increaseQty}>+</button>
                            </div>

                            <button
                                type="button"
                                id="cart_btn"
                                disabled={offerProduct.stock === 0}
                                onClick={() => {
                                    dispatch(addItemToCart(offerProduct._id, quantity));
                                    toast.success('Cart Item Added Successfully!', { position: 'bottom-center' });
                                }}
                                className="btn btn-primary d-inline ml-4"
                            >
                                Add to Cart
                            </button>

                            <hr />
                            <p>Status: <span className={offerProduct.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">{offerProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                        </div>
                    </>
                ) : (
                    <div>No product details available.</div>
                )}
            </div>
        </Fragment>
    );
};

export default OfferProductDetail;
