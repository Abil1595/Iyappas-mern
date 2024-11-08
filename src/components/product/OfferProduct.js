import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../layouts/Loader'; // Assuming you have a Loader component
import MetaData from '../layouts/MetaData'; // Assuming you have a MetaData component

const OfferProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [product, setProduct] = useState(null); // State to hold product details
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5500/api/v1/offerproducts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data); // Set the product details
      } catch (error) {
        setError(error.message); // Set the error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProductDetails(); // Call the fetch function
  }, [id]);

  if (loading) return <Loader />; // Show loader while fetching
  if (error) return <div>Error: {error}</div>; // Display error if there is one

  // Destructure product details
  const { name, images, price, description, discount, stock } = product;

  return (
    <div className="product-detail">
      <MetaData title={name} />
      <h1>{name}</h1>
      <div className="product-images">
        {images.map((image) => (
          <img key={image._id} src={image.image} alt={name} />
        ))}
      </div>
      <div className="product-info">
        <h3>
          <del style={{ color: 'red' }}>${price + discount}</del> -{' '}
          <ins style={{ color: 'green' }}>${price}</ins>
        </h3>
        <p>{description}</p>
        <p>Status: <span className={stock > 0 ? 'greenColor' : 'redColor'}>{stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
      </div>
     
    </div>
  );
};

export default OfferProduct;
