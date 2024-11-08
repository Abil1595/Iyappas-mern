import React, { useEffect, useState } from 'react';
import Countdown from './Countdown';
import { Link } from 'react-router-dom';

const OfferCard = ({ imgSrc, discount, oldPrice, newPrice, productName, id, product }) => {
    const countdownDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    const [endTime, setEndTime] = useState(null);

    useEffect(() => {
        const initializeEndTime = () => {
            const existingEndTime = localStorage.getItem(`countdown_${id}`);
            if (existingEndTime) {
                setEndTime(Number(existingEndTime));
            } else {
                const newEndTime = Date.now() + countdownDuration;
                setEndTime(newEndTime);
                localStorage.setItem(`countdown_${id}`, newEndTime);
            }
        };

        if (id) {
            initializeEndTime();
        } else {
            console.error("ID is undefined in OfferCard");
        }
    }, [id]);

    const handleReset = () => {
        const newEndTime = Date.now() + countdownDuration;
        setEndTime(newEndTime);
        localStorage.setItem(`countdown_${id}`, newEndTime);
    };

    return (
        <div className="offer-card">
            <div className="offer-image">
                <img src={imgSrc || 'default-image.jpg'} alt={productName} />
                <div className="discount-badge">{discount}% OFF</div>
            </div>
            <div className="offer-details">
                <h2>{productName}</h2>
                <div style={{ marginTop: '5px' }}>
                    <h3>
                        <del style={{ color: 'red' }}>${oldPrice}</del> -{' '}
                        <ins style={{ color: 'green' }}>${newPrice}</ins>
                    </h3>
                </div>
                <p>Enjoy a {discount}% discount on {productName}!</p>
                <div className='countdown'>
                    {endTime ? (
                        <Countdown endTime={endTime} onReset={handleReset} />
                    ) : (
                        <div>Loading...</div>
                    )}
                    <br />
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
