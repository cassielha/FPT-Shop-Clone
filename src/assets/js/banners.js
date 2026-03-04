document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/banners.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('banners-container');
            const navDotsContainer = document.getElementById('banners-nav-dots');

            if (container && data.banners) {
                data.banners.forEach((banner, index) => {
                    // Create Banner Item
                    const a = document.createElement('a');
                    a.className = `BannerTheme_sliderItem ${banner.active ? 'BannerTheme_fadeIn' : ''}`;
                    a.href = banner.link;
                    a.target = '_blank';
                    a.rel = 'dofollow';
                    a.draggable = false;
                    a.dataset.index = index;

                    a.innerHTML = `
                        <div class="bg-[length:100%_auto] bg-[center_top] bg-no-repeat BannerTheme_sliderBg"
                            style="background-color:${banner.bg_color} !important">
                            <img alt="FPT Shop" fetchpriority="high" decoding="async" data-nimg="1"
                                class="w-screen" style="color:transparent"
                                srcset="${banner.bg_img_srcset}"
                                src="${banner.bg_img_src}">
                        </div>
                        <div class="container relative top-[24px] m-auto flex min-h-[148px] items-center justify-center md:top-[42px] md:min-h-[285px]">
                            <img alt="FPT Shop" draggable="false" fetchpriority="high" 
                                decoding="async" data-nimg="1" class="hidden md:block" style="color:transparent"
                                srcset="${banner.fg_img_srcset}"
                                src="${banner.fg_img_src}">
                        </div>
                    `;
                    container.appendChild(a);

                    // Create Nav Dot
                    if (navDotsContainer) {
                        const li = document.createElement('li');
                        li.className = banner.active ? 'BannerTheme_navigationActive' : '';
                        navDotsContainer.appendChild(li);
                    }
                });

                // Simple slider logic (placeholder for actual swiper/carousel if needed)
                let currentIndex = data.banners.findIndex(b => b.active);
                if (currentIndex === -1) currentIndex = 0;

                const showBanner = (index) => {
                    const items = container.querySelectorAll('.BannerTheme_sliderItem');
                    const dots = navDotsContainer ? navDotsContainer.querySelectorAll('li') : [];

                    items.forEach((item, i) => {
                        if (i === index) {
                            item.classList.add('BannerTheme_fadeIn');
                        } else {
                            item.classList.remove('BannerTheme_fadeIn');
                        }
                    });

                    dots.forEach((dot, i) => {
                        if (i === index) {
                            dot.classList.add('BannerTheme_navigationActive');
                        } else {
                            dot.classList.remove('BannerTheme_navigationActive');
                        }
                    });
                };

                // Auto-next logic
                let autoNextInterval;
                const startAutoNext = () => {
                    autoNextInterval = setInterval(() => {
                        currentIndex = (currentIndex + 1) % data.banners.length;
                        showBanner(currentIndex);
                    }, 5000); // 5 seconds interval
                };

                const stopAutoNext = () => {
                    clearInterval(autoNextInterval);
                };

                // Add event listeners to controls
                const prevBtn = document.getElementById('banner-prev-btn');
                const nextBtn = document.getElementById('banner-next-btn');

                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        stopAutoNext();
                        currentIndex = (currentIndex - 1 + data.banners.length) % data.banners.length;
                        showBanner(currentIndex);
                        startAutoNext();
                    });
                }

                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        stopAutoNext();
                        currentIndex = (currentIndex + 1) % data.banners.length;
                        showBanner(currentIndex);
                        startAutoNext();
                    });
                }

                // Pause on hover
                container.addEventListener('mouseenter', stopAutoNext);
                container.addEventListener('mouseleave', startAutoNext);

                // Start initial timer
                startAutoNext();
            }
        })
        .catch(error => console.error('Error loading banners:', error));
});
