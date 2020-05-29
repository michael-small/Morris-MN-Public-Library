import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default class Carousel extends React.Component {
    render() {
        var settings = {
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true 
        };
        return (

            <Slider {...settings}>
                <div>
                    <h3>According to all known laws of aviation,there is no way a bee should be able to fly.
                        <br/>
                        Its wings are too small to get its fat little body off the ground.
                        <br/>
                        The bee, of course, flies anyway!!
                    </h3>
                </div>
                <div>
                    <img src="http://placekitten.com/g/400/200" />
                </div>
                <div>
                    <h3>There are 2 hard problems in computer science: cache invalidation, naming things, and off-by-1 errors.</h3>
                </div>
            </Slider>
        )
    }
}