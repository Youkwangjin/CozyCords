import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../style/photoslider/PhotoSlider.css';
function PhotoSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
    };

    return (
        <div>
            <Slider {...settings}>
                <div>
                    <img src="/logo.jpg" alt="Logo 1" className="slider-img"/>
                </div>
                <div>
                    <img src="/logo.jpg" alt="Logo 2" className="slider-img"/>
                </div>
                <div>
                    <img src="/logo.jpg" alt="Logo 3" className="slider-img"/>
                </div>
            </Slider>

        </div>
    );
}

export default PhotoSlider;
