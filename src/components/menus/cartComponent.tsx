import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/cartItemComponent";

const CartComponent = () => {
    const { loginStatus, loginState, cartItems, changeCart } = useCustomCart();

    return (
        <div className="w-full bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
            {loginStatus ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-between pb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                Shopping Cart
                            </h2>
                            <span className="bg-orange-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm shadow-orange-200">
                                {cartItems.status === "fulfilled"
                                    ? cartItems.items.length
                                    : 0}
                            </span>
                        </div>
                    </div>

                    {cartItems.status === "pending" && (
                        <div className="flex flex-col items-center py-20 gap-3">
                            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                            <p className="text-slate-400 text-sm font-medium">
                                Updating cart...
                            </p>
                        </div>
                    )}

                    {cartItems.status === "fulfilled" && (
                        <ul className="space-y-1 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            {cartItems.items.length > 0 ? (
                                cartItems.items.map((item) => (
                                    <CartItemComponent
                                        cartItem={item}
                                        changeCart={changeCart}
                                        key={item.cino}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
                                    <p className="text-slate-400 text-sm font-medium">
                                        장바구니가 비어있습니다.
                                    </p>
                                </div>
                            )}
                        </ul>
                    )}

                    {/* 총액 요약 등 추가 가능 영역 */}
                    {cartItems.items.length > 0 && (
                        <div className="pt-4 border-t border-slate-200 mt-4 flex justify-between items-center px-2">
                            <span className="text-slate-500 font-bold">
                                Total Estimate
                            </span>
                            <span className="text-xl font-black text-indigo-600">
                                {cartItems.items
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.price * item.qty,
                                        0,
                                    )
                                    .toLocaleString()}
                                원
                            </span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center py-12 px-6 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <p className="text-slate-600 font-bold mb-1">
                        Access Required
                    </p>
                    <p className="text-slate-400 text-sm">
                        로그인 후 나만의 장바구니를 확인하세요.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CartComponent;
