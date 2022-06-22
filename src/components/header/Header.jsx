import React from 'react';
import './header.css';
import logo2 from '../../img/logo.png'

const Header = () => {
    const nav = ['About', 'Services', 'Pricing', 'Blog']
    return (
        <header className='header'>
            <div className="header__wrapper">
                <div className="header__top">
                    <div className="header__logo">
                        <img src={logo2} alt="" />
                        <span>Agency</span>
                    </div>
                    <div className="header__nav">
                        {/* По хорошему тут NavLink надо использовать, но качать библиотеку
                     ради псевдо использования не надо */}
                        {nav.map((item, index) => <a href="#" key={index}>{item}</a>)}
                    </div>
                    <div className="header__contact-btn">contact</div>
                </div>
                <div className="header__title">
                    Portfolio
                </div>
                <div className="header__sub-title">
                    Agency provides a full service range including technical skills, design, business understanding.
                </div>
            </div>
        </header>
    );
}

export default Header;
