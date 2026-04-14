import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCustomMove from "../../hooks/useCustomMove";
import jwtAxios from "../../util/JWTUtil";
import PendingModal from "../common/pendingModal";
import ResultModal from "../common/resultModal";

type ProductAddResult =
    | { result: number; error?: undefined }
    | { error: string; result?: undefined };

const initState: ProductAddResult = {
    result: 0,
};

// 액션 처리 함수
// const addAsyncAction = async (state: ProductAddResult, formData: FormData) => {
//     console.log("addAsyncAction....");

//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     const pname = formData.get("pname") as string;

//     if (!pname) {
//         return { error: "Insert Product Name" };
//     }

//     const res = await jwtAxios.post(
//         "http://localhost:8080/api/products/",
//         formData,
//     );

//     return { result: res.data.result };
// };

const addProduct = async (formData: FormData) => {
    const res = await jwtAxios.post(
        `http://localhost:8080/api/products/`,
        formData,
    );
    return { result: res.data.result };
};

function AddComponent() {
    const { moveToList } = useCustomMove();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addProduct,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["products/list"],
                exact: false,
            });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutation.mutate(formData);
    };

    const inputClass =
        "w-3/4 p-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 shadow-sm";
    const labelClass =
        "w-1/4 p-4 text-slate-600 font-bold text-sm text-right self-start mt-1";

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 max-w-4xl mx-auto">
            {mutation.isPending && <PendingModal />}
            {mutation.data?.result && (
                <ResultModal
                    title="상품 추가 결과"
                    content={`새로운 ${mutation.data.result}번 상품이 등록되었습니다.`}
                    callbackFn={moveToList}
                />
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-4">
                    <label className={labelClass}>Product Name</label>
                    <input
                        className={inputClass}
                        name="pname"
                        placeholder="상품명을 입력하세요"
                        required
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className={labelClass}>Description</label>
                    <textarea
                        className={inputClass}
                        name="pdesc"
                        rows={4}
                        placeholder="상품 설명을 상세히 적어주세요"
                        required
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className={labelClass}>Price</label>
                    <input
                        className={inputClass}
                        name="price"
                        type="number"
                        placeholder="판매 가격을 입력하세요"
                        required
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className={labelClass}>Files</label>
                    <div className="w-3/4">
                        <input
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            type="file"
                            name="files"
                            multiple
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-10 pt-6">
                    <button
                        type="button"
                        onClick={() => moveToList()}
                        className="px-8 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                    >
                        ADD PRODUCT
                    </button>
                </div>
            </form>
        </div>
    );
}
export default AddComponent;
