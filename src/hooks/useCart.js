import { useContext } from 'react';
import { CartStateContext, CartActionContext } from '../context/CartContext';


export const useCart = () => {
    const ctx = useContext(CartStateContext);
    if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
    return ctx;
};

export const useCartActions = () => {
    const ctx = useContext(CartActionContext);
    if (!ctx) throw new Error('useCartActions must be used inside <CartProvider>');
    return ctx;
};
