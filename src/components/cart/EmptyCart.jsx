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

export default EmptyCart;