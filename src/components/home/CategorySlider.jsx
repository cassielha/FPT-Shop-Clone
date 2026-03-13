import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

const CategoryItem = ({ item }) => {
    return (
        <a className="group" href={item.link}>
            <div className="flex flex-col items-center text-center pc:pb-5">
                <img
                    alt={item.name}
                    loading="lazy"
                    width="130"
                    height="130"
                    decoding="async"
                    className="size-[58px] rounded-2 transition duration-300 group-hover:scale-105 pc:size-[90px]"
                    style={{ color: 'transparent' }}
                    srcSet={item.img_srcset}
                    src={item.img_src}
                />
                <p
                    title={item.name}
                    className="line-clamp-2 pt-2 text-textOnWhitePrimary f1-medium pc:b1-medium min-h-[44px] pc:min-h-[56px]"
                >
                    {item.name}
                </p>
            </div>
        </a>
    );
};

const CategorySlider = ({ data }) => {
    const wrapperRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (!wrapperRef.current || !data.items.length) return;

        const swiperEl = wrapperRef.current.querySelector('.swiper');
        const nextBtn = wrapperRef.current.querySelector('.CarouselArrow_nextArrowDefault');
        const prevBtn = wrapperRef.current.querySelector('.CarouselArrow_prevArrowDefault');

        swiperRef.current = new Swiper(swiperEl, {
            modules: [Navigation, Grid],
            slidesPerView: 4,
            spaceBetween: 16,
            grid: {
                rows: 2,
                fill: 'row',
            },
            breakpoints: {
                769: {
                    slidesPerView: 8,
                    spaceBetween: 12,
                    grid: { rows: 2, fill: 'row' },
                },
            },
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            grabCursor: true,
            touchStartPreventDefault: false,
        });

        return () => {
            swiperRef.current?.destroy(true, true);
        };
    }, [data.items]);

    if (!data.items?.length) return null;

    return (
        <div className="pc:container pc:px-5 pc:py-2.5 min-h-[280px] pc:min-h-[300px]">
            <div className="pc:rounded-2xl" style={{ backgroundColor: 'white' }}>
                <div className="py-3 pc:px-6 pc:py-5">
                    <p className="mb-3 text-textOnWhitePrimary mb:pl-4 pc:mb-5 pc:h6-semibold l7-semibold">
                        {data.name}
                    </p>
                    <div className="swiper-wrapper" ref={wrapperRef}>
                        <div className="swiper mb:pl-4 !overflow-hidden">
                            <div className="swiper-wrapper !flex !flex-row !flex-wrap">
                                {data.items.map((item, index) => (
                                    <div key={index} className="swiper-slide">
                                        <CategoryItem item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="Slider_carouselArrow">
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
    );
};

export default CategorySlider;