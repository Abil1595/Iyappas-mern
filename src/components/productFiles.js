import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import './ProductFiles.css'; // Import the CSS file for styles

export default function ProductFiles() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState(null); // State to manage the selected category

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo); // This will update the current page state and trigger useEffect
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: 'bottom-center'
            });
        }
        // Fetch products for the current page and selected category
        dispatch(getProducts(null, null, category, null, currentPage));
    }, [dispatch, error, currentPage, category]); // Include category in dependencies

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory); // Update the selected category
        setCurrentPage(1); // Reset to the first page when changing categories
    };

    const categories = [
        'SNACKS',
        'GROCERIES',
        'HERBAL',
        'CANDIES',
        'SWEETS',
        'RICE',
        'OIL',
        'HOMEAPPLIANCES',
        'POOJAITEMS'
    ];

    return ( 
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <h1 id="products_heading">Products Based On Categories</h1>

                    {/* Category Selector */}
                    <div className="category-selector">
                        {categories.map((cat) => (
                            <button 
                                key={cat} 
                                className={`category-button ${category === cat ? 'active' : ''}`} 
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                                <Product col={3} key={product._id} product={product} />
                            ))}
                        </div>
                    </section>

                    {productsCount > 0 && productsCount > resPerPage ?
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />
                        </div> : null
                    }
                </Fragment>
            }
        </Fragment>
    );
}
