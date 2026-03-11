import CartItem from "./CartItem";
import { useCart } from "../../hooks/useCart";

const CartItemsPanel = () => {
    const { cart, totalItems, selectedCount, isAllSelected, selectAllItems, removeSelectedItems } = useCart();

    return (
        <div>
            {/* Select-all header */}
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
                    <span className="f1-medium text-textOnWhitePrimary pc:b1-medium">
                        Tất cả ({totalItems} sản phẩm)
                    </span>
                </div>
                {selectedCount > 0 && (
                    <button onClick={removeSelectedItems} className="text-[#cb1c22] f1-medium hover:underline">
                        Xoá đã chọn
                    </button>
                )}
            </div>
            {/* Item list */}
            {cart.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default CartItemsPanel;