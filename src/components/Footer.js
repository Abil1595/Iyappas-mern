import React from 'react';
import './Footer.css'; // Import your CSS file

const Footer = () => {
  return (
    <div className="footer">
      <div className="empty"></div>
      <div className="address">
        <div className="iyappaa-address">
          <b>Head Office</b>
          <br />
          IYYAPPAA SWEETS & SNACKS INC
          <p>
            2721, Markham Road, Unit #18,
            <br />
            Scaraborough-M1X 1L5, Toronto, Canada
          </p>
        </div>

        <div className="branches">
          <b>Branches</b>
          <br />
          IYYAPPAA FOOD INDUSTRIES UK LTD
          <p>
            No 5, Mameulah Court, Newmachar,
            <br />
            Aberdeenshire, Ab21OLS, United Kingdom
          </p>
        </div>

        <b>Available Countries</b>
        <br />
        <div className="countries">
          <div className="canada">
            <p>Canada</p>
            <img
              src="https://img.icons8.com/?size=100&id=Dum84gAXfBP6&format=png&color=000000"
              className="flag"
              alt="Canada Flag"
            />
          </div>
          <div className="canada">
            <p>USA</p>
            <img
              src="https://img.icons8.com/?size=100&id=yzSggttkqLf4&format=png&color=000000"
              className="flag"
              alt="USA Flag"
            />
          </div>
          <div className="canada">
            <p>France</p>
            <img
              src="https://img.icons8.com/?size=100&id=5RtaKEr09Jy6&format=png&color=000000"
              className="flag"
              alt="France Flag"
            />
          </div>
          <div className="canada">
            <p>Switzerland</p>
            <img
              src="https://img.icons8.com/?size=100&id=nz6Zx2vJbzRG&format=png&color=000000"
              className="flag"
              alt="Switzerland Flag"
            />
          </div>
          <div className="canada">
            <p>Germany</p>
            <img
              src="https://img.icons8.com/?size=100&id=OyqucOGoByl9&format=png&color=000000"
              className="flag"
              alt="Germany Flag"
            />
          </div>
          <div className="canada">
            <p>UK</p>
            <img
              src="https://img.icons8.com/?size=100&id=xapj7ZzAUZKI&format=png&color=000000"
              className="flag"
              alt="UK Flag"
            />
          </div>
        </div>
      </div>
      <div className="footer-category">
        <b>Categories</b>
        <div className="category-item">
          <p>Sweets</p>
          <p>Snacks</p>
          <p>Candies</p>
          <p>Groceries</p>
          <p>Rice</p>
          <p>Oil</p>
          <p>Herbal & Organic</p>
          <p>Home Appliances</p>
        </div>
        <b>Popular Brands</b>
        <div className="brand-name">
          <p>Iyappaa</p>
          <p>Amirth</p>
          <p>Venbaa</p>
          <p>Little Krishna</p>
        </div>
      </div>
      <br />
      <div className="faq">
        <b>FAQ</b>
        <div className="term-condition">
          <h2>Terms & Conditions</h2>
        </div>
        <b>Website</b>
        <div className="website">
          <p>www.iyappaa.com</p>
        </div>
        <b>Contact Us</b>
        <br />
        <input type="text" name="contact" className="contact-input" /> @gmail.com
      </div>
    </div>
  );
};

export default Footer;
