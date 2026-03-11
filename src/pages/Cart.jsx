import Layout from '../layout/Layout';
import { useCart } from '../hooks/useCart';
import EmptyCart from '../components/cart/EmptyCart';
import CartItemsPanel from '../components/cart/CartItemsPanel';
import OrderSummary from '../components/cart/OrderSummary';


const Cart = () => {
    const { totalItems } = useCart();

    return (
        <Layout>
            <title>Giỏ hàng | Fptshop.com.vn</title>
            <div className="h-full min-h-[600px] py-10 flex flex-col gap-8" id="cart-page" style={{ backgroundColor: 'rgb(239, 240, 242)' }}>
                {totalItems === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="container gap-4 mb:flex mb:flex-col mb:px-0 pc:grid pc:grid-cols-3">
                        <div className="pc:col-span-2">
                            <CartItemsPanel />
                        </div>
                        <div className="pc:col-span-1">
                            <OrderSummary />
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Cart;