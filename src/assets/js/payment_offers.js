document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/payment_offers.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('home-cards-saleoff-container');
            if (container && data.payment_offers) {
                data.payment_offers.forEach(item => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide Slider_slideItem3 h-auto';

                    slide.innerHTML = `
                        <a href="${item.link}">
                            <div class="BgFrameResponsive_frameWrapper">
                                <div class="BgFrameResponsive_frame"></div>
                                <img alt="${item.alt}" 
                                     loading="lazy" 
                                     width="402" 
                                     height="173" 
                                     decoding="async" 
                                     data-nimg="1" 
                                     class="rounded-2xl mb:rounded-[10px]" 
                                     style="color:transparent"
                                     srcset="${item.img_srcset}"
                                     src="${item.img_src}">
                            </div>
                        </a>
                    `;
                    container.appendChild(slide);
                });

                // Initialize Swiper for Payment Offers
                // Note: We need to find the parent swiper container of #home-cards-saleoff-container
                const swiperContainer = container.closest('.swiper');
                if (swiperContainer) {
                    new Swiper(swiperContainer, {
                        slidesPerView: 1.1,
                        spaceBetween: 12,
                        navigation: {
                            nextEl: swiperContainer.parentElement.querySelector('.CarouselArrow_nextArrowDefault'),
                            prevEl: swiperContainer.parentElement.querySelector('.CarouselArrow_prevArrowDefault'),
                        },
                        breakpoints: {
                            769: {
                                slidesPerView: 3,
                                spaceBetween: 15
                            }
                        }
                    });
                }
            }
        })
        .catch(error => console.error('Error loading payment offers:', error));
});
