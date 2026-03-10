import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

const UtilitiesServiceItem = ({ item }) => {
    return (
        <a
            className="flex h-full flex-col items-center p-2 f1-medium pc:justify-center pc:gap-1 pc:gap-3 pc:px-4 pc:py-3 pc:b1-medium"
            href={item.link}
        >
            <img
                alt={item.name}
                loading="lazy"
                width="52"
                height="52"
                decoding="async"
                data-nimg="1"
                className="h-8 w-8 duration-300 hover:scale-105 pc:h-[52px] pc:w-[52px]"
                style={{ color: 'transparent' }}
                src={item.icon}
            />
            <p className="text-center text-textOnWhitePrimary f1-medium pc:b1-medium">{item.name}</p>
        </a>
    );
};


const UtilitiesServices = ({ items = [] }) => {
    const swiperRef = useRef(null);
    const swiperElRef = useRef(null);

    useEffect(() => {
        if (!swiperElRef.current || !items.length) return;

        swiperRef.current = new Swiper(swiperElRef.current, {
            slidesPerView: 3,
            spaceBetween: 10,
            breakpoints: {
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 0,
                },
            },
        });

        return () => {
            swiperRef.current?.destroy(true, true);
        };
    }, [items]);

    if (!items.length) return null;

    return (
        <div className="pc:container pc:px-5 pc:py-2.5">
            <div className="pc:rounded-2xl overflow-hidden" style={{ backgroundColor: 'white' }}>
                <div
                    id="utilities-services-container"
                    className="UtilitiesService_customSlider_wrapper swiper !overflow-hidden"
                    ref={swiperElRef}
                >
                    <div className="swiper-wrapper !flex !flex-row">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="swiper-slide Slider_slideItem6 h-auto UtilitiesService_customSlider"
                                role="group"
                            >
                                <UtilitiesServiceItem item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UtilitiesServices;