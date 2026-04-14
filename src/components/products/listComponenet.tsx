import { useQueryClient } from "@tanstack/react-query";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/pageComponent";
function ListComponent({
    serverData,
}: {
    serverData: PageResponseDTO<ProductDTO>;
}) {
    const { page, size, moveToRead, moveToList } = useCustomMove();

    const queryClient = useQueryClient();

    const moveCheckPage = (pageParam: PageParam) => {
        const pageValue = pageParam.page;
        const sizeValue = pageParam.size ? pageParam.size : 10;

        if (pageValue === page && sizeValue === size) {
            if (!confirm("동일한 페이지를 다시 호출할까요?")) {
                return;
            }

            queryClient.invalidateQueries({
                queryKey: ["products/list"],
                exact: false,
            });
        }

        console.log("------------------------");
        moveToList(pageParam);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">
                    Product List
                </h2>
                <span className="text-sm text-slate-400">
                    Total {serverData.dtoList.length} items
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-2">
                {serverData.dtoList.map((product) => (
                    <div
                        key={product.pno}
                        className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                        onClick={() => moveToRead(product.pno)}
                    >
                        <div className="aspect-square overflow-hidden bg-slate-50 relative">
                            <img
                                alt="product"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                src={`http://localhost:8080/api/products/view/s_${product.uploadFileNames[0]}`}
                            />
                            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white">
                                NO.{product.pno}
                            </div>
                        </div>

                        <div className="p-3">
                            <div className="font-bold text-slate-700 truncate mb-1">
                                {product.pname}
                            </div>
                            <div className="text-indigo-600 font-black text-base">
                                {product.price.toLocaleString()}원
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 호출 */}
            <PageComponent serverData={serverData} movePage={moveCheckPage} />
        </div>
    );
}
export default ListComponent;
