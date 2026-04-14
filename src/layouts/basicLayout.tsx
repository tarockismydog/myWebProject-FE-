import { Outlet } from "react-router";
import BasicMenu from "../components/menus/basicMenu";
import CartComponent from "../components/menus/cartComponent";
const BasicLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <BasicMenu />
            <div className="max-w-7xl mx-auto my-8 px-4 flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
                {/* 메인 콘텐츠 영역 */}
                <main className="w-full md:w-2/3 lg:w-3/4 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 min-h-[600px]">
                    <Outlet />
                </main>

                {/* 사이드바 (장바구니 등) */}
                <aside className="w-full md:w-1/3 lg:w-1/4">
                    <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                        <CartComponent />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default BasicLayout;
