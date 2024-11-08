import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "reactstrap";

function New() {
    const url = "http://localhost:5500/api/v1/products"; // Adjust URL as per your backend
    const [data, setData] = useState([]);  // Initial state as an array

    useEffect(() => {
        axios.get(url)
            .then(res => {
                // Check if the response data is an array or an object with array inside
               
                    setData(res.data.products);  // Assuming the response contains a `products` array
                
            })
            .catch(err => {
                console.error("Error fetching data: ", err);
            });
    }, []);  // Empty dependency array to run useEffect only once when component mounts

    return (
        <div>
            <Container>
            {
                data.length > 0 ? (
                    data.map((user, index) => (
                        <div key={index}>
                            {user.name}<br/>
                            {user.price}  {/* Replace with actual user field */}
                        </div>
                    ))
                ) : (
                    <p>No data available</p>  // In case the data is empty or not loaded yet
                )
            }
            </Container>
        </div>
    );
}

export default New;
