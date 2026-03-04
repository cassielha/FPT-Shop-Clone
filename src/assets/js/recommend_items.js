document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/recommend_items.json')
        .then(response => response.json())
        .then(data => {
            const wrapper = document.getElementById('recommend-container');
            if (!wrapper || !data.recommend_items) return;


            data.recommend_items.forEach(item => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';

                slide.innerHTML = `
                    <a class="group" href="${item.link}">
                        <div class="flex flex-col items-center text-center pc:pb-5">
                            <img
                                alt="${item.name}"
                                loading="lazy"
                                width="130"
                                height="130"
                                decoding="async"
                                class="size-[58px] rounded-2 transition duration-300 group-hover:scale-105 pc:size-[90px]"
                                style="color:transparent"
                                srcset="${item.img_srcset}"
                                src="${item.img_src}">
                            <p title="${item.name}"
                                class="line-clamp-2 pt-2 text-textOnWhitePrimary f1-medium pc:b1-medium">
                                ${item.name}
                            </p>
                        </div>
                    </a>
                `;
                wrapper.appendChild(slide);
            });

            new Swiper('.recommend-swiper', {
                grid: {
                    rows: 2,
                    fill: 'row',
                },
                slidesPerView: 4,
                spaceBetween: 16,

                breakpoints: {
                    769: {
                        slidesPerView: 8,
                        spaceBetween: 12,
                        grid: { rows: 2, fill: 'row' },
                    },
                },
                navigation: {
                    prevEl: '.CarouselArrow_prevArrowDefault',
                    nextEl: '.CarouselArrow_nextArrowDefault',
                },

                grabCursor: true,
                touchStartPreventDefault: false,
            });
        })
        .catch(error => console.error('Error loading recommend items:', error));
});