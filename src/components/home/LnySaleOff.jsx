import { useState, useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const CategoryCard = ({ category }) => {
    return (
        <div className="flex h-full w-full flex-col justify-center p-3 pc:max-h-[454px] pc:max-w-[298px] pc:p-4" style={{ backgroundColor: '#FFFFFF' }}>
            <p className="mb-3 text-textOnWhitePrimary h6-semibold">{category.name}</p>
            <div className="grid flex-1 grid-cols-2 gap-y-3">
                {category.items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center p-1 pc:p-2">
                        <a className="relative block w-full" href={item.link}>
                            <img
                                alt={item.name}
                                loading="lazy"
                                width="115"
                                height="115"
                                decoding="async"
                                className="aspect-square rounded-2 object-cover"
                                style={{ color: 'transparent' }}
                                srcSet={item.img_srcset}
                                src={item.img_src}
                            />
                        </a>
                        <a
                            className="relative mb-1.5 mt-2 line-clamp-2 min-h-9 px-1 text-center text-textOnWhitePrimary f1-regular pc:min-h-10 pc:px-2 pc:b2-medium"
                            href={item.link}
                        >
                            {item.name}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};


const LnySaleOff = ({ items = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperElRef = useRef(null);
    const swiperRef = useRef(null);

    const entry = items[currentIndex];

    const handleRefresh = () => {
        setCurrentIndex(prev => (prev + 1) % items.length);
    };

    useEffect(() => {
        if (!swiperElRef.current || !entry?.categories?.length) return;

        if (swiperRef.current) {
            swiperRef.current.update();
            swiperRef.current.slideTo(0);
        } else {
            swiperRef.current = new Swiper(swiperElRef.current, {
                modules: [Navigation],
                slidesPerView: 1,
                spaceBetween: 12,
                navigation: {
                    nextEl: swiperElRef.current.parentElement.querySelector('.CarouselArrow_nextArrowDefault'),
                    prevEl: swiperElRef.current.parentElement.querySelector('.CarouselArrow_prevArrowDefault'),
                },
                breakpoints: {
                    376: { slidesPerView: 2, spaceBetween: 12 },
                    769: { slidesPerView: 3, spaceBetween: 12 },
                },
            });
        }

        return () => {
            swiperRef.current?.destroy(true, true);
            swiperRef.current = null;
        };
    }, [entry]);

    if (!items.length || !entry) return null;

    return (
        <div className="container py-3">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="flex text-textOnWhitePrimary h4-semibold">
                    Tết rộn ràng, sale trọn cả tháng
                </h2>
                <span className="flex cursor-pointer items-center" onClick={handleRefresh}>
                    <span className="text-textOnWhiteHyperLink f1-medium pc:b1-medium">Xem gợi ý khác</span>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="var(--textOnWhiteHyperLink)" xmlns="http://www.w3.org/2000/svg" className="size-4 pc:size-5">
                        <path d="M4.96967 0.46967C5.26256 0.176777 5.73744 0.176777 6.03033 0.46967L7.78033 2.21967C8.07322 2.51256 8.07322 2.98744 7.78033 3.28033L6.03033 5.03033C5.73744 5.32322 5.26256 5.32322 4.96967 5.03033C4.67678 4.73744 4.67678 4.26256 4.96967 3.96967L5.39964 3.5397C3.1982 3.83319 1.5 5.71828 1.5 8C1.5 9.38926 2.12865 10.631 3.11975 11.4576C3.43784 11.723 3.48063 12.1959 3.21532 12.514C2.95001 12.8321 2.47707 12.8749 2.15897 12.6096C0.840818 11.5101 0 9.85292 0 8C0 4.86726 2.40089 2.29528 5.46304 2.0237L4.96967 1.53033C4.67678 1.23744 4.67678 0.762563 4.96967 0.46967ZM8.78468 3.48601C9.04999 3.16791 9.52293 3.12512 9.84103 3.39044C11.1592 4.48986 12 6.14708 12 8C12 11.1327 9.59911 13.7047 6.53696 13.9763L7.03033 14.4697C7.32322 14.7626 7.32322 15.2374 7.03033 15.5303C6.73744 15.8232 6.26256 15.8232 5.96967 15.5303L4.21967 13.7803C4.07902 13.6397 4 13.4489 4 13.25C4 13.0511 4.07902 12.8603 4.21967 12.7197L5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697C7.32322 11.2626 7.32322 11.7374 7.03033 12.0303L6.60036 12.4603C8.8018 12.1668 10.5 10.2817 10.5 8C10.5 6.61074 9.87135 5.36899 8.88025 4.54235C8.56216 4.27704 8.51937 3.8041 8.78468 3.48601Z" fill="inherit" />
                    </svg>
                </span>
            </div>


            <div className="mb:flex mb:flex-wrap pc:grid pc:grid-cols-[400px_840px]">

                <div className="overflow-hidden mb:order-2 mb:w-full">
                    <div className="Slider_sliderWrapper mx-0">
                        <a className="LnySaleOff_bannerLink hidden pc:block mb:block" href={entry.link}>
                            <div className="flex flex-col items-center overflow-hidden rounded-2 pc:h-[454px] pc:rounded-2xl">
                                <img
                                    alt={entry.alt}
                                    loading="lazy"
                                    width="400"
                                    height="454"
                                    decoding="async"
                                    className="LnySaleOff_bannerImgPc hidden h-full w-full cursor-pointer object-cover pc:block"
                                    style={{ color: 'transparent' }}
                                    srcSet={entry.img_pc_srcset}
                                    src={entry.img_pc_src}
                                />
                                <img
                                    alt={entry.alt}
                                    loading="lazy"
                                    width="686"
                                    height="892"
                                    decoding="async"
                                    className="LnySaleOff_bannerImgMb hidden h-auto w-full cursor-pointer object-cover mb:block"
                                    style={{ color: 'transparent' }}
                                    srcSet={entry.img_mb_srcset}
                                    src={entry.img_mb_src}
                                />
                            </div>
                        </a>
                    </div>
                </div>

                <div className="relative mb:order-1 mb:mb-3 mb:w-full mb:overflow-hidden pc:pl-3">
                    <div className="swiper-wrapper mb:-mx-4 mx-0">
                        <div className="swiper !overflow-hidden px-4 pc:px-0" ref={swiperElRef}>
                            <div className="swiper-wrapper !flex !flex-row" id="lny-sale-off-categories-container">
                                {entry.categories.map((cat, index) => (
                                    <div
                                        key={index}
                                        className="swiper-slide Slider_slideItem3 h-auto FeatureCollection_customSlider FeatureCollection_sliderDefault overflow-hidden rounded-2 object-cover pc:rounded-2xl !h-auto px-0"
                                        role="group"
                                        aria-label={`${index + 1} / ${entry.categories.length}`}
                                    >
                                        <CategoryCard category={cat} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="Slider_carouselArrow">
                            <button
                                className="CarouselArrow_prevArrowDefault CarouselArrow_prevArrowWhite CarouselArrow_prevArrowLarge"
                                aria-label="Previous slide"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.7071 4.29289C15.3166 3.90237 14.6834 3.90237 14.2929 4.29289L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L14.2929 19.7071C14.6834 20.0976 15.3166 20.0976 15.7071 19.7071C16.0976 19.3166 16.0976 18.6834 15.7071 18.2929L9.41421 12L15.7071 5.70711C16.0976 5.31658 16.0976 4.68342 15.7071 4.29289Z" fill="#090D14" />
                                </svg>
                            </button>
                            <button
                                className="CarouselArrow_nextArrowDefault CarouselArrow_nextArrowWhite CarouselArrow_nextArrowLarge"
                                aria-label="Next slide"
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
    );
};

export default LnySaleOff;