document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/utilities_services.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('utilities-services-container');
            if (container && data.utilities) {
                container.innerHTML = data.utilities.map(item => `
                    <div class="swiper-slide Slider_slideItem6 h-auto UtilitiesService_customSlider" role="group">
                        <a class="flex h-full flex-col items-center p-2 f1-medium pc:justify-center pc:gap-1 pc:gap-3 pc:px-4 pc:py-3 pc:b1-medium" href="${item.link}">
                            <img alt="${item.name}" loading="lazy" width="52" height="52" decoding="async" data-nimg="1" class="h-8 w-8 duration-300 hover:scale-105 pc:h-[52px] pc:w-[52px]" style="color:transparent" src="${item.icon}">
                            <p class="text-center text-textOnWhitePrimary f1-medium pc:b1-medium">${item.name}</p>
                        </a>
                    </div>
                `).join('');

                new Swiper('.UtilitiesService_customSlider_wrapper', {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    breakpoints: {
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 0
                        }
                    }
                });
            }
        })
        .catch(error => console.error('Error loading utilities & services:', error));
});
