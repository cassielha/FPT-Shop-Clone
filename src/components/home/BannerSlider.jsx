import { useState, useEffect, useRef, useCallback } from 'react';

const BannerItem = ({ bannerItem, isActive }) => {
    return (
        <a
            className={`BannerTheme_sliderItem ${isActive ? 'BannerTheme_fadeIn' : ''}`}
            href={bannerItem.link}
            target="_blank"
            rel="dofollow"
            draggable={false}
        >
            <div
                className="bg-[length:100%_auto] bg-[center_top] bg-no-repeat BannerTheme_sliderBg"
                style={{ backgroundColor: `${bannerItem.bg_color} !important` }}
            >
                <img
                    alt="FPT Shop"
                    fetchPriority="high"
                    decoding="async"
                    data-nimg="1"
                    className="w-screen"
                    style={{ color: 'transparent' }}
                    srcSet={bannerItem.bg_img_srcset}
                    src={bannerItem.bg_img_src}
                />
            </div>
            <div className="container relative top-[24px] m-auto flex min-h-[148px] items-center justify-center md:top-[42px] md:min-h-[285px]">
                <img
                    alt="FPT Shop"
                    draggable="false"
                    fetchPriority="high"
                    decoding="async"
                    data-nimg="1"
                    className="hidden md:block"
                    style={{ color: 'transparent' }}
                    srcSet={bannerItem.fg_img_srcset}
                    src={bannerItem.fg_img_src}
                />
            </div>
        </a>
    );
};

const BannerSlider = ({ bannerData = [] }) => {
    const initialIndex = bannerData.findIndex(b => b.active);
    const [currentIndex, setCurrentIndex] = useState(initialIndex !== -1 ? initialIndex : 0);
    const autoNextRef = useRef(null);

    const startAutoNext = useCallback(() => {
        stopAutoNext();
        autoNextRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % bannerData.length);
        }, 5000);
    }, [bannerData.length]);

    const stopAutoNext = () => {
        if (autoNextRef.current) {
            clearInterval(autoNextRef.current);
            autoNextRef.current = null;
        }
    };

    useEffect(() => {
        if (bannerData.length > 1) startAutoNext();
        return () => stopAutoNext();
    }, [bannerData.length, startAutoNext]);

    const handlePrev = () => {
        stopAutoNext();
        setCurrentIndex(prev => (prev - 1 + bannerData.length) % bannerData.length);
        startAutoNext();
    };

    const handleNext = () => {
        stopAutoNext();
        setCurrentIndex(prev => (prev + 1) % bannerData.length);
        startAutoNext();
    };

    const handleDotClick = (index) => {
        stopAutoNext();
        setCurrentIndex(index);
        startAutoNext();
    };

    if (!bannerData.length) return null;

    return (
        <div
            id="banners-container"
            className="BannerTheme_sliderWrap"
            onMouseEnter={stopAutoNext}
            onMouseLeave={startAutoNext}
        >
            {bannerData.map((banner, index) => (
                <BannerItem
                    key={index}
                    bannerItem={banner}
                    isActive={index === currentIndex}
                />
            ))}

            <div className='BannerTheme_sliderControl'>
                <button
                    id="banner-prev-btn"
                    onClick={handlePrev}
                    className="Button_root Button_btnMedium Button_whitePrimary Button_btnIcon"
                    aria-label="Previous banner"
                >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                    </svg>
                </button>
                <button
                    id="banner-next-btn"
                    onClick={handleNext}
                    className="Button_root Button_btnMedium Button_whitePrimary Button_btnIcon"
                    aria-label="Next banner"
                >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>
                </button>
            </div>


            <ul id="banners-nav-dots" className="BannerTheme_navigation">
                {bannerData.map((_, index) => (
                    <li
                        key={index}
                        className={index === currentIndex ? 'BannerTheme_navigationActive' : ''}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default BannerSlider;