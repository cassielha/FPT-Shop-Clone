document.addEventListener('DOMContentLoaded', () => {
  let goldenHoursData = [];
  let swiperInstance = null;
  let countdownInterval = null;

  const goldenHourWrapper = document.getElementById('gvgs');
  if (!goldenHourWrapper) return;

  // Inject initial structure
  const sessionContainer = goldenHourWrapper.querySelector('div[style*="background: rgb(187, 4, 22)"]');
  if (sessionContainer) {
    sessionContainer.innerHTML = `
      <div class="FeatureGoldenHour_goldenHourDate">
          <ul class="FeatureGoldenHour_listDate"></ul>
      </div>
      <div class="relative min-h-[347px] rounded-bl-xl rounded-br-xl bg-bgWhiteDefault pc:min-h-[425px]">
        <div class="">
            <div class="swiper">
                <div class="swiper-wrapper"></div>
            </div>
            <div class="Slider_carouselArrow">
                <button class="CarouselArrow_prevArrowDefault CarouselArrow_prevArrowWhite CarouselArrow_prevArrowLarge" aria-label="Previous slide" style="left: -20px; top: 50%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none">
                        <path d="M12.2676 15.793C11.9677 16.0787 11.493 16.0672 11.2073 15.7672L6.20597 10.5168C5.93004 10.2271 5.93004 9.77187 6.20597 9.4822L11.2073 4.23173C11.493 3.93181 11.9677 3.92028 12.2676 4.20597C12.5676 4.49166 12.5791 4.96639 12.2934 5.26631L7.78483 9.99949L12.2934 14.7327C12.5791 15.0326 12.5676 15.5073 12.2676 15.793Z" fill="#090D14"></path>
                    </svg>
                </button>
                <button class="CarouselArrow_nextArrowDefault CarouselArrow_nextArrowWhite CarouselArrow_nextArrowLarge" aria-label="Next slide" style="right: -20px; top: 50%;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.29289 4.29289C7.90237 4.68342 7.90237 5.31658 8.29289 5.70711L14.5858 12L8.29289 18.2929C7.90237 18.6834 7.90237 19.3166 8.29289 19.7071C8.68342 20.0976 9.31658 20.0976 9.70711 19.7071L16.7071 12.7071C17.0976 12.3166 17.0976 11.6834 16.7071 11.2929L9.70711 4.29289C9.31658 3.90237 8.68342 3.90237 8.29289 4.29289Z" fill="#090D14"></path>
                    </svg>
                </button>
            </div>
        </div>
      </div>
    `;
  }

  const toDateLabel = (isoString) => {
    const d = new Date(isoString);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}`;
  };

  /** Determine session status relative to now */
  const getSessionStatus = (session) => {
    const now = Date.now();
    const start = new Date(session.start_time).getTime();
    const end = new Date(session.end_time).getTime();
    if (now >= start && now < end) return 'active';
    if (now < start) return 'upcoming';
    return 'ended';
  };

  const pad = (n) => String(n).padStart(2, '0');

  const boltSVG = `
    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg" style="scale:0.8;">
      <path d="M16.8332 6.59109C16.7524 6.41848 16.624 6.27249 16.4632 6.17024C16.3023 6.06798 16.1157 6.01371 15.9251 6.01377H11.533L13.8143 1.45032C13.8906 1.29755 13.9266 1.12781 13.919 0.957198C13.9113 0.786589 13.8601 0.620772 13.7704 0.475483C13.6806 0.330194 13.5552 0.210251 13.4061 0.127035C13.2569 0.0438192 13.089 9.1179e-05 12.9182 8.50536e-10H6.90444C6.72575 -7.35914e-06 6.55032 0.0477518 6.3963 0.138332C6.24228 0.228912 6.11527 0.359019 6.02843 0.51518L1.01696 9.53584C0.932111 9.68841 0.888589 9.8605 0.890698 10.0351C0.892807 10.2096 0.940473 10.3806 1.02898 10.5311C1.11748 10.6816 1.24376 10.8063 1.3953 10.893C1.54684 10.9797 1.71839 11.0253 1.89296 11.0252H6.65687L4.9239 18.8261C4.87537 19.0454 4.90188 19.2746 4.99918 19.477C5.09648 19.6794 5.25892 19.8432 5.46047 19.9423C5.66202 20.0413 5.89099 20.0698 6.11066 20.0232C6.33033 19.9765 6.52798 19.8575 6.6719 19.6851L16.6949 7.65754C16.8168 7.51128 16.8946 7.3333 16.9191 7.14443C16.9436 6.95557 16.9138 6.76363 16.8332 6.59109Z"
            fill="url(#bolt_grad)"/>
      <defs>
        <linearGradient id="bolt_grad" x1="2.93836" y1="3.55113" x2="12.8751" y2="13.4879" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFDD00"/>
          <stop offset="1" stop-color="#FEB100"/>
        </linearGradient>
      </defs>
    </svg>`;

  const quotaBadge = (slots) => `
    <div class="flex px-3">
      <div class="pc:min-w[109px] h-4.5 relative mb:h-[14px] mb:w-auto mb:min-w-18"
           style="position:relative;padding:3px 17px;
                  background:linear-gradient(274.42deg,#F2030C 17.37%,#A80000 98.19%,#91050A 137.04%),
                              linear-gradient(40.78deg,#EE400D 57.41%,#FFDB8E 116.59%),
                              linear-gradient(90deg,rgba(255,255,255,.2) 0%,rgba(255,255,255,0) 85.84%),
                              #DC2626;
                  border-radius:4px;display:flex;align-items:center;justify-content:center;margin-left:-10px">
        <span class="font-medium text-white f2-semibold mb:text-[8px]">Còn ${slots} suất</span>
        <span class="absolute -left-[7px] z-50 flex items-center justify-center">${boltSVG}</span>
      </div>
    </div>`;

  const buildProductCard = (product) => {
    const { name, price, original_price, discount, slots, image, url } = product;

    return `
      <div class="swiper-slide slider-item-5 h-auto py-1 mb:mr-2.5 mb:w-[55%]">
        <div class="group relative rounded-[10px] hover:shadow pc:max-w-[226px]">

          <!-- Image -->
          <div class="relative mb-3 h-[165px] pc:mb-4 pc:h-[204px]">
            <div class="relative flex items-center justify-between px-2">
              <a title="${name}" class="flex-1" href="${url}">
                <div class="flex items-center justify-center bg-[length:100%_auto] bg-top bg-no-repeat pc:absolute pc:left-3 pc:top-0">
                  <div class="mt-6">
                    <img alt="${name}" loading="lazy" width="140" height="140" decoding="async"
                         class="transition duration-300 group-hover:scale-105 mb:h-[100px] mb:w-[100px]"
                         src="${image}" style="color:transparent">
                  </div>
                </div>
              </a>
            </div>
            <div class="top-absolute absolute bottom-0 left-0 right-0 z-10 mb:pl-3 pc:pl-4">
              ${quotaBadge(slots)}
            </div>
          </div>
          <div class="px-3 mb:px-2">
            <div class="mb-2 flex justify-center">
              <div class="relative aspect-[3.863/1] w-full md:h-[50px] md:w-[209px] mb:h-[42px]">
                <img alt="Price background" loading="lazy" decoding="async"
                     class="z-0 rounded-[6px] object-cover"
                     style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                     src="https://cdn2.fptshop.com.vn/unsafe/768x0/filters:format(webp):quality(75)/estore-v2/img/Price-GVGS.png">
                <div class="absolute inset-0 z-10 flex w-full items-center justify-between pl-3 pr-[7px]">
                  <div class="flex h-full w-full items-center justify-between">
                    <div class="flex flex-col">
                      <div class="text-textOnSpecialPrimary l7-14-semibold">${price}</div>
                      <div class="font-inter text-textOnSpecialSecondary line-through f1-regular">${original_price}</div>
                    </div>
                    <div>
                      <span class="flex h-[18px] items-center text-textOnSemanticRedDefault mb:f1-semibold pc:b1-semibold">
                        -${discount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-2 line-clamp-2 w-full mb:h-10">
              <p class="text-left text-textOnWhitePrimary b2-regular mb:h-9 pc:h-10"
                 style="word-break:break-word">${name}</p>
            </div>

            <div class="flex justify-center pb-3 pc:pb-4">
              <a class="flex-1" href="${url}">
                <button class="flex items-center justify-center text-base text-white transition-all duration-300 ease-out relative rounded-3xl px-4 font-medium bg-bgSpecialRedDefault hover:bg-bgSpecialRedHover w-full py-1.5 b1-medium pc:mb-[3px] pc:px-[13.5px] pc:py-2.5 pc:h-[48.1px] mb:h-7 mb:f1-medium">
                  Mua giá sốc
                </button>
              </a>
            </div>

          </div>
        </div>
      </div>`;
  };

  const renderDateTabs = (sessions, activeIdx) => {
    const listDate = goldenHourWrapper.querySelector('.FeatureGoldenHour_listDate');
    if (!listDate) return;

    listDate.innerHTML = sessions.map((session, idx) => {
      const status = getSessionStatus(session);
      const isActive = idx === activeIdx;
      const dateLabel = toDateLabel(session.start_time);

      const statusText = status === 'active' ? `Đang diễn ra ${dateLabel}`
        : status === 'ended' ? 'Đã kết thúc'
          : 'Sắp diễn ra';

      return `
        <li class="px-1${isActive ? ' FeatureGoldenHour_active mb:w-[219px] pc:w-[304px]' : ''}"
            data-session-index="${idx}" style="cursor:pointer">
          <div class="FeatureGoldenHour pc:px-[42px]">${isActive ? `Đang diễn ra ${dateLabel}` : dateLabel}</div>
          ${isActive
          ? `<p>Kết thúc trong: <span id="gvgs-countdown" class="inline-block min-w-[108px] pl-1 pr-1 b1-semibold" style="color:rgb(255,255,255);"></span></p>`
          : `<p class="whitespace-nowrap">${statusText}</p>`
        }
        </li>`;
    }).join('');

    // Tab click
    listDate.querySelectorAll('li').forEach((li) => {
      li.addEventListener('click', () => {
        const idx = parseInt(li.dataset.sessionIndex, 10);

        // Update active styles
        listDate.querySelectorAll('li').forEach(el => {
          el.classList.remove('FeatureGoldenHour_active', 'mb:w-[219px]', 'pc:w-[304px]');
        });
        li.classList.add('FeatureGoldenHour_active', 'mb:w-[219px]', 'pc:w-[304px]');

        renderProducts(goldenHoursData[idx]?.products || []);
        startCountdown(goldenHoursData[idx]);
      });
    });
  };

  const renderProducts = (products) => {
    const swiperWrapper = goldenHourWrapper.querySelector('.swiper-wrapper');
    if (!swiperWrapper) return;

    if (!products.length) {
      swiperWrapper.innerHTML = `
        <div class="py-10 text-center text-gray-400 w-full col-span-full">
          Chưa có sản phẩm cho khung giờ này.
        </div>`;
      if (swiperInstance) { swiperInstance.destroy(true, true); swiperInstance = null; }
      return;
    }

    swiperWrapper.innerHTML = products.map(buildProductCard).join('');
    initProductSwiper();
  };

  const startCountdown = (session) => {
    if (countdownInterval) clearInterval(countdownInterval);
    if (!session?.end_time) return;

    const endMs = new Date(session.end_time).getTime();

    const num = (v) => `<span class="number" style="display:inline-block;min-width:32px;border-radius:4px;padding:2px 0;text-align:center;background-color:rgb(239,68,68);font-weight:600">${pad(v)}</span>`;
    const col = `<span class="colon" style="padding:0 4px;color:rgb(9,13,20)">:</span>`;

    const tick = () => {
      const el = document.getElementById('gvgs-countdown');
      if (!el) return;

      const remaining = endMs - Date.now();
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        el.innerHTML = num(0) + col + num(0) + col + num(0);
        return;
      }

      const h = Math.floor(remaining / 3_600_000);
      const m = Math.floor((remaining % 3_600_000) / 60_000);
      const s = Math.floor((remaining % 60_000) / 1_000);
      el.innerHTML = num(h) + col + num(m) + col + num(s);
    };

    tick();
    countdownInterval = setInterval(tick, 1000);
  };


  const initProductSwiper = () => {
    if (swiperInstance) { swiperInstance.destroy(true, true); swiperInstance = null; }

    const swiperEl = goldenHourWrapper.querySelector('.swiper');
    if (!swiperEl) return;

    swiperInstance = new Swiper(swiperEl, {
      slidesPerView: 2,
      spaceBetween: 8,
      navigation: {
        nextEl: goldenHourWrapper.querySelector('.CarouselArrow_nextArrowDefault') || null,
        prevEl: goldenHourWrapper.querySelector('.CarouselArrow_prevArrowDefault') || null,
      },
      breakpoints: {
        1024: { slidesPerView: 5, spaceBetween: 16 },
      },
    });
  };

  fetch('../models/golden_hours.json')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      goldenHoursData = data.golden_hours ?? (Array.isArray(data) ? data : []);
      if (!goldenHoursData.length) return;

      const activeIdx = (() => {
        const i = goldenHoursData.findIndex(s => getSessionStatus(s) === 'active');
        return i >= 0 ? i : 0;
      })();

      renderDateTabs(goldenHoursData, activeIdx);
      renderProducts(goldenHoursData[activeIdx]?.products || []);
      startCountdown(goldenHoursData[activeIdx]);
    })
    .catch((err) => {
      console.error('[GoldenHours] Failed to load data:', err);
    });
});