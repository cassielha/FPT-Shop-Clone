import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const HomeCardItem = ({ item }) => {
    return (
        <a href={item.link}>
            <div className="BgFrameResponsive_frameWrapper">
                <div className="BgFrameResponsive_frame"></div>
                <img
                    alt={item.alt}
                    loading="lazy"
                    className="rounded-2xl mb:rounded-[10px]"
                    style={{ color: 'transparent' }}
                    srcSet={item.img_srcset}
                    src={item.img_src}
                />
            </div>
        </a>
    );
};

const HomeCardSlider = ({ data, slidesPerView = 2 }) => {
    const wrapperRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (!wrapperRef.current || !data.items.length) return;

        const swiperEl = wrapperRef.current.querySelector('.swiper');
        const nextBtn = wrapperRef.current.querySelector('.CarouselArrow_nextArrowDefault');
        const prevBtn = wrapperRef.current.querySelector('.CarouselArrow_prevArrowDefault');

        swiperRef.current = new Swiper(swiperEl, {
            modules: [Navigation],
            slidesPerView: 1,
            spaceBetween: 12,
            breakpoints: {
                769: {
                    slidesPerView,
                    spaceBetween: 15,
                }
            },
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
        });

        return () => {
            swiperRef.current?.destroy(true, true);
        };
    }, [data.items, slidesPerView]);

    if (!data.items.length) return null;

    return (
        <div>
            <div className="relative py-3 md:py-2.5" ref={wrapperRef}>
                <div className="container">
                    <div className={`HomeCard_homeCard ${!data.name ? ' bg-transparent p-0' : ''}`}>
                        {data.name && (
                            <div className="flex">
                                <h2 className="flex-1 h4-semibold">
                                    {data.name}
                                </h2>
                            </div>
                        )}

                        <div className={` ${data.name ? 'mt-5' : ''}`}>
                            <div className="swiper">
                                <div className="swiper-wrapper ">
                                    {data.items.map((item, index) => (
                                        <div key={index} className="swiper-slide">
                                            <HomeCardItem item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="Slider_carouselArrow">
                                <button
                                    className="CarouselArrow_prevArrowDefault CarouselArrow_prevArrowWhite CarouselArrow_prevArrowLarge"
                                    style={{ left: '-20px', top: '50%' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none">
                                        <path d="M12.2676 15.793C11.9677 16.0787 11.493 16.0672 11.2073 15.7672L6.20597 10.5168C5.93004 10.2271 5.93004 9.77187 6.20597 9.4822L11.2073 4.23173C11.493 3.93181 11.9677 3.92028 12.2676 4.20597C12.5676 4.49166 12.5791 4.96639 12.2934 5.26631L7.78483 9.99949L12.2934 14.7327C12.5791 15.0326 12.5676 15.5073 12.2676 15.793Z" fill="#090D14" />
                                    </svg>
                                </button>
                                <button
                                    className="CarouselArrow_nextArrowDefault CarouselArrow_nextArrowWhite CarouselArrow_nextArrowLarge"
                                    style={{ right: '-20px', top: '50%' }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.29289 4.29289C7.90237 4.68342 7.90237 5.31658 8.29289 5.70711L14.5858 12L8.29289 18.2929C7.90237 18.6834 7.90237 19.3166 8.29289 19.7071C8.68342 20.0976 9.31658 20.0976 9.70711 19.7071L16.7071 12.7071C17.0976 12.3166 17.0976 11.6834 16.7071 11.2929L9.70711 4.29289C9.31658 3.90237 8.68342 3.90237 8.29289 4.29289Z" fill="#090D14" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCardSlider;