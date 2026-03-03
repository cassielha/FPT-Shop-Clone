document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/categories.json')
        .then(response => response.json())
        .then(data => {
            const wrapper = document.getElementById('categories-container');
            if (wrapper && data.categories) {
                const container = wrapper.parentElement;

                data.categories.forEach(item => {
                    const slide = document.createElement('div');
                    slide.className = 'CustomSlider_sliderItem';

                    slide.innerHTML = `
                        <a class="group" href="${item.link}">
                            <div class="flex flex-col items-center text-center pc:pb-5">
                                <img
                                    alt="${item.name}" 
                                    loading="lazy" 
                                    width="130"
                                    height="130" 
                                    decoding="async" 
                                    data-nimg="1"
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

                // Swipe Logic
                let isDown = false;
                let startX;
                let scrollLeft = 0;
                let x = 0;
                let walk = 0;

                const startDragging = (e) => {
                    isDown = true;
                    container.classList.add('CustomSlider_isSwiping');
                    startX = (e.pageX || e.touches[0].pageX);
                    // Get current translate value
                    const style = window.getComputedStyle(wrapper);
                    const matrix = new WebKitCSSMatrix(style.transform);
                    scrollLeft = matrix.m41;
                };

                const stopDragging = () => {
                    isDown = false;
                    container.classList.remove('CustomSlider_isSwiping');
                };

                const move = (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    x = (e.pageX || e.touches[0].pageX);
                    walk = x - startX;
                    const newTranslate = scrollLeft + walk;

                    // Basic boundary check
                    const maxScroll = -(wrapper.scrollWidth - container.clientWidth);
                    const boundedTranslate = Math.max(Math.min(0, newTranslate), maxScroll);

                    wrapper.style.transform = `translate3d(${boundedTranslate}px, 0px, 0px)`;
                };

                // Mouse Events
                container.addEventListener('mousedown', startDragging);
                container.addEventListener('mouseleave', stopDragging);
                container.addEventListener('mouseup', stopDragging);
                container.addEventListener('mousemove', move);

                // Touch Events
                container.addEventListener('touchstart', startDragging);
                container.addEventListener('touchend', stopDragging);
                container.addEventListener('touchmove', move);
            }
        })
        .catch(error => console.error('Error loading categories:', error));
});
