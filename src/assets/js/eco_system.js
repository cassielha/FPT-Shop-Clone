function createEcoSystemItemElement(item) {
    const li = document.createElement('li');
    li.className = 'mb-4 border-b border-strokeOnSpecialDefault pb-4 pc:mb-0 pc:border-0 pc:border-r pc:pb-0 px-4 pc:mr-4 pc:px-0 pc:pr-4 pc:text-center';
    li.innerHTML = `
        <p class="mb-2.5 b2-semibold mb:uppercase pc:mb-1 pc:f1-regular">${item.title}</p>
        <a href="${item.link}" class="pc:flex pc:justify-center" target="_blank" rel="nofollow">
            <img src="${item.image}" alt="${item.title}" loading="lazy" width="0" height="31" decoding="async" data-nimg="1"
                style="color:transparent;width:auto;height:31px" sizes="(min-width: 150px)">
        </a>
 
    `;
    return li;
}


document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('eco_system_container');
    if (!wrapper) return;
    fetch('../models/eco_system.json')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data.eco_system) || data.eco_system.length === 0) return;
            wrapper.innerHTML = '';
            data.eco_system.forEach(item => {
                const li = createEcoSystemItemElement(item);
                wrapper.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading eco system:', error));
});