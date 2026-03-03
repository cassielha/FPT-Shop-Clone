document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/social_links.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('social-links-container');
            if (container && data.social_links) {
                data.social_links.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'flex';
                    li.innerHTML = `
                        <a href="${item.url}" target="_blank" class="mr-3" rel="nofollow">
                            <img alt="${item.name}" loading="lazy" width="28" height="28" decoding="async" data-nimg="1" style="color:transparent"
                                 srcset="${item.icon_srcset}"
                                 src="${item.icon_src}">
                        </a>`;
                    container.appendChild(li);
                });
            }
        })
        .catch(error => console.error('Error loading social links:', error));
});
