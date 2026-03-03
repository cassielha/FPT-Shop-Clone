document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/nav_menu.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('nav-menu-container');
            if (container && data.nav_items) {
                data.nav_items.forEach((item, index) => {
                    const slide = document.createElement('div');
                    slide.className = `swiper-slide ${index === 0 ? 'swiper-slide-active' : index === 1 ? 'swiper-slide-next' : ''} Slider_slideItemAuto h-auto max-w-fit px-0`;
                    slide.setAttribute('role', 'group');
                    slide.setAttribute('aria-label', `${index + 1} / ${data.nav_items.length}`);

                    let content = '';
                    const innerClass = "flex items-center b2-medium";
                    const imgHtml = `<img alt="${item.name}" fetchpriority="high" width="32" height="32" decoding="async" data-nimg="1" class="mr-2" style="color:transparent" srcset="${item.icon_srcset}" src="${item.icon_src}">`;
                    const arrowHtml = item.has_arrow ? `<span class="ml-1 size-4"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z" fill="#090D14"></path></svg></span>` : '';

                    if (item.link) {
                        content = `<a class="${innerClass}" href="${item.link}">${imgHtml}${item.name}${arrowHtml}</a>`;
                    } else {
                        content = `<div class="${innerClass}">${imgHtml}${item.name}${arrowHtml}</div>`;
                    }

                    slide.innerHTML = `<div class="relative mr-4">${content}</div>`;
                    container.appendChild(slide);
                });
            }
        })
        .catch(error => console.error('Error loading nav menu:', error));
});
