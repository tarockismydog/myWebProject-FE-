import { NavLink } from "react-router";
import useCustomLogin from "../hooks/useCustomLogin";

function AboutPage() {
    const { loginStatus, loginState, moveToLoginReturn } = useCustomLogin();

    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!loginStatus) {
        return moveToLoginReturn();
    }

    return (
        <div className="min-h-screen bg-white p-6 md:p-12 animate-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-2xl mx-auto">
                {/* 네비게이션 */}
                <div className="mb-12">
                    <NavLink
                        to="/"
                        className="inline-flex items-center text-slate-400 font-bold hover:text-slate-900 transition-colors"
                    >
                        <span className="mr-2">←</span> Back to Main
                    </NavLink>
                </div>

                <div className="relative">
                    {/* 장식용 배경 */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

                    <div className="relative bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-100">
                        <div className="flex flex-col items-center">
                            {/* 아바타 (이름 첫글자) */}
                            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-200 mb-6">
                                {loginState.nickname?.[0] || "U"}
                            </div>

                            <h2 className="text-3xl font-black text-slate-800 mb-2">
                                Hello, {loginState.nickname || "User"}!
                            </h2>
                            <p className="text-slate-400 font-medium mb-8">
                                This is your private workspace.
                            </p>

                            {/* 상세 정보 리스트 */}
                            <div className="w-full space-y-3">
                                <div className="flex justify-between p-4 bg-slate-50 rounded-2xl">
                                    <span className="text-slate-400 font-bold text-sm uppercase">
                                        Email
                                    </span>
                                    <span className="text-slate-700 font-bold">
                                        {loginState.email}
                                    </span>
                                </div>
                                <div className="flex justify-between p-4 bg-slate-50 rounded-2xl">
                                    <span className="text-slate-400 font-bold text-sm uppercase">
                                        Account Type
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black">
                                        ACTIVE
                                    </span>
                                </div>
                            </div>

                            <div className="mt-10 p-6 border-t border-slate-100 w-full text-center">
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    About 페이지는 로그인된 사용자만 접근할 수
                                    있는 보호된 구역입니다.
                                    <br />
                                    현재 성공적으로 인증되었습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
