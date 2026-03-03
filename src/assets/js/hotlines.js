document.addEventListener('DOMContentLoaded', () => {
    fetch('../models/hotlines.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('hotline-list-container');
            if (container && data.hotlines) {
                data.hotlines.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class="b2-medium">${item.title}</span>
                        <a href="tel:${item.phone}"><b>${item.phone}</b> (<!-- -->${item.note}<!-- -->)</a>
                    `;
                    container.appendChild(li);
                });
            }
        })
        .catch(error => console.error('Error loading hotlines:', error));
});
