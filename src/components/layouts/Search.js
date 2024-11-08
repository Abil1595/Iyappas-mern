import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const location = useLocation();

    // List of categories
    const categories = [
        "SNACKS",
        "GROCERIES",
        "HERBAL",
        "CANDIES",
        "SWEETS",
        "RICE",
        "OIL",
        "HOMEAPPLIANCES",
        "POOJAITEMS",
    ];

    const searchHandler = (e) => {
        e.preventDefault();

        // Check if the keyword matches any category
        const matchedCategory = categories.find(
            (category) => category.toLowerCase() === keyword.trim().toLowerCase()
        );

        if (matchedCategory) {
            // If it's a category, navigate to the category page
            navigate(`/search?category=${matchedCategory}`);
        } else {
            // If it's not a category, navigate using the keyword for product search
            navigate(`/search/${keyword}`);
        }
    };

    const clearKeyword = () => {
        setKeyword("");
    };

    useEffect(() => {
        if (location.pathname === "/") {
            clearKeyword();
        }
    }, [location]);

    return (
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Product Name/Category ..."
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                /> 
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Search;
