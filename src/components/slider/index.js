import React, { useEffect, useState } from "react";
import { SliderContainer } from "./style";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

function Slider(props) {
  //   const [sliderSwiper, setSliderSwiper] = useState(null);
  const { bannerList } = props;

  //   useEffect(() => {
  //     if (bannerList.length && !sliderSwiper) {
  //       let newSliderSwiper = new Swiper(".slider-container", {
  //         modules: [Pagination],
  //         loop: true,
  //         autoplay: {
  //           delay: 3000,
  //           disableOnInteraction: false,
  //         },
  //         pagination: { el: ".swiper-pagination" },
  //       });
  //       setSliderSwiper(newSliderSwiper);
  //     }
  //   }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="before"></div>
      <Swiper
        className="slider-container"
        pagination={true}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        {bannerList.map((slider) => {
          return (
            <SwiperSlide>
              <div className="slider-nav">
                <img
                  src={slider.imageUrl}
                  width="100%"
                  height="100%"
                  alt="推荐"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderContainer>
  );
}

export default React.memo(Slider);
