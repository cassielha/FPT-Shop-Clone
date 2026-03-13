import { createContext, useState, useEffect } from 'react';
import { findProductById, calculateSummary } from '../utils/cartHelpers';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'cart';

const getInitialCart = () => {
    try {
        const item = localStorage.getItem(CART_STORAGE_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error('Failed to parse cart from local storage', error);
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(getInitialCart);
    const [showNoti, setShowNoti] = useState(false);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = ((productId) => {
        const product = findProductById(productId);
        if (!product) {
            console.error('[Cart] Product not found:', productId);
            return;
        }

        setCart((prev) => {
            const idx = prev.findIndex((item) => item.id === productId);
            if (idx !== -1) {
                const updated = [...prev];
                updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
                return updated;
            }
            return [...prev, { ...product, quantity: 1, selected: true }];
        });

        setShowNoti(true);
    });

    const updateQuantity = ((id, delta) => {
        setCart((prev) => {
            const index = prev.findIndex(item => item.id === id);
            if (index === -1) return prev;
            const updated = [...prev];
            const newQty = updated[index].quantity + delta;
            updated[index] = { ...updated[index], quantity: Math.max(1, newQty) };
            return updated;
        });
    });

    const removeFromCart = ((id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    });

    const toggleSelectItem = ((id) => {
        setCart((prev) => {
            const index = prev.findIndex(item => item.id === id);
            if (index === -1) return prev;
            const updated = [...prev];
            updated[index] = { ...updated[index], selected: !updated[index].selected };
            return updated;
        });
    });

    const selectAllItems = ((selected) => {
        setCart((prev) => prev.map((item) => ({ ...item, selected })));
    });

    const removeSelectedItems = (() => {
        setCart((prev) => prev.filter((item) => !item.selected));
    });

    const totalItems = cart.length;
    const selectedCount = cart.filter((i) => i.selected).length;
    const isAllSelected = totalItems > 0 && totalItems === selectedCount;
    const summary = calculateSummary(cart);

    return (
        <CartContext.Provider value={{
            cart,
            totalItems,
            selectedCount,
            isAllSelected,
            summary,
            addToCart,
            updateQuantity,
            removeFromCart,
            toggleSelectItem,
            selectAllItems,
            removeSelectedItems,
            showNoti,
            setShowNoti,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;