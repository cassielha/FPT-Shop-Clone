document.addEventListener('DOMContentLoaded', () => {
  fetch('../models/lny_sale_off.json')
    .then((response) => response.json())
    .then((data) => {
      const items = data.lny_sale_off;
      if (!items || items.length === 0) return;

      let currentIndex = 0;

      const bannerLink = document.querySelector('.LnySaleOff_bannerLink');
      const bannerImgPc = document.querySelector('.LnySaleOff_bannerImgPc');
      const bannerImgMb = document.querySelector('.LnySaleOff_bannerImgMb');
      const categoryWrapper = document.getElementById('lny-sale-off-categories-container');
      const triggerBtn = document.getElementById('lny-sale-off-refresh-btn');

      function buildCategorySlide(category) {
        const itemsHTML = category.items
          .map(
            (item) => `
            <div class="flex flex-col items-center justify-center p-1 pc:p-2">
              <a class="relative block w-full" href="${item.link}">
                <img
                  alt="${item.name}"
                  loading="lazy"
                  width="115" height="115"
                  decoding="async"
                  class="aspect-square rounded-2 object-cover"
                  style="color:transparent"
                  srcset="${item.img_srcset}"
                  src="${item.img_src}"
                >
              </a>
              <a
                class="relative mb-1.5 mt-2 line-clamp-2 min-h-9 px-1 text-center text-textOnWhitePrimary f1-regular pc:min-h-10 pc:px-2 pc:b2-medium"
                href="${item.link}"
              >${item.name}</a>
            </div>`
          )
          .join('');

        return `
          <div class="flex h-full w-full flex-col justify-center p-3 pc:max-h-[454px] pc:max-w-[298px] pc:p-4" style="background-color:#FFFFFF">
            <p class="mb-3 text-textOnWhitePrimary h6-semibold">${category.name}</p>
            <div class="grid flex-1 grid-cols-2 gap-y-3">
              ${itemsHTML}
            </div>
          </div>`;
      }

      function renderEntry(entry) {
        if (bannerLink) bannerLink.href = entry.link;

        if (bannerImgPc) {
          bannerImgPc.srcset = entry.img_pc_srcset;
          bannerImgPc.src = entry.img_pc_src;
          bannerImgPc.alt = entry.alt;
        }

        if (bannerImgMb) {
          bannerImgMb.srcset = entry.img_mb_srcset;
          bannerImgMb.src = entry.img_mb_src;
          bannerImgMb.alt = entry.alt;
        }

        if (!categoryWrapper) return;

        const slideClasses =
          'swiper-slide Slider_slideItem3 h-auto FeatureCollection_customSlider ' +
          'FeatureCollection_sliderDefault overflow-hidden rounded-2 object-cover ' +
          'pc:rounded-2xl !h-auto px-0';

        categoryWrapper.innerHTML = entry.categories
          .map(
            (cat, i) => `
            <div
              class="${slideClasses}"
              role="group"
              aria-label="${i + 1} / ${entry.categories.length}"
              style="width:297.963px; margin-right:12px;"
            >
              ${buildCategorySlide(cat)}
            </div>`
          )
          .join('');

        const swiperContainer = categoryWrapper.closest('.swiper');
        if (swiperContainer) {
          if (swiperContainer.swiper) {
            swiperContainer.swiper.update();
            swiperContainer.swiper.slideTo(0);
          } else {
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
                  spaceBetween: 12
                }
              }
            });
          }
        }
      }

      if (triggerBtn) {
        triggerBtn.addEventListener('click', () => {
          currentIndex = (currentIndex + 1) % items.length;
          renderEntry(items[currentIndex]);
        });
      }

      // Initial render
      renderEntry(items[0]);
    })
    .catch((error) => console.error('Error loading LNY sale off data:', error));
});
