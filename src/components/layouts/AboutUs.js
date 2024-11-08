import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css'; // Create a CSS file for additional styles

function AboutUs() {
    // Scroll Animation for In-Viewport Detection
    useEffect(() => {
        const handleScroll = () => {
            const columns = document.querySelectorAll('.customers .col-md-4');
            columns.forEach((column) => {
                if (isInViewport(column)) {
                    column.classList.add('in-view');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    return (
        <div className="container-fluid mt-1">
            <div className="row">
                {/* About Us Card */}
                <div className="col-md-12">
                    <div className="card">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src="images/products/about.jpg" className="card-img" alt="About Us" />
                            </div>
                            <div className="col-md-8 d-flex align-items-center">
                                <div className="card-body">
                                    <h5 className="card-title">About us</h5>
                                    <p className="card-text">
                                        Welcome to Iyappaa Food Industries, your one-stop shop for a wide range of delicious snacks, sweets, and groceries. Enjoy quality products, friendly service, and great prices all in one place. Your trusted source for all your grocery and snack needs. We’re dedicated to providing high-quality products and exceptional service.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="row mt-3">
                <div className="col-md-8 d-flex flex-column">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Our Mission</h5>
                            <p className="card-text">
                                Our mission is to provide our customers with a wide selection of delicious and nutritious snacks and groceries. We strive to make it easy for you to find everything you need, all in one place.
                            </p>
                        </div>
                    </div>

                    {/* Quality Cards */}
                    <div className="row mt-3">
                        <div className="col-12 col-md-4 mb-3">
                            <div className="card quality">
                                <h6 className="card-title innerTitle">Quality</h6>
                                <p className="card-text innerText">
                                    We source our products from trusted suppliers and ensure they meet the highest standards.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mb-3">
                            <div className="card quality">
                                <h6 className="card-title innerTitle">Variety</h6>
                                <p className="card-text innerText">
                                    We offer a wide range of high-quality products to meet the diverse needs of our valued customers.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mb-3">
                            <div className="card quality">
                                <h6 className="card-title innerTitle">Convenience</h6>
                                <p className="card-text innerText">
                                    We strive to make shopping with us a seamless experience. Our stores are designed for your convenience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <img src="images/products/mission.jpg" className="card-img" alt="Our Mission" />
                </div>
            </div>

            {/* History Section */}
            <div className="history mt-3">
                <img src="images/products/New.png" width="100%" alt="Our History" />
            </div>

            {/* Our Customers Card */}
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="container">
                            <h5 className="card-title">Our Customers</h5>
                            <p className="card-text">
                                We are committed to providing our customers with the best possible experience. We listen to their feedback and strive to continuously improve our products and services.
                            </p>
                            <div className="row">
                                <div className="col-md-4">
                                    <h6 className="innerTitle">Families</h6>
                                    <p className="innerText">We offer a wide variety of family-friendly products, including healthy snacks and ready-to-eat meals.</p>
                                </div>
                                <div className="col-md-4 ">
                                    <h6 className="innerTitle">Individuals</h6>
                                    <p className="innerText">We offer a wide variety of products to meet the needs of individuals, including healthy snacks & specialty items.</p>
                                </div>
                                <div className="col-md-4 ">
                                    <h6 className="innerTitle">Businesses</h6>
                                    <p className="innerText">We offer bulk ordering and delivery services for businesses.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Commitment Card */}
            <div className="row commitment mt-3">
                <div className="col-md-12">
                    <div className="card">
                        <img src="images/products/commitment.jpg" className="commitment-img" alt="Our Commitment" />
                        <div className="container mt-3">
                            <h5 className="card-title">Our Commitment to Quality</h5>
                            <p className="card-text">
                                We are committed to providing our customers with the highest quality products and services. We source our products from trusted suppliers and maintain strict quality control standards.
                            </p>
                            <div className="row commitment-card">
                                <div className="col-md-3">
                                    <div className="quality-control">
                                        <center>
                                            <h5 className="innerTitle">Quality Control</h5>
                                        </center>
                                        <p className="innerText">We provide high-quality products through trusted suppliers & strict quality control.</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="quality-control">
                                        <center>
                                            <img src="images/products/store.png" className="store" alt="Variety Icon" />
                                            <h5 className="innerTitle">Variety</h5>
                                        </center>
                                        <p className="innerText">We offer a wide range of grocery items, from everyday essentials to exotic ingredients.</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="quality-control">
                                        <center>
                                            <img src="images/products/food-safety.png" className="store" alt="Food Safety Icon" />
                                            <h5 className="innerTitle">Food Safety</h5>
                                        </center>
                                        <p className="innerText">We adhere to the highest standards of food safety, hygiene, and quality practices.</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="quality-control">
                                        <center>
                                            <img src="images/products/customer-review.png" className="store" alt="Customer Satisfaction Icon" />
                                            <h5 className="innerTitle">Customer Satisfaction</h5>
                                        </center>
                                        <p className="innerText">We are committed to providing our customers with the best possible experience.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
