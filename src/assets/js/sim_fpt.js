document.addEventListener('DOMContentLoaded', () => {
    let simData = [];
    let swiperInstance = null;
    let tabSwiperInstance = null;

    const tabsContainer = document.getElementById('sim-fpt-tabs-container');
    const itemsWrapper = document.getElementById('sim-fpt-items-container');

    if (!tabsContainer || !itemsWrapper) return;

    const initSwiper = () => {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
        }

        const swiperEl = itemsWrapper.querySelector('.swiper');
        const nextBtn = itemsWrapper.querySelector('.CarouselArrow_nextArrowDefault');
        const prevBtn = itemsWrapper.querySelector('.CarouselArrow_prevArrowDefault');

        swiperInstance = new Swiper(swiperEl, {
            slidesPerView: 'auto',
            spaceBetween: 8,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                }
            }
        });
    };

    const initTabSwiper = () => {
        if (tabSwiperInstance) {
            tabSwiperInstance.destroy(true, true);
        }
        const tabSwiperElement = tabsContainer.closest('.swiper');
        tabSwiperInstance = new Swiper(tabSwiperElement, {
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
        });
    };

    const renderItems = (categoryId) => {
        const category = simData.find(c => c.id === categoryId);
        if (!category) return;

        // inject vao swiper-wrapper ben trong itemsWrapper
        const container = itemsWrapper.querySelector('.swiper-wrapper');
        container.innerHTML = category.items.map(item => `
            <div class="swiper-slide Slider_slideItem4 h-auto SimCard_customSlider" role="group">
                <a class="flex h-full flex-col rounded-[10px] border border-transparent px-4 pb-4 pt-3 transition-all hover:border-red-red-7"
                    style="background:radial-gradient(506.22% 134.18% at 0% 10.53%, #F3F4F6 0%, #F3F4F6 100%)"
                    href="${item.link}">
                    <div class="mb-4 grid grid-cols-[1fr_56px]">
                        <div>
                            <p class="text-textOnWhitePrimary f1-semibold">FPT</p>
                            <h3 title="${item.name}" class="mt-1.5 line-clamp-1 text-textOnWhitePrimary f1-semibold">
                                ${item.name}
                            </h3>
                            <p class="text-textOnWhiteBrand l6-semibold">${item.price}</p>
                        </div>
                        <div class="flex items-end">
                            <img alt="sim card" loading="lazy" width="56" height="40" decoding="async"
                                srcset="${item.icon} 1x, ${item.icon} 2x"
                                src="${item.icon}">
                        </div>
                    </div>
                    <div class="flex flex-col text-textOnWhitePrimary f1-regular">
                        <span class="mb-2 line-clamp-1">${item.data}</span>
                        <p class="line-clamp-2 whitespace-pre-line">${item.description || ''}</p>
                    </div>
                </a>
            </div>
        `).join('');

        initSwiper();
    };

    const renderTabs = () => {
        tabsContainer.innerHTML = simData.map((category, index) => `
            <div class="swiper-slide w-fit">
                <button id="tab-${category.id}"
                    class="Tabs_button hover:border-red-red-7 min-h-[32px] hover:text-textOnWhiteBrand mr-2 cursor-pointer rounded-[40px] px-2.5 py-1.5 b2-medium border ${index === 0 ? 'border-red-red-7 text-textOnWhiteBrand Tabs_buttonActive' : 'border-neutral-gray-3 text-textOnWhitePrimary'} Tabs_large Tabs_buttonLarge">
                    <span class="Tabs_labelButton">${category.name}</span>
                </button>
            </div>
        `).join('');

        tabsContainer.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = parseInt(button.id.replace('tab-', ''));

                tabsContainer.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('border-red-red-7', 'text-textOnWhiteBrand', 'Tabs_buttonActive');
                    btn.classList.add('border-neutral-gray-3', 'text-textOnWhitePrimary');
                });
                button.classList.add('border-red-red-7', 'text-textOnWhiteBrand', 'Tabs_buttonActive');
                button.classList.remove('border-neutral-gray-3', 'text-textOnWhitePrimary');

                renderItems(categoryId);
            });
        });

        initTabSwiper();
    };

    fetch('../models/sim_fpt.json')
        .then(response => response.json())
        .then(data => {
            simData = data.sim_fpt;
            renderTabs();
            if (simData.length > 0) {
                renderItems(simData[0].id);
            }
        })
        .catch(error => console.error('Error loading Sim FPT data:', error));
});