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

                        <div className="Slider_sliderWrapper">
                            <div className="swiper !overflow-hidden">
                                <div className="swiper-wrapper !flex !flex-row">
                                    {data.items.map((item, index) => (
                                        <div key={index} className="swiper-slide Slider_slideItem3 h-auto">
                                            <HomeCardItem item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='Slider_carouselArrow'>
                                <button
                                    className="CarouselArrow_prevArrowDefault CarouselArrow_prevArrowWhite CarouselArrow_prevArrowLarge"
                                    aria-label="Previous"
                                >
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    className="CarouselArrow_nextArrowDefault CarouselArrow_nextArrowWhite CarouselArrow_nextArrowLarge"
                                    aria-label="Next"
                                >
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
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