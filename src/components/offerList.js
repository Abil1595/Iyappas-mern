import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions'; // Ensure the correct path
import OfferCard from './offerCard'; // Ensure the correct path
import { Row, Col, Card, CardBody } from 'reactstrap';

const OfferList = () => {  
    const dispatch = useDispatch();
    
    // Accessing the state from the Redux store 
    const { products, loading, error } = useSelector((state) => state.productsState);

    // Fetch products when component mounts
    useEffect(() => {
        const offerPrice = 5; // Set the desired offer price
        dispatch(getProducts(null, null, null, null, 1, null, offerPrice)); // Call getProducts with offerprice of 5
    }, [dispatch]);

    // Logging products for debugging
    console.log("Fetched Products:", products);

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Filter products with an offer price of 5
    const filteredProducts = products.filter(product => {
        console.log(`Checking product ${product.name}, offerprice: ${product.offerprice}`); // Debugging log
        return Number(product.offerprice) === 5;
    });
    
    console.log("Filtered Products with offerprice 5:", filteredProducts);

    return (
        <div className="container-fluid">
            <Row className="justify-content-center">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Col sm={4} className="mb-4" key={product._id}>
                            <Card>
                                <center>
                                    <CardBody>
                                        <OfferCard
                                            id={product._id}
                                            imgSrc={product.images[0]?.image || 'default-image.jpg'}
                                            discount={product.discount}
                                            oldPrice={product.price}
                                            newPrice={product.offerprice}
                                            productName={product.name}
                                            product={product}
                                        />
                                    </CardBody>
                                </center>
                            </Card> 
                        </Col>
                    ))
                ) : (
                    <div>No products available with offer price of 5.</div>
                )}
            </Row>
        </div>
    );
};

export default OfferList;
