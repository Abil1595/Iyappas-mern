import React, { useEffect, useState } from 'react';

const Countdown = ({ endTime, onReset }) => {
    const [timeRemaining, setTimeRemaining] = useState(endTime - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeRemaining = endTime - Date.now();
            setTimeRemaining(newTimeRemaining);

            // Reset countdown when time expires
            if (newTimeRemaining <= 0) {
                clearInterval(interval);
                onReset(); // Call the reset function from parent component
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [endTime, onReset]);

    // Format time for display (hours, minutes, seconds)
    const formatTime = (time) => {
        if (time <= 0) return 'Expired';
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div>
            {timeRemaining > 0 ? (
                <div>{formatTime(timeRemaining)}</div>
            ) : (
                <div>Expired</div>
            )}
        </div>
    );
};

export default Countdown;
