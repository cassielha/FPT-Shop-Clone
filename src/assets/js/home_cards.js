document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/home_cards.json')
        .then(response => response.json())
        .then(data => {
            const homeCardsData = data.home_cards;
            if (!homeCardsData) return;

            function initCarousel(wrapperId, swiperOptions) {
                const wrapper = document.getElementById(wrapperId);
                if (!wrapper) return null;

                const swiperEl = wrapper.querySelector('.swiper');
                const nextBtn = wrapper.querySelector('.CarouselArrow_nextArrowDefault');
                const prevBtn = wrapper.querySelector('.CarouselArrow_prevArrowDefault');

                return new Swiper(swiperEl, {
                    ...swiperOptions,
                    navigation: {
                        nextEl: nextBtn,
                        prevEl: prevBtn,
                    },
                });
            }

            // ── 1. Home Cards (2 slides/view trên desktop) ──────────────────────────
            const cardsSection = homeCardsData.find(section => section.cards);
            if (cardsSection) {
                const wrapper = document.getElementById('home-cards-container');
                if (wrapper) {
                    const container = wrapper.querySelector('.swiper-wrapper');
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

                    initCarousel('home-cards-container', {
                        slidesPerView: 1,
                        spaceBetween: 12,
                        breakpoints: {
                            769: { slidesPerView: 2, spaceBetween: 16 }
                        }
                    });
                }
            }

            // ── 2. Middle Home Cards (3 slides/view trên desktop) ───────────────────
            const middleCardsSection = homeCardsData.find(section => section.middle_cards);
            if (middleCardsSection) {
                const wrapper = document.getElementById('home-cards-middle-container');
                if (wrapper) {
                    const container = wrapper.querySelector('.swiper-wrapper');
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

                    initCarousel('home-cards-middle-container', {
                        slidesPerView: 1,
                        spaceBetween: 12,
                        breakpoints: {
                            769: { slidesPerView: 3, spaceBetween: 15 }
                        }
                    });
                }
            }

            // ── 3. Payment Offers (3 slides/view trên desktop) ──────────────────────
            const paymentSection = homeCardsData.find(section => section.payment_offers);
            if (paymentSection) {
                const wrapper = document.getElementById('home-cards-saleoff-container');
                if (wrapper) {
                    const container = wrapper.querySelector('.swiper-wrapper');
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

                    initCarousel('home-cards-saleoff-container', {
                        slidesPerView: 1,
                        spaceBetween: 12,
                        breakpoints: {
                            769: { slidesPerView: 3, spaceBetween: 15 }
                        }
                    });
                }
            }
        })
        .catch(error => console.error('Error loading home cards:', error));
});