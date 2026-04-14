import { Outlet, useLocation, useNavigate } from "react-router";

function IndexPage() {
    const navigate = useNavigate();
    const { pathname } = useLocation(); // 현재 경로 확인용

    return (
        <div className="w-full">
            {/* 상단 타이틀 및 탭 메뉴 */}
            <div className="flex flex-col mb-8">
                <h1 className="text-3xl font-black text-slate-800 mb-6">
                    Products
                </h1>

                <div className="flex space-x-2 border-b border-slate-100">
                    <button
                        className={`px-6 py-3 font-bold transition-all ${
                            pathname.includes("list")
                                ? "text-indigo-600 border-b-2 border-indigo-600"
                                : "text-slate-400 hover:text-slate-600"
                        }`}
                        onClick={() => navigate({ pathname: "list" })}
                    >
                        LIST
                    </button>
                    <button
                        className={`px-6 py-3 font-bold transition-all ${
                            pathname.includes("add")
                                ? "text-indigo-600 border-b-2 border-indigo-600"
                                : "text-slate-400 hover:text-slate-600"
                        }`}
                        onClick={() => navigate({ pathname: "add" })}
                    >
                        ADD
                    </button>
                </div>
            </div>

            {/* 하단 자식 라우트 영역 */}
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
}
export default IndexPage;
