import Layout from '../layout/Layout';
import { useCart } from '../hooks/useCart';

const EmptyCart = () => (
    <div className="container mb:px-0 pc:pt-4">
        <div className="flex items-center justify-between bg-white py-[18px] sm:w-full mb:flex-col-reverse pc:rounded-2xl">
            <div className="flex flex-col pt-4 mb:items-center pc:px-9 pc:pb-5 pc:pt-6">
                <p className="mb-1 -tracking-[.64px] text-textOnWhitePrimary b1-semibold pc:mb-2 pc:l3-medium">
                    Chưa có sản phẩm nào trong giỏ hàng
                </p>
                <p className="mb-3 text-textOnWhiteSecondary f1-regular pc:mb-5 pc:b2-regular">
                    Cùng mua sắm hàng ngàn sản phẩm tại FPTShop nhé!
                </p>
                <a className="flex items-center justify-center text-base text-white transition-all duration-300 ease-out relative rounded-3xl px-4 py-2.5 font-medium bg-bgSpecialRedDefault hover:bg-bgSpecialRedHover w-fit" href="/">
                    Mua hàng
                </a>
            </div>
            <div className="relative h-[144px] w-[375px] pc:h-[202px] pc:w-[555px]">
                <img
                    alt="empty_cart"
                    loading="lazy"
                    decoding="async"
                    src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/estore-v2/img/empty_cart.png"
                    style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent', objectFit: 'contain' }}
                />
            </div>
        </div>
    </div>
);

const Cart = () => {
    const {
        cart,
        totalItems,
        selectedCount,
        isAllSelected,
        summary,
        updateQuantity,
        removeFromCart,
        toggleSelectItem,
        selectAllItems,
        removeSelectedItems
    } = useCart();

    const isEmpty = totalItems === 0;

    return (
        <Layout>
            <title>Giỏ hàng | Fptshop.com.vn</title>
            <div className="h-full min-h-[600px] py-10 flex flex-col gap-8" id="cart-page" style={{ backgroundColor: 'rgb(239, 240, 242)' }}>
                {isEmpty ? (
                    <EmptyCart />
                ) : (
                    <div className="container gap-4 mb:flex mb:flex-col mb:px-0 pc:grid pc:grid-cols-3">
                        <div className="pc:col-span-2">
                            <div className="mb-4 flex items-center justify-between bg-bgWhiteDefault p-4 pc:rounded-[12px]">
                                <div className="flex items-center gap-3">
                                    <div className="flex w-6 justify-center">
                                        <input
                                            type="checkbox"
                                            className="checkBox m-0 h-4 w-4"
                                            checked={isAllSelected}
                                            onChange={(e) => selectAllItems(e.target.checked)}
                                        />
                                    </div>
                                    <span className="f1-medium text-textOnWhitePrimary pc:b1-medium">Tất cả ({totalItems} sản phẩm)</span>
                                </div>
                                {selectedCount > 0 && (
                                    <button onClick={() => removeSelectedItems()} className="text-[#cb1c22] f1-medium hover:underline">Xoá đã chọn</button>
                                )}
                            </div>

                            {cart.map((item) => (
                                <div key={item.id} className="gap-y-4 bg-bgWhiteDefault pc:rounded-[12px] mb-4">
                                    <div className="grid w-full gap-3 p-4 pc:py-3">
                                        <div className="flex gap-3">
                                            <div className="flex gap-2 pc:gap-x-3">
                                                <div className="flex w-6 justify-center">
                                                    <input
                                                        type="checkbox"
                                                        className="checkBox m-0 h-4 w-4"
                                                        checked={item.selected || false}
                                                        onChange={() => toggleSelectItem(item.id)}
                                                    />
                                                </div>
                                                <a className="flex h-16 w-16 items-center rounded-[0.5rem] border border-solid border-iconStrokeOnWhiteDefault p-1.5 pc:h-17 pc:w-17 pc:p-2" href={item.url}>
                                                    <img src={item.image.srcset_1x} alt={item.name} className="h-full w-full object-contain" />
                                                </a>
                                            </div>
                                            <div className="flex w-full justify-end mb:flex-col pc:gap-4">
                                                <div className="grid pc:w-full pc:content-center pc:gap-0.5">
                                                    <div className="line-clamp-2 flex justify-between gap-3 pc:gap-0.5">
                                                        <span className="relative line-clamp-2 max-w-100 content-center text-textOnWhitePrimary f1-medium pc:b1-medium">
                                                            <a href={item.url}>{item.name}</a>
                                                        </span>
                                                        <button onClick={() => removeFromCart(item.id)} className="pc:hidden">
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--neutral-gray-5)"><path d="M8.5 4H11.5C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4ZM7.5 4C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H16.4456L15.2521 15.3439C15.0774 16.8576 13.7957 18 12.2719 18H7.72813C6.20431 18 4.92256 16.8576 4.7479 15.3439L3.55437 5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H7.5ZM5.74131 15.2292C5.85775 16.2384 6.71225 17 7.72813 17H12.2719C13.2878 17 14.1422 16.2384 14.2587 15.2292L15.439 5H4.56101L5.74131 15.2292ZM8.5 7.5C8.77614 7.5 9 7.72386 9 8V14C9 14.2761 8.77614 14.5 8.5 14.5C8.22386 14.5 8 14.2761 8 14V8C8 7.72386 8.22386 7.5 8.5 7.5ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5C11.2239 7.5 11 7.72386 11 8V14C11 14.2761 11.2239 14.5 11.5 14.5C11.7761 14.5 12 14.2761 12 14V8Z" fill="inherit"></path></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex mb:flex-col pc:gap-6">
                                                    <div className="flex gap-1 mb:mt-1 pc:flex-col pc:items-end pc:justify-center">
                                                        <span className="text-textOnWhiteBrand b2-semibold pc:content-center">{item.sale_price}</span>
                                                        {item.original_price && <span className="text-textOnWhiteDisable f1-medium pc:content-center"><del>{item.original_price}</del></span>}
                                                    </div>
                                                    <div className="mb:mt-2 pc:flex pc:items-center">
                                                        <div className="inline-flex items-center justify-center rounded-[6px] border border-[var(--neutral-gray-3)]">
                                                            <button onClick={() => updateQuantity(item.id, -1)} className="h-8 w-8 flex items-center justify-center cursor-pointer hover:bg-bgGrayDefault">
                                                                <svg width="10" height="2" viewBox="0 0 14 2" fill="none"><rect y="0.25" width="14" height="1.5" rx="0.75" fill="var(--neutral-gray-4)"></rect></svg>
                                                            </button>
                                                            <input type="text" value={item.quantity} className="text-center w-10 h-8 border-l border-r border-[var(--neutral-gray-3)] outline-none" readOnly />
                                                            <button onClick={() => updateQuantity(item.id, 1)} className="h-8 w-8 flex items-center justify-center cursor-pointer hover:bg-bgGrayDefault">
                                                                <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7.67742 0.677419C7.67742 0.303291 7.37413 0 7 0C6.62587 0 6.32258 0.303291 6.32258 0.677419V6.32258H0.677419C0.303291 6.32258 0 6.62587 0 7C0 7.37413 0.303291 7.67742 0.677419 7.67742H6.32258V13.3226C6.32258 13.6967 6.62587 14 7 14C7.37413 14 7.67742 13.6967 7.67742 13.3226V7.67742H13.3226C13.6967 7.67742 14 7.37413 14 7C14 6.62587 13.6967 6.32258 13.3226 6.32258H7.67742V0.677419Z" fill="black"></path></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className="mb:hidden pc:flex pc:items-center">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--neutral-gray-5)"><path d="M8.5 4H11.5C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4ZM7.5 4C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H16.4456L15.2521 15.3439C15.0774 16.8576 13.7957 18 12.2719 18H7.72813C6.20431 18 4.92256 16.8576 4.7479 15.3439L3.55437 5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H7.5ZM5.74131 15.2292C5.85775 16.2384 6.71225 17 7.72813 17H12.2719C13.2878 17 14.1422 16.2384 14.2587 15.2292L15.439 5H4.56101L5.74131 15.2292ZM8.5 7.5C8.77614 7.5 9 7.72386 9 8V14C9 14.2761 8.77614 14.5 8.5 14.5C8.22386 14.5 8 14.2761 8 14V8C8 7.72386 8.22386 7.5 8.5 7.5ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5C11.2239 7.5 11 7.72386 11 8V14C11 14.2761 11.2239 14.5 11.5 14.5C11.7761 14.5 12 14.2761 12 14V8Z" fill="inherit"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pc:col-span-1">
                            <div className="sticky right-0 top-4">
                                <div className="flex flex-col gap-3 rounded-[12px] bg-white px-4 pb-6 pt-4">
                                    <p className="text-textOnWhitePrimary b1-semibold">Thông tin đơn hàng</p>
                                    <div className="flex w-full items-center justify-between">
                                        <p className="f1-regular">Tổng tiền</p>
                                        <div className="b1-medium text-textOnWhitePrimary">{summary.subtotal}</div>
                                    </div>
                                    <div className="flex w-full items-center justify-between">
                                        <p className="f1-regular text-textOnWhiteSecondary">Tổng khuyến mãi</p>
                                        <div className="b1-medium text-textOnWhitePrimary">{summary.totalDiscount}</div>
                                    </div>
                                    <div className="my-2 border-t border-dashed border-neutral-gray-3"></div>
                                    <div className="flex w-full items-center justify-between">
                                        <p className="f1-regular">Cần thanh toán</p>
                                        <div className="b1-medium text-textOnWhiteBrand text-xl font-bold">{summary.finalTotal}</div>
                                    </div>
                                    <div className="flex w-full items-center justify-between mb-4">
                                        <p className="f1-regular text-textOnWhiteSecondary">Điểm thưởng</p>
                                        <div className="b2-regular text-textOnWhitePrimary">{summary.rewardPoints}</div>
                                    </div>
                                    <button className="flex items-center justify-center text-white bg-bgSpecialRedDefault hover:bg-bgSpecialRedHover rounded-2 h-14 px-3 py-0 b1-medium w-full">
                                        <span>Xác nhận đơn</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Cart;
