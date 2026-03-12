import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useCart } from '../../hooks/useCart';

const BADGE_ICONS = {
    '100 ngày 1 đổi 1': 'https://cdn2.fptshop.com.vn/svg/100_ngay_61a3a05403.svg',
    'Độc quyền': 'https://cdn2.fptshop.com.vn/svg/Loai_Doc_quyen_Mau_do_No_c3b0a3b6f4.svg',
    'Độc quyền ': 'https://cdn2.fptshop.com.vn/svg/Loai_Doc_quyen_Mau_do_No_c3b0a3b6f4.svg',
    'Sắp cháy hàng': 'https://cdn2.fptshop.com.vn/svg/sap_chay_hang_796541334c.svg',
    '1 năm 1 đổi 1': 'https://cdn2.fptshop.com.vn/svg/1_nam_337933d850.svg',
};

const KEY_SPEC_ICONS = [
    'https://cdn2.fptshop.com.vn/svg/ic_wattage_fc49a41203.svg',
    'https://cdn2.fptshop.com.vn/svg/ic_mill_number_df062f449e.svg',
    'https://cdn2.fptshop.com.vn/svg/ic_control_8760c792ed.svg',
];

const ProductCard = ({ product }) => {
    const badges = (product.badges || []).filter(b => BADGE_ICONS[b]);
    const keySpecs = product.key_specs || [];
    const { addToCart } = useCart();

    return (
        <div className="swiper-slide Slider_slideItem5 h-auto ProductTrend_customSlider">
            <div className="group relative flex h-full flex-col justify-between ProductCard_brandCard ProductCard_cardDefault">
                <div className="relative z-10 flex flex-1 flex-col">
                    <div className="relative flex items-center justify-between px-2">
                        <a title={product.name} className="flex-1 mb:flex mb:min-w-0" href={product.url}>
                            <div className="relative mb-2 flex h-[161px] items-center justify-center pc:h-[210px] mb:aspect-square mb:w-full mb:max-w-[120px]">
                                <img
                                    src={product.image?.srcset_1x}
                                    loading="lazy"
                                    width="144"
                                    height="149"
                                    alt={product.name}
                                    className="transition duration-300 group-hover:scale-105 h-[120px] w-[120px] mb:h-full mb:w-full mb:object-contain"
                                />
                            </div>
                        </a>
                        {keySpecs.length > 0 && (
                            <div className="flex flex-shrink-0 flex-col items-center justify-center gap-1.5">
                                {keySpecs.map((spec, i) => (
                                    <div key={i} className="flex w-[62px] flex-col items-center justify-center gap-1 px-1">
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-bgGrayDefault">
                                            <img
                                                alt={spec}
                                                loading="lazy"
                                                width="16"
                                                height="16"
                                                src={KEY_SPEC_ICONS[i] || KEY_SPEC_ICONS[0]}
                                            />
                                        </div>
                                        <div className="ProductCard_keySellingPoint">
                                            <p>{spec}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                        {badges.length > 0 && (
                            <div className="absolute flex items-center gap-1.5 bottom-1 left-2 mb:bottom-1.5">
                                {badges.map((badge, i) => (
                                    <img
                                        key={i}
                                        alt={badge}
                                        loading="lazy"
                                        width="46"
                                        height="46"
                                        className="mb:h-[36px] mb:w-[36px]"
                                        src={BADGE_ICONS[badge]}
                                    />
                                ))}
                            </div>
                        )}
                    </div>


                    <div className="ProductCard_cardInfo cardInfo">
                        <div className="flex min-h-[66px] flex-col justify-center text-left">
                            <p>
                                {product.original_price && (
                                    <span className="text-textOnWhiteSecondary line-through f1-regular">
                                        {product.original_price}
                                    </span>
                                )}
                                {product.discount && (
                                    <span className="ml-1 text-textOnWhiteBrand f1-semibold">
                                        {product.discount}%
                                    </span>
                                )}
                            </p>
                            <p className="text-textOnWhitePrimary transition-all duration-300 b1-semibold">
                                {product.sale_price}
                            </p>
                            {product.saving && (
                                <p className="text-textOnSemanticGreenDefault f1-regular">{product.saving}</p>
                            )}
                        </div>
                        <h3 className="ProductCard_cardTitle">
                            <a title={product.name} href={product.url}>{product.name}</a>
                        </h3>
                    </div>


                    <div className="mt-auto px-3 pb-3 pt-2">
                        <button
                            className="flex w-full items-center justify-center gap-2 rounded-3xl border border-bgSpecialRedDefault px-4 py-2 text-bgSpecialRedDefault transition-all duration-300 ease-out f1-semibold hover:bg-bgSpecialRedDefault active:scale-95"
                            onClick={() => addToCart(product.id)}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="M2.5 4.25C2.5 3.83579 2.83579 3.5 3.25 3.5H3.80826C4.75873 3.5 5.32782 4.13899 5.65325 4.73299C5.87016 5.12894 6.02708 5.58818 6.14982 6.00395C6.18306 6.00134 6.21674 6 6.2508 6H18.7481C19.5783 6 20.1778 6.79442 19.9502 7.5928L18.1224 14.0019C17.7856 15.1832 16.7062 15.9978 15.4779 15.9978H9.52977C8.29128 15.9978 7.2056 15.1699 6.87783 13.9756L6.11734 11.2045L4.85874 6.95578L4.8567 6.94834C4.701 6.38051 4.55487 5.85005 4.33773 5.4537C4.12686 5.0688 3.95877 5 3.80826 5H3.25C2.83579 5 2.5 4.66421 2.5 4.25ZM9 21C10.1046 21 11 20.1046 11 19C11 17.8954 10.1046 17 9 17C7.89543 17 7 17.8954 7 19C7 20.1046 7.89543 21 9 21ZM16 21C17.1046 21 18 20.1046 18 19C18 17.8954 17.1046 17 16 17C14.8954 17 14 17.8954 14 19C14 20.1046 14.8954 21 16 21Z" />
                            </svg>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductSlider = ({ data }) => {
    const wrapperRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (!wrapperRef.current || !data?.products?.length) return;

        const swiperEl = wrapperRef.current.querySelector('.swiper');
        const nextBtn = wrapperRef.current.querySelector('.CarouselArrow_nextArrowDefault');
        const prevBtn = wrapperRef.current.querySelector('.CarouselArrow_prevArrowDefault');

        swiperRef.current = new Swiper(swiperEl, {
            modules: [Navigation],
            slidesPerView: 2,
            spaceBetween: 16,
            navigation: { nextEl: nextBtn, prevEl: prevBtn },
            breakpoints: {
                768: { slidesPerView: 4, spaceBetween: 20 },
                1200: { slidesPerView: 5, spaceBetween: 20 },
            },
        });

        return () => {
            swiperRef.current?.destroy(true, true);
            swiperRef.current = null;
        };
    }, [data]);

    if (!data?.products?.length) return null;

    return (
        <div className="container py-3 md:py-2.5">
            <div className="relative rounded-2xl sm:w-full md:bg-white md:p-5 md:pb-2 product-dynamic-container" ref={wrapperRef}>

                <div className="item-center relative mb-3 flex justify-between md:mb-4">
                    <h2 className="h4-semibold">{data.title}</h2>
                </div>

                <div className="relative">
                    <div className="Slider_sliderWrapper mb:-mx-4">
                        <div className="swiper px-4 pc:px-0">
                            <div className="swiper-wrapper">
                                {data.products.map((product, index) => (
                                    <ProductCard key={product.id ?? index} product={product} />
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
    );
};

export default ProductSlider;