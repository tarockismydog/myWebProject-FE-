interface CartItemComponentProps {
    cartItem: CartItemResponse;
    changeCart: (cino: number, pno: number, amount: number) => void;
}

function CartItemComponent({ cartItem, changeCart }: CartItemComponentProps) {
    const { cino, pno, pname, price, qty, imageFile } = cartItem;
    return (
        <li className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-3 list-none">
            <div className="flex gap-4">
                {/* 이미지 영역 */}
                <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-slate-50">
                    <img
                        className="w-full h-full object-cover"
                        src={`http://localhost:8080/api/products/view/s_${imageFile}`}
                        alt={pname}
                    />
                </div>

                {/* 정보 영역 */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-slate-800 truncate w-40">
                                {pname}
                            </h3>
                            <button
                                className="text-slate-300 hover:text-rose-500 transition-colors"
                                onClick={() => changeCart(cino, pno, -1 * qty)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            Item No. {cino}
                        </p>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                        {/* 수량 조절 버튼 */}
                        <div className="flex items-center bg-slate-50 rounded-lg border border-slate-100">
                            <button
                                className="px-2 py-1 text-slate-500 hover:text-orange-600 font-bold"
                                onClick={() => changeCart(cino, pno, -1)}
                            >
                                −
                            </button>
                            <span className="px-3 text-sm font-bold text-slate-700">
                                {qty}
                            </span>
                            <button
                                className="px-2 py-1 text-slate-500 hover:text-orange-600 font-bold"
                                onClick={() => changeCart(cino, pno, 1)}
                            >
                                +
                            </button>
                        </div>
                        {/* 합계 금액 */}
                        <div className="text-right font-black text-slate-900">
                            {(qty * price).toLocaleString()}{" "}
                            <span className="text-[10px] font-normal text-slate-500">
                                원
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
export default CartItemComponent;
