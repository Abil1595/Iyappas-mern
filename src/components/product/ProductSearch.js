import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { clearProduct } from "../../slices/productSlice";

export default function ProductSearch() {
    const dispatch = useDispatch();
    const { products = [], loading, productsCount, resPerPage } = useSelector(state => state.productsState);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [rating, setRating] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [category, setCategory] = useState(null);

    const { keyword } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryQueryParam = category || queryParams.get("category");
    const [priceChanged, setPriceChanged] = useState(price);

    // Fetch products based on the current filters or search term
    useEffect(() => {
        dispatch(clearProduct());
        dispatch(getProducts(keyword, priceChanged, categoryQueryParam, rating, currentPage, selectedBrand ? [selectedBrand] : []));
    }, [dispatch, keyword, priceChanged, categoryQueryParam, rating, currentPage, selectedBrand]);

    const setCurrentPageNo = (pageNo) => setCurrentPage(pageNo);

    const categories = [
        'SNACKS', 'GROCERIES', 'HERBAL', 'CANDIES', 'SWEETS', 
        'RICE', 'OIL', 'HOMEAPPLIANCES', 'POOJAITEMS',
    ];

    const brands = [
        'Iyappaa', 'Amrith', 'Venbaa', 'Anil', 'Narasus', 
        'Cothas', 'Manna Mix', 'LG', 'Rajam', 'Nijam', 
        'Tata', 'Lion Dates', 'Little Krishna', 'GokulSantol', 
        'Idhayam', 'Gold Winner', 'Preethi', 'Prestige', 
        'Milton', 'Incense Stick', 'Kungumam'
    ];

    const selectBrand = (brand) => {
        setSelectedBrand(selectedBrand === brand ? null : brand);
        setCurrentPage(1);
    };

    const handleCategoryClick = (cat) => {
        setCategory(cat);
        setCurrentPage(1); // Reset to first page on category change
    };

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <h1 id="products_heading">
                        {category ? `Products in ${category}` : keyword ? `Search Results for "${keyword}"` : "Search Products"}
                    </h1>

                    {selectedBrand && (
                        <div className="selected-brands mt-3 mb-3 ">
                            <div className="brandname"> Selected Brand: <strong>{selectedBrand}</strong></div> 
                        </div>
                    )}

                    <section id="products" className="container mt-5">
                        <div className="row">
                            <div className="col-6 col-md-3 mb-5 mt-5">
                                {/* Price filter */}
                                <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
                                    <Slider
                                        range={true}
                                        marks={{ 1: "$1", 1000: "$1000" }}
                                        min={1}
                                        max={1000}
                                        value={price} // Use value instead of defaultValue
                                        onChange={(price) => setPrice(price)}
                                        handleRender={renderProps => (
                                            <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                                                <div {...renderProps.props}></div>
                                            </Tooltip>
                                        )}
                                    />
                                </div>
                                <hr className="my-5" />
                                
                                {/* Category filter */}
                                <div className="mt-5">
                                    <h3 className="mb-3">Categories</h3>
                                    <ul className="pl-0">
                                        {categories.map((cat) => (
                                            <li
                                                style={{ cursor: "pointer", listStyleType: "none", fontWeight: category === cat ? 'bold' : 'normal' }}
                                                key={cat}
                                                onClick={() => handleCategoryClick(cat)}
                                            >
                                                {cat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <hr className="my-5" />

                                {/* Rating filter */}
                                <div className="mt-5">
                                    <h4 className="mb-3">Ratings</h4>
                                    <ul className="pl-0">
                                        {[5, 4, 3, 2, 1].map(star => (
                                            <li
                                                style={{ cursor: "pointer", listStyleType: "none" }}
                                                key={star}
                                                onClick={() => setRating(star)}
                                            >
                                                <div className="rating-outer">
                                                    <div 
                                                        className="rating-inner"
                                                        style={{ width: `${star * 20}%` }}
                                                    ></div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <hr className="my-5" />

                                {/* Brand filter */}
                                <div className="mt-5">
                                    <h4 className="mb-3">Brands</h4>
                                    <ul className="pl-0">
                                        {brands.map((brand) => (
                                            <li
                                                style={{ cursor: "pointer", listStyleType: "none", fontWeight: selectedBrand === brand ? 'bold' : 'normal' }}
                                                key={brand}
                                                onClick={() => selectBrand(brand)}
                                            >
                                                {brand}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-6 col-md-9">
                                <div className="row">
                                    {products && products.map(product => (
                                        <Product col={4} key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {productsCount > 0 && productsCount > resPerPage && (
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
                        </div>
                    )}
                </Fragment>
            }
        </Fragment>
    );
}
