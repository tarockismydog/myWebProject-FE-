import { useLoaderData, useParams } from "react-router";
import ModifyComponent from "../../components/products/modifyComponent";
import { useQuery } from "@tanstack/react-query";
import jwtAxios from "../../util/JWTUtil";
import PendingModal from "../../components/common/pendingModal";

function ModifyPage() {
    // const product: ProductDTO = useLoaderData();

    const { pno } = useParams();

    const { data, isPending, error } = useQuery({
        queryKey: ["product", pno],
        queryFn: async () => {
            const res = await jwtAxios.get(
                `http://localhost:8080/api/products/${pno}`,
            );
            return res.data;
        },
        staleTime: 1000 * 60 * 60 * 24,
    });

    const product: ProductDTO = data;
    console.log(product);

    return (
        <div className="w-full space-y-6">
            <div className="border-l-4 border-orange-500 pl-4 py-1">
                <h2 className="text-2xl font-bold text-slate-800">
                    상품 정보 수정
                </h2>
                <p className="text-slate-400 text-sm font-medium">
                    관리자 전용 페이지입니다.
                </p>
            </div>

            {isPending && <PendingModal />}
            {data && (
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <ModifyComponent product={product} />
                </div>
            )}
        </div>
    );
}

export default ModifyPage;
