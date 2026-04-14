import useCustomCart from "../../hooks/useCustomCart";
import useCustomMove from "../../hooks/useCustomMove";

function ReadComponent({ product }: { product: ProductDTO }) {
    const { moveToList, moveToModify } = useCustomMove();
    const { changeCart, cartItems } = useCustomCart();

    const handleClickAddCart = () => {
        const addedItem = cartItems.items.find(
            (item) => item.pno === product.pno,
        );
        if (addedItem) {
            if (!window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?"))
                return;
            changeCart(addedItem.cino, product.pno, 1);
        } else {
            changeCart(null, product.pno, 1);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8">
                {/* 데이터 행: PNO */}
                <div className="flex items-center border-b border-slate-50 py-4">
                    <div className="w-1/4 text-slate-400 font-bold uppercase tracking-wider text-sm">
                        PNO
                    </div>
                    <div className="w-3/4 text-slate-800 font-semibold">
                        {product.pno}
                    </div>
                </div>

                {/* 데이터 행: PNAME */}
                <div className="flex items-center border-b border-slate-50 py-4">
                    <div className="w-1/4 text-slate-400 font-bold uppercase tracking-wider text-sm">
                        Name
                    </div>
                    <div className="w-3/4 text-xl font-black text-slate-900">
                        {product.pname}
                    </div>
                </div>

                {/* 데이터 행: PRICE */}
                <div className="flex items-center border-b border-slate-50 py-4">
                    <div className="w-1/4 text-slate-400 font-bold uppercase tracking-wider text-sm">
                        Price
                    </div>
                    <div className="w-3/4 text-2xl font-black text-indigo-600">
                        {product.price.toLocaleString()}{" "}
                        <span className="text-sm text-slate-400">원</span>
                    </div>
                </div>

                {/* 데이터 행: PDESC */}
                <div className="flex flex-col py-6">
                    <div className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-3">
                        Description
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl text-slate-600 leading-relaxed min-h-[120px]">
                        {product.pdesc}
                    </div>
                </div>

                {/* 이미지 갤러리 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {product.uploadFileNames.map((imgFile, i) => (
                        <div
                            key={i}
                            className="aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50"
                        >
                            <img
                                alt="product"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                src={`http://localhost:8080/api/products/view/${imgFile}`}
                            />
                        </div>
                    ))}
                </div>

                {/* 하단 버튼 바 */}
                <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-slate-100">
                    <button
                        onClick={handleClickAddCart}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                    >
                        Add Cart
                    </button>
                    <button
                        onClick={() => moveToModify(product.pno)}
                        className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all"
                    >
                        Modify
                    </button>
                    <button
                        onClick={() => moveToList()}
                        className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                    >
                        List
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReadComponent;
