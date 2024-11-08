import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderCompleted } from '../../slices/cartSlice';
import { createOrder } from '../../actions/orderActions';
import { clearError as clearOrderError } from '../../slices/orderSlice';

export default function Payment() {
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')) || {};

    const { user } = useSelector(state => state.authState);
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);
    const { error: orderError } = useSelector(state => state.orderState);
 
    const totalPrice = orderInfo.totalPrice || 0;

    const paymentData = {
        amount: Math.round(totalPrice * 100), // Amount in paise
        email: user.email,
        shipping: {
            name: user.name,
            address: shippingInfo.address, // Set as a string directly
        city: shippingInfo.city,
        state: shippingInfo.state,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
            phone: shippingInfo.phoneNo,
        },
        orderDetails: cartItems.map(item => ({
            
            productName: item.name,
            quantity: item.quantity,
            price: item.offerprice ? Math.round(item.offerprice * 100) : Math.round(item.price * 100)// Price in paise
        })),
    };
 
    const order = {
        orderItems: cartItems,
        shippingInfo,
        itemsPrice: orderInfo.itemsPrice || 0,
        shippingPrice: orderInfo.shippingPrice || 0,
        taxPrice: orderInfo.taxPrice || 0,
        totalPrice,
    };

    useEffect(() => {
        if (orderError) {
            toast(orderError, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => {
                    dispatch(clearOrderError());
                },
            });
        }
    }, [orderError, dispatch]);

    const loadRazorpayScript = () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                reject(new Error('Failed to load Razorpay script'));
            };
            document.body.appendChild(script);
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;

        try {
            // Call your backend to create the Razorpay order
            const { data } = await axios.post('/api/v1/payment/process', paymentData);
            const orderId = data.order_id; // Razorpay order_id from backend

            // Load the Razorpay script if not already loaded
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                toast('Razorpay SDK failed to load. Are you online?', {
                    type: 'error',
                    position: 'bottom-center',
                });
                return;
            }

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY, // Razorpay key from environment variable
                amount: data.amount, // Amount in paise
                currency: data.currency,
                name: 'Iyappaa',
                description: 'Payment for products',
                image: '/Images/iyappaa.png', // Your company logo
                order_id: orderId, // Order ID from the backend
                handler: async function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                    // Verify payment signature with your backend
                    const verificationResponse = await axios.post('/api/v1/payment/verify', {
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature,
                        email: user.email, // Send user's email for the verification and email notification
                    });

                    if (verificationResponse.data.success) {
                        // Payment is successful, update order state and navigate to success page
                        order.paymentInfo = {
                            id: razorpay_payment_id,
                            status: 'succeeded',
                        };
                        dispatch(orderCompleted());
                        await dispatch(createOrder(order));

                        navigate('/order/success');
                    } else {
                        toast('Payment verification failed', {
                            type: 'error',
                            position: 'bottom-center',
                        });
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: shippingInfo.phoneNo,
                },
                theme: {
                    color: '#528FF0',
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open(); // Open the Razorpay payment modal

        } catch (error) {
            toast('Payment failed. Please try again', {
                type: 'error',
                position: 'bottom-center',
            });
            document.querySelector('#pay_btn').disabled = false;
        }
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                <center><img src="/Images/logo.svg" width="120" height="95" alt="logo" />
                <h1 className="mb-3">Payment Info</h1></center>
                    <button
                        id="pay_btn"
                        type="submit"
                        className="btn btn-block py-3"
                    >
                        Pay - ₹{totalPrice}
                    </button>
                </form>
            </div>
        </div>
    );
}
