document.addEventListener('DOMContentLoaded', () => {
    const productContainers = document.querySelectorAll('.product-dynamic-container');

    if (productContainers.length === 0) return;

    fetch('../models/products.json')
        .then(response => response.json())
        .then(data => {
            renderProducts(data.categories, productContainers);
        })
        .catch(error => console.error('Error loading products:', error));
});

function renderProducts(categories, containers) {
    categories.forEach((category, index) => {
        if (index < containers.length) {
            const container = containers[index];
            container.innerHTML = createCategoryHtml(category);

            new Swiper(container.querySelector('.swiper'), {
                slidesPerView: 2,
                spaceBetween: 16,
                navigation: {
                    nextEl: container.querySelector('.CarouselArrow_nextArrowDefault'),
                    prevEl: container.querySelector('.CarouselArrow_prevArrowDefault'),
                },
                breakpoints: {
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    }
                }
            });
        }
    });
}

function createCategoryHtml(category) {
    const productsHtml = category.products.map(product => createProductCardHtml(product)).join('');

    return `
        <div class="item-center relative mb-3 flex justify-between md:mb-4">
            <h2 class="h4-semibold">${category.title}</h2>
        </div>
        <div class="relative">
            <div class="Slider_sliderWrapper mb:-mx-4">
                <div class="swiper swiper-horizontal px-4 pc:px-0">
                    <div class="swiper-wrapper">
                        ${productsHtml}
                    </div>
                </div>
                <div class="Slider_carouselArrow">
                    <button class="CarouselArrow_prevArrowDefault CarouselArrow_prevArrowWhite CarouselArrow_prevArrowLarge" style="left: -20px; top: 50%;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none">
                            <path d="M12.2676 15.793C11.9677 16.0787 11.493 16.0672 11.2073 15.7672L6.20597 10.5168C5.93004 10.2271 5.93004 9.77187 6.20597 9.4822L11.2073 4.23173C11.493 3.93181 11.9677 3.92028 12.2676 4.20597C12.5676 4.49166 12.5791 4.96639 12.2934 5.26631L7.78483 9.99949L12.2934 14.7327C12.5791 15.0326 12.5676 15.5073 12.2676 15.793Z" fill="#090D14"></path>
                        </svg>
                    </button>
                    <button class="CarouselArrow_nextArrowDefault CarouselArrow_nextArrowWhite CarouselArrow_nextArrowLarge" style="right: -20px; top: 50%;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.29289 4.29289C7.90237 4.68342 7.90237 5.31658 8.29289 5.70711L14.5858 12L8.29289 18.2929C7.90237 18.6834 7.90237 19.3166 8.29289 19.7071C8.68342 20.0976 9.31658 20.0976 9.70711 19.7071L16.7071 12.7071C17.0976 12.3166 17.0976 11.6834 16.7071 11.2929L9.70711 4.29289C9.31658 3.90237 8.68342 3.90237 8.29289 4.29289Z" fill="#090D14"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createProductCardHtml(product) {
    const badgesHtml = (product.badges || []).map(badge => {
        let iconUrl = '';
        if (badge === '100 ngày 1 đổi 1') iconUrl = 'https://cdn2.fptshop.com.vn/svg/100_ngay_61a3a05403.svg';
        else if (badge === 'Độc quyền' || badge === 'Độc quyền ') iconUrl = 'https://cdn2.fptshop.com.vn/svg/Loai_Doc_quyen_Mau_do_No_c3b0a3b6f4.svg';
        else if (badge === 'Sắp cháy hàng') iconUrl = 'https://cdn2.fptshop.com.vn/svg/sap_chay_hang_796541334c.svg';
        else if (badge === '1 năm 1 đổi 1') iconUrl = 'https://cdn2.fptshop.com.vn/svg/1_nam_337933d850.svg';

        if (!iconUrl) return '';

        return `<img alt="${badge}" loading="lazy" width="46" height="46" class="mb:h-[36px] mb:w-[36px]" src="${iconUrl}">`;
    }).join('');

    const keySpecsHtml = (product.key_specs || []).map((spec, i) => {
        let iconUrl = '';
        if (i === 0) iconUrl = 'https://cdn2.fptshop.com.vn/svg/ic_wattage_fc49a41203.svg';
        else if (i === 1) iconUrl = 'https://cdn2.fptshop.com.vn/svg/ic_mill_number_df062f449e.svg';
        else if (i === 2) iconUrl = 'https://cdn2.fptshop.com.vn/svg/ic_control_8760c792ed.svg';

        return `
            <div class="flex w-[62px] flex-col items-center justify-center gap-1 px-1">
                <div class="flex h-5 w-5 items-center justify-center rounded-full bg-bgGrayDefault">
                    <img alt="${spec}" loading="lazy" width="16" height="16" src="${iconUrl || 'https://cdn2.fptshop.com.vn/svg/ic_wattage_fc49a41203.svg'}">
                </div>
                <div class="ProductCard_keySellingPoint">
                    <p>${spec}</p>
                </div>
            </div>
        `;
    }).join('');

    const discountHtml = product.discount ? `<span class="ml-1 text-textOnWhiteBrand f1-semibold">${product.discount}%</span>` : '';
    const originalPriceHtml = product.original_price ? `<span class="text-textOnWhiteSecondary line-through f1-regular">${product.original_price}</span>` : '';
    const savingHtml = product.saving ? `<p class="text-textOnSemanticGreenDefault f1-regular">${product.saving}</p>` : '';

    return `
        <div class="swiper-slide Slider_slideItem5 h-auto ProductTrend_customSlider">
            <div class="group relative flex h-full flex-col justify-between ProductCard_brandCard ProductCard_cardDefault">
                <div class="relative z-10 flex flex-1 flex-col">
                    <div class="relative flex items-center justify-between px-2">
                        <a title="${product.name}" class="flex-1 mb:flex mb:min-w-0" href="${product.url}">
                            <div class="relative mb-2 flex h-[161px] items-center justify-center pc:h-[210px] mb:aspect-square mb:w-full mb:max-w-[120px]">
                                <img src=${product.image.srcset_1x} loading="lazy" width="144" height="149" class="transition duration-300 group-hover:scale-105 h-[120px] w-[120px] mb:h-full mb:w-full mb:object-contain" src="${product.image || 'https://via.placeholder.com/144x149?text=FPT+Shop'}">
                            </div>
                        </a>
                        <div class="flex flex-shrink-0 flex-col items-center justify-center gap-1.5">
                            ${keySpecsHtml}
                        </div>
                        <div class="absolute flex items-center gap-1.5 bottom-1 left-2 mb:bottom-1.5">
                            ${badgesHtml}
                        </div>
                    </div>
                    <div class="ProductCard_cardInfo cardInfo">
                        <div class="flex min-h-[66px] flex-col justify-center text-left">
                            <p>${originalPriceHtml}${discountHtml}</p>
                            <p class="text-textOnWhitePrimary transition-all duration-300 b1-semibold">${product.sale_price}</p>
                            ${savingHtml}
                        </div>
                        <h3 class="ProductCard_cardTitle">
                            <a title="${product.name}" href="${product.url}">${product.name}</a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    `;
}
