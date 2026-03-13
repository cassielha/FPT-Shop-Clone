import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { findProductById, calculateSummary } from '../utils/cartHelpers';

export const CartStateContext = createContext(null);
export const CartActionContext = createContext(null);
export const CartContext = CartStateContext; // For backward compatibility with things that haven't migrated yet

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

    // Actions need to be stable to avoid re-rendering action consumers
    const actions = useMemo(() => ({
        addToCart: (productId) => {
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
        },
        updateQuantity: (id, delta) => {
            setCart((prev) => {
                const index = prev.findIndex(item => item.id === id);
                if (index === -1) return prev;
                const updated = [...prev];
                const newQty = updated[index].quantity + delta;
                updated[index] = { ...updated[index], quantity: Math.max(1, newQty) };
                return updated;
            });
        },
        removeFromCart: (id) => {
            setCart((prev) => prev.filter((item) => item.id !== id));
        },
        toggleSelectItem: (id) => {
            setCart((prev) => {
                const index = prev.findIndex(item => item.id === id);
                if (index === -1) return prev;
                const updated = [...prev];
                updated[index] = { ...updated[index], selected: !updated[index].selected };
                return updated;
            });
        },
        selectAllItems: (selected) => {
            setCart((prev) => prev.map((item) => ({ ...item, selected })));
        },
        removeSelectedItems: () => {
            setCart((prev) => prev.filter((item) => !item.selected));
        },
        setShowNoti
    }), []); // Empty dependency array means these functions never change

    const totalItems = cart.length;
    const selectedCount = cart.filter((i) => i.selected).length;
    const isAllSelected = totalItems > 0 && totalItems === selectedCount;
    const summary = calculateSummary(cart);

    // Context value for state (changes when cart changes)
    const stateValue = {
        cart,
        totalItems,
        selectedCount,
        isAllSelected,
        summary,
        showNoti
    };

    // Also include actions in stateValue for backward compatibility before all files are migrated
    const legacyValue = { ...stateValue, ...actions };

    return (
        <CartActionContext.Provider value={actions}>
            <CartStateContext.Provider value={legacyValue}>
                {children}
            </CartStateContext.Provider>
        </CartActionContext.Provider>
    );
};

export default CartStateContext;