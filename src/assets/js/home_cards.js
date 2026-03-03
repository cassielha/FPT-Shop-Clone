document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/home_cards.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('home-cards-container');
            if (container && data.cards) {
                data.cards.forEach(card => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide h-auto';
                    slide.role = 'group';
                    //slide.style.width = '628px';
                    slide.innerHTML = `
                        <a href="${card.link}">
                            <div class="BgFrameResponsive_frameWrapper">
                                <div class="BgFrameResponsive_frame"></div>
                                <img
                                    alt="${card.alt}" 
                                    loading="lazy" 
                                    width="612"
                                    height="211" 
                                    decoding="async" 
                                    data-nimg="1"
                                    class="rounded-2xl mb:rounded-[10px]"
                                    style="color:transparent"
                                    srcset="${card.img_srcset}"
                                    src="${card.img_src}">
                            </div>
                        </a>
                    `;
                    container.appendChild(slide);
                });

                // Initialize Swiper for Payment Offers
                // Note: We need to find the parent swiper container of #home-cards-container
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
                                slidesPerView: 2,
                                spaceBetween: 15
                            }
                        }
                    });
                }
            }
        })
        .catch(error => console.error('Error loading home cards:', error));
});
