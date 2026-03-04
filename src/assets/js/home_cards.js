document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/home_cards.json')
        .then(response => response.json())
        .then(data => {
            const homeCardsData = data.home_cards;
            if (!homeCardsData) return;

            // Render Home Cards
            const cardsSection = homeCardsData.find(section => section.cards);
            if (cardsSection) {
                const container = document.getElementById('home-cards-container');
                if (container) {
                    cardsSection.cards.forEach(card => {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide h-auto';
                        slide.role = 'group';
                        slide.innerHTML = `
                            <a href="${card.link}">
                                <div class="BgFrameResponsive_frameWrapper">
                                    <div class="BgFrameResponsive_frame"></div>
                                    <img alt="${card.alt}" loading="lazy" decoding="async" data-nimg="1"
                                        class="rounded-2xl mb:rounded-[10px]" style="color:transparent"
                                        srcset="${card.img_srcset}" src="${card.img_src}">
                                </div>
                            </a>
                        `;
                        container.appendChild(slide);
                    });

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
            }

            // Middle Home Cards
            const middleCardsSection = homeCardsData.find(section => section.middle_cards);
            if (middleCardsSection) {
                const container = document.getElementById('home-cards-middle-container');
                if (container) {
                    middleCardsSection.middle_cards.forEach(item => {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide Slider_slideItem3 h-auto';
                        slide.innerHTML = `
                            <a href="${item.link}">
                                <div class="BgFrameResponsive_frameWrapper">
                                    <div class="BgFrameResponsive_frame"></div>
                                    <img alt="${item.alt}" loading="lazy" decoding="async" data-nimg="1" 
                                         class="rounded-2xl mb:rounded-[10px]" style="color:transparent"
                                         srcset="${item.img_srcset}" src="${item.img_src}">
                                </div>
                            </a>
                        `;
                        container.appendChild(slide);
                    });

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
            }

            // Render Payment Offers
            const paymentSection = homeCardsData.find(section => section.payment_offers);
            if (paymentSection) {
                const container = document.getElementById('home-cards-saleoff-container');
                if (container) {
                    paymentSection.payment_offers.forEach(item => {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide Slider_slideItem3 h-auto';
                        slide.innerHTML = `
                            <a href="${item.link}">
                                <div class="BgFrameResponsive_frameWrapper">
                                    <div class="BgFrameResponsive_frame"></div>
                                    <img alt="${item.alt}" loading="lazy" decoding="async" data-nimg="1" 
                                         class="rounded-2xl mb:rounded-[10px]" style="color:transparent"
                                         srcset="${item.img_srcset}" src="${item.img_src}">
                                </div>
                            </a>
                        `;
                        container.appendChild(slide);
                    });

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
            }
        })
        .catch(error => console.error('Error loading home cards:', error));
});
