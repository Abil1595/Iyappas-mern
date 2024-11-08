import { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions";
import Loader from '../layouts/Loader';
import { Carousel, Modal } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { addItemToCart } from "../../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";

export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const quantityRef = useRef(null);

    // Countdown logic for product with offer price of 5
    const countdownDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    const [endTime, setEndTime] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        if (product.offerprice === 5) {
            const existingEndTime = localStorage.getItem(`countdown_${id}`);
            if (existingEndTime) {
                setEndTime(Number(existingEndTime));
            } else {
                const newEndTime = Date.now() + countdownDuration;
                setEndTime(newEndTime);
                localStorage.setItem(`countdown_${id}`, newEndTime);
            }
        }
    }, [product.offerprice, id]);

    useEffect(() => {
        if (endTime) {
            const interval = setInterval(() => {
                const remaining = endTime - Date.now();
                if (remaining <= 0) {
                    clearInterval(interval);
                    setEndTime(Date.now() + countdownDuration); // Restart the countdown
                    localStorage.setItem(`countdown_${id}`, Date.now() + countdownDuration);
                }
                setTimeRemaining(remaining);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [endTime]);

    const formatTime = (time) => {
        if (time <= 0) return 'Expired';
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const increaseQty = () => {
        if (product.stock === 0 || quantity >= product.stock) return;
        setQuantity(prevQty => prevQty + 1);
    };

    const decreaseQty = () => {
        if (quantity === 1) return;
        setQuantity(prevQty => prevQty - 1);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData));
    };

    useEffect(() => {
        if (isReviewSubmitted) {
            handleClose();
            toast.success('Review Submitted successfully', {
                position: 'bottom-center',
                onClose: () => dispatch(clearReviewSubmitted()),
            });
        }
        if (error) {
            toast.error(error, {
                position: 'bottom-center',
                onClose: () => dispatch(clearError()),
            });
        }
        if (!product._id || isReviewSubmitted) {
            dispatch(getProduct(id));
        }

        return () => {
            dispatch(clearProduct());
        };
    }, [dispatch, id, isReviewSubmitted, error]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause="hover">
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image._id}>
                                        <img className="d-block w-100" src={image.image} alt={product.name} height="400" width="500" />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product.price}</p>
                            {product.offerprice === 5 && (
                                <div>
                                    <p className="text-danger">Special Offer Price: ${product.offerprice}</p>
                                    <div className="countdown">Offer ends in: {formatTime(timeRemaining)}</div>
                                </div>
                            )}<br/>
                            <div className="stockCounter d-inline">
                                <button className="btn btn-danger minus" onClick={decreaseQty}>-</button>
                                <input ref={quantityRef} type="number" className="form-control count d-inline" value={quantity} readOnly />
                                <button className="btn btn-primary plus" onClick={increaseQty}>+</button>
                            </div>
                            <button
                                type="button"
                                id="cart_btn"
                                disabled={product.stock === 0}
                                onClick={() => {
                                    dispatch(addItemToCart(product._id, quantity));
                                    toast.success('Cart Item Added Successfully!', { position: 'bottom-center' });
                                }}
                                className="btn btn-primary d-inline ml-4"
                            >
                                Add to Cart
                            </button>

                            <hr />

                            <p>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Brand: <strong>{product.Brand}</strong></p>
                            {user ?
                                <button onClick={handleShow} id="review_btn" type="button" className="btn btn-primary mt-4">
                                    Submit Your Review
                                </button> :
                                <div className="alert alert-danger mt-5"> Login to Post Review</div>
                            }

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Submit Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ul className="stars">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <li
                                                key={star}
                                                value={star}
                                                onClick={() => setRating(star)}
                                                className={`star ${star <= rating ? 'orange' : ''}`}
                                                onMouseOver={(e) => e.target.classList.add('yellow')}
                                                onMouseOut={(e) => e.target.classList.remove('yellow')}
                                            >
                                                <i className="fa fa-star"></i>
                                            </li>
                                        ))}
                                    </ul>
                                    <textarea
                                        onChange={(e) => setComment(e.target.value)}
                                        name="review"
                                        id="review"
                                        className="form-control mt-3"
                                    ></textarea>
                                    <button
                                        disabled={loading}
                                        onClick={reviewHandler}
                                        className="btn my-3 float-right review-btn px-4 text-black"
                                    >
                                        Submit
                                    </button>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>

                    {product.reviews && product.reviews.length > 0 && <ProductReview reviews={product.reviews} />}
                </Fragment>
            }
        </Fragment>
    );
}
