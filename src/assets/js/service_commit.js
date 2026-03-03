document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/service_commit.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('service-commit-container');
            if (container && data.service_commit) {
                container.innerHTML = ''; // Clear static content
                data.service_commit.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'mb-4 flex md:mb-0 md:flex-col md:items-center';

                    card.innerHTML = `
                        <div class="h-[2.75rem] w-[2.75rem] overflow-hidden md:mb-4 md:h-[3.75rem] md:w-[3.75rem]">
                            <img alt="${item.title}" 
                                 loading="lazy" 
                                 width="60" 
                                 height="50"
                                 decoding="async" 
                                 data-nimg="1" 
                                 style="color:transparent"
                                 srcset="${item.srcset}"
                                 src="${item.src}">
                        </div>
                        <div class="pl-4 md:pl-0 md:text-center">
                            <p class="text-textOnWhitePrimary b2-semibold">${item.title}</p>
                            <p>${item.sub_title}</p>
                        </div>
                    `;
                    container.appendChild(card);
                });
            }
        })
        .catch(error => console.error('Error loading service commit cards:', error));
});
