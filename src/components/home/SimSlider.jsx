import { useState, useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const SimItem = ({ item }) => (
    <a
        className="flex h-full flex-col rounded-[10px] border border-transparent px-4 pb-4 pt-3 transition-all hover:border-red-red-7"
        style={{ background: 'radial-gradient(506.22% 134.18% at 0% 10.53%, #F3F4F6 0%, #F3F4F6 100%)' }}
        href={item.link}
    >
        <div className="mb-4 grid grid-cols-[1fr_56px]">
            <div>
                <p className="text-textOnWhitePrimary f1-semibold">FPT</p>
                <h3 title={item.name} className="mt-1.5 line-clamp-1 text-textOnWhitePrimary f1-semibold">
                    {item.name}
                </h3>
                <p className="text-textOnWhiteBrand l6-semibold">{item.price}</p>
            </div>
            <div className="flex items-end">
                <img
                    alt="sim card"
                    loading="lazy"
                    width="56"
                    height="40"
                    decoding="async"
                    srcSet={`${item.icon} 1x, ${item.icon} 2x`}
                    src={item.icon}
                />
            </div>
        </div>
        <div className="flex flex-col text-textOnWhitePrimary f1-regular">
            <span className="mb-2 line-clamp-1">{item.data}</span>ư
            <p className="line-clamp-2 whitespace-pre-line">{item.description || ''}</p>
        </div>
    </a>
);


const SimSlider = ({ categories = [] }) => {
    const [activeId, setActiveId] = useState(categories[0]?.id ?? null);

    const tabSwiperElRef = useRef(null);
    const tabSwiperRef = useRef(null);
    const itemSwiperElRef = useRef(null);
    const itemSwiperRef = useRef(null);

    // Init tab Swiper once
    useEffect(() => {
        if (!tabSwiperElRef.current || !categories.length) return;

        tabSwiperRef.current = new Swiper(tabSwiperElRef.current, {
            modules: [FreeMode],
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
        });

        return () => {
            tabSwiperRef.current?.destroy(true, true);
            tabSwiperRef.current = null;
        };
    }, [categories]);

    // Re-init item Swiper when active tab changes
    useEffect(() => {
        if (!itemSwiperElRef.current || !activeId) return;

        if (itemSwiperRef.current) {
            itemSwiperRef.current.destroy(true, true);
            itemSwiperRef.current = null;
        }

        const nextBtn = itemSwiperElRef.current.parentElement.querySelector('.CarouselArrow_nextArrowDefault');
        const prevBtn = itemSwiperElRef.current.parentElement.querySelector('.CarouselArrow_prevArrowDefault');

        itemSwiperRef.current = new Swiper(itemSwiperElRef.current, {
            modules: [Navigation],
            slidesPerView: 'auto',
            spaceBetween: 8,
            navigation: { nextEl: nextBtn, prevEl: prevBtn },
            breakpoints: {
                1024: { slidesPerView: 4, spaceBetween: 16 },
            },
        });

        return () => {
            itemSwiperRef.current?.destroy(true, true);
            itemSwiperRef.current = null;
        };
    }, [activeId]);

    const activeCategory = categories.find(c => c.id === activeId);

    if (!categories.length) return null;

    return (
        <div className="relative overflow-hidden">
            <div className="container relative py-2.5">
                <div className="relative hidden pc:block z-1 min-h-[174px] rounded-t-2xl">
                    <img
                        alt="https://fptshop.com.vn/"
                        loading="lazy"
                        decoding="async"
                        className="-z-10 object-cover object-left-top"
                        sizes="100vw"
                        srcSet="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/Desktop_H1_52ce23eeea.png 360w, https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/Desktop_H1_52ce23eeea.png 1920w"
                        src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/Desktop_H1_52ce23eeea.png"
                        style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }}
                    />
                </div>

                <div className="relative block pc:hidden z-1 min-h-[174px] rounded-t-2xl">
                    <img
                        alt="https://fptshop.com.vn/"
                        loading="lazy"
                        decoding="async"
                        className="-z-10 object-cover object-left-top"
                        sizes="100vw"
                        srcSet="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/Mobile_MH_1_6af0e3b9cb.png 360w, https://cdn2.fptshop.com.vn/unsafe/1240x0/filters:format(webp):quality(75)/Mobile_MH_1_6af0e3b9cb.png 1240w"
                        src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:format(webp):quality(75)/Mobile_MH_1_6af0e3b9cb.png"
                        style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }}
                    />
                </div>

                <div className="min-h-[212px] rounded-b-2xl bg-white pb-4 pl-4 pt-3 mb:overflow-hidden pc:min-h-[246px] pc:px-6 pc:pb-6 pc:pt-4">
                    <div className="Tabs_tabContainer pc:mb-4 mb-3 block relative scrollbar-none">
                        <div className="ScrollSwiper_scrollWrapper">
                            <div className="swiper list-thumb-specs w-full items-center border-y border-none z-9" ref={tabSwiperElRef}>
                                <div className="swiper-wrapper" id="sim-fpt-tabs-container">
                                    {categories.map((category, index) => (
                                        <div key={category.id} className="swiper-slide w-fit">
                                            <button
                                                onClick={() => setActiveId(category.id)}
                                                className={`Tabs_button hover:border-red-red-7 min-h-[32px] hover:text-textOnWhiteBrand mr-2 cursor-pointer rounded-[40px] px-2.5 py-1.5 b2-medium border Tabs_large Tabs_buttonLarge ${activeId === category.id
                                                    ? 'border-red-red-7 text-textOnWhiteBrand Tabs_buttonActive'
                                                    : 'border-neutral-gray-3 text-textOnWhitePrimary'
                                                    }`}
                                            >
                                                <span className="Tabs_labelButton">{category.name}</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-fadein">
                        <div className="Slider_sliderWrapper mb:-mx-4" id="sim-fpt-items-container">
                            <div className="swiper !overflow-hidden px-4 pc:px-0" ref={itemSwiperElRef}>
                                <div className="swiper-wrapper !flex !flex-row">
                                    {activeCategory?.items.map((item, index) => (
                                        <div key={index} className="swiper-slide Slider_slideItem4 h-auto SimCard_customSlider" role="group">
                                            <SimItem item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="Slider_carouselArrow">
                                <button
                                    className="CarouselArrow_prevArrowDefault CarouselArrow_prevArrowWhite CarouselArrow_prevArrowLarge"
                                    aria-label="Previous slide"
                                    style={{ left: '-20px', top: '50%' }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.7071 19.7071C16.0976 19.3166 16.0976 18.6834 15.7071 18.2929L9.41421 12L15.7071 5.70711C16.0976 5.31658 16.0976 4.68342 15.7071 4.29289C15.3166 3.90237 14.6834 3.90237 14.2929 4.29289L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L14.2929 19.7071C14.6834 20.0976 15.3166 20.0976 15.7071 19.7071Z" fill="#090D14" />
                                    </svg>
                                </button>
                                <button
                                    className="CarouselArrow_nextArrowDefault CarouselArrow_nextArrowWhite CarouselArrow_nextArrowLarge"
                                    aria-label="Next slide"
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

export default SimSlider;