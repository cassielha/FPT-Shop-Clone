import ProductData from '../data/products.json';

export const parsePrice = (str) => parseInt(String(str).replace(/[^0-9]/g, '')) || 0;
export const formatPrice = (n) => n.toLocaleString('vi-VN') + 'đ';


export const findProductById = (id) => {
    for (const category of ProductData.categories) {
        const product = category.products.find((p) => p.id === id);
        if (product) return product;
    }
    return null;
};


export const calculateSummary = (cart) => {
    let subtotal = 0;
    let totalDiscount = 0;

    cart.forEach((item) => {
        if (item.selected) {
            const sale = parsePrice(item.sale_price);
            const original = item.original_price ? parsePrice(item.original_price) : sale;
            subtotal += original * item.quantity;
            totalDiscount += (original - sale) * item.quantity;
        }
    });

    const finalTotal = subtotal - totalDiscount;
    const rewardPoints = Math.floor(finalTotal / 4000);

    return {
        subtotal: formatPrice(subtotal),
        totalDiscount: '-' + formatPrice(totalDiscount),
        finalTotal: formatPrice(finalTotal),
        rewardPoints: '+' + rewardPoints.toLocaleString('vi-VN'),
    };
};
