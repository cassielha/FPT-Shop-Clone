/**
 * Section config defines layout and styling per section ID.
 * Adding a new section type only requires adding an entry here — no JS logic changes needed.
 */
const SECTION_CONFIG = {
    payment_support: {
        containerId: 'payment-support-container',
        containerClass: 'px-4 pb-4 pc:px-0 pc:pb-0',
        titleClass: 'mb-3 pt-4 b2-semibold pc:mb-2 pc:pt-0 pc:b1-semibold FooterMain_footerTitle',
        itemsClass: 'flex flex-wrap gap-1 pc:grid pc:grid-cols-4',
        imgWidth: 48,
        imgHeight: 30,
        imgClass: '',
    },
    certification: {
        containerId: 'certificate-container',
        containerClass: 'border-t border-strokeOnSpecialDefault px-4 pt-4 pc:mb-2 pc:border-0 pc:px-0 pc:pt-8',
        titleClass: 'mb-3 b2-semibold pc:b1-semibold FooterMain_footerTitle',
        itemsClass: 'flex flex-wrap gap-x-1 gap-y-2.5 pc:gap-x-2',
        imgHeight: 32,
        imgClass: 'object-contain',
    },
};

/**
 * Creates a pre-ordered map of containers and appends them to the wrapper.
 * Order in SECTION_CONFIG determines DOM order.
 */
function buildContainers(wrapper) {
    const containers = {};
    for (const [id, config] of Object.entries(SECTION_CONFIG)) {
        const el = document.createElement('div');
        el.id = config.containerId;
        el.className = config.containerClass;
        wrapper.appendChild(el);
        containers[id] = el;
    }
    return containers;
}

function createItemElement(item) {
    const el = item.link ? document.createElement('a') : document.createElement('div');
    if (item.link) {
        el.href = item.link;
        el.target = '_blank';
        el.rel = 'nofollow noreferrer'; // noreferrer added for security
    }
    return el;
}

function createImageElement(item, config) {
    const img = document.createElement('img');
    img.alt = item.name || '';
    img.loading = 'lazy';
    // Use item-level overrides from JSON if available, then fall back to section config
    img.width = item.width ?? config.imgWidth ?? 52;
    img.height = item.height ?? config.imgHeight ?? 32;
    img.className = config.imgClass;
    img.style.color = 'transparent';
    if (item.srcset) img.srcset = item.srcset;
    img.src = item.src || '';
    return img;
}

function renderSection(section, container) {
    const config = SECTION_CONFIG[section.id];

    const title = document.createElement('p');
    title.className = config.titleClass;
    title.textContent = section.name;
    container.appendChild(title);

    const itemsWrapper = document.createElement('div');
    itemsWrapper.className = config.itemsClass;

    for (const item of section.items) {
        if (!item.name && !item.src) continue; // Skip empty/placeholder items

        const itemElement = createItemElement(item);
        itemElement.appendChild(createImageElement(item, config));
        itemsWrapper.appendChild(itemElement);
    }

    container.appendChild(itemsWrapper);
}

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('footer-partner-wrapper');
    if (!wrapper) return;

    fetch('../models/partner.json')
        .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch partner data: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data.partner) || data.partner.length === 0) return;

            wrapper.innerHTML = ''; // Clear static/SSR content only after data is ready
            const containers = buildContainers(wrapper);

            for (const section of data.partner) {
                const container = containers[section.id];
                if (!container) {
                    console.warn(`[partner] Unknown section id: "${section.id}" — skipping.`);
                    continue;
                }
                renderSection(section, container);
            }
        })
        .catch(error => {
            console.error('[partner] Error loading partner data:', error);
            wrapper.insertAdjacentHTML('beforeend', '<p class="text-error text-sm py-2">Không thể tải dữ liệu đối tác.</p>');
        });
});