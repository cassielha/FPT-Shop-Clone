import { useCart } from '../../hooks/useCart';
const OrderSummary = () => {
    const { summary } = useCart();

    return (
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
                <div className="my-2 border-t border-dashed border-neutral-gray-3" />
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
    );
};

export default OrderSummary