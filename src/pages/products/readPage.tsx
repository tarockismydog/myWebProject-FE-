import { useLoaderData, useParams } from "react-router";
import ReadComponent from "../../components/products/readComponent";
import { useQuery } from "@tanstack/react-query";
import jwtAxios from "../../util/JWTUtil";
import PendingModal from "../../components/common/pendingModal";

// export async function loadProduct({ params }: LoaderFunctionArgs) {
//     const { pno } = params;
//     const res = await jwtAxios.get(`http://localhost:8080/api/products/${pno}`);
//     return res.data;
// }

function ReadPage() {
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

    const product = data;

    return (
        <div className="w-full space-y-6">
            <div className="border-l-4 border-indigo-500 pl-4 py-1">
                <h2 className="text-2xl font-bold text-slate-800">
                    상품 상세 정보
                </h2>
                <p className="text-slate-400 text-sm">Product Number: #{pno}</p>
            </div>

            {isPending && <PendingModal />}
            {product && (
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <ReadComponent product={product} />
                </div>
            )}
        </div>
    );
}

export default ReadPage;
