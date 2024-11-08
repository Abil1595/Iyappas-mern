import MetaData from '../layouts/MetaData';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutStep';
import { toast } from 'react-toastify';

export default function ConfirmOrder() {
    const { shippingInfo, items: cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();

    // Calculate prices
    const itemsPrice = cartItems.reduce((acc, item) => 
        acc + item.quantity * (item.offerprice ? item.offerprice : item.price), 0
    );
    const shippingPrice = itemsPrice > 200 ? 0 : 5;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2);

    // Proceed to Payment
    const processPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        };
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    };

    // Redirect to shipping if shipping info is missing
    useEffect(() => {
        if (!shippingInfo || !shippingInfo.address) {
            toast.error("Please fill out the shipping information first", { position: 'bottom-center', toastId: 'missing-shipping-info' });
            navigate('/shipping');
        }
    }, [shippingInfo, navigate]);

    if (!shippingInfo || !shippingInfo.address) {
        return null;  // Do not render component until shipping info is available
    }

    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm"> 
                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user?.name}</p>
                    <p><b>Phone:</b> {shippingInfo?.phoneNo || 'Not provided'}</p>
                    <p className="mb-4"><b>Address:</b> 
                        {`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.postalCode}, ${shippingInfo?.state}, ${shippingInfo?.country}` || 'Not provided'}
                    </p>
                     
                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4> 

                    {cartItems.map(item => (
                        <Fragment key={item.product}>
                            <div className="cart-item my-1">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link className='prodnames' to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.offerprice ? item.offerprice : item.price} = <b>${item.quantity * (item.offerprice ? item.offerprice : item.price)}</b></p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>
                
                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice.toFixed(2)}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
