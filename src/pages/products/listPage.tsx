import { createSearchParams, useLoaderData } from "react-router";
import ListComponent from "../../components/products/listComponenet";
import useCustomMove from "../../hooks/useCustomMove";
import { useQuery } from "@tanstack/react-query";
import PendingModal from "../../components/common/pendingModal";
import jwtAxios from "../../util/JWTUtil";

// export async function loadProducts({ request }: LoaderFunctionArgs) {
//     const url = new URL(request.url);
//     const page = url.searchParams.get("page") || "1";
//     const size = url.searchParams.get("size") || "10";
//     const queryStr = createSearchParams({ page, size }).toString();
//     const res = await jwtAxios.get(
//         `http://localhost:8080/api/products/list?${queryStr}`,
//     );

//     return res.data;
// }

const ListPage = () => {
    const { page, size } = useCustomMove();
    const queryStr = createSearchParams({
        page: String(page),
        size: String(size),
    }).toString();

    // const pageResponse = useLoaderData();

    const { data, isPending, error } = useQuery({
        queryKey: ["products/list"],
        queryFn: async () => {
            const res = await jwtAxios.get(
                `http://localhost:8080/api/products/list?${queryStr}`,
            );
            return res.data;
        },
        staleTime: 1000 * 60,
    });

    let pageResponse;

    if (data) {
        pageResponse = data;
    }

    return (
        <div className="w-full animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-700">상품 목록</h2>
                <p className="text-sm text-slate-400">
                    최신 등록 순으로 표시됩니다.
                </p>
            </div>

            {isPending && <PendingModal />}
            {pageResponse && (
                <div className="bg-white rounded-xl">
                    <ListComponent serverData={pageResponse} />
                </div>
            )}
        </div>
    );
};
export default ListPage;
