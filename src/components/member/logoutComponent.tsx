import { useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";
function LogoutComponent() {
    const { doLogout } = useCustomLogin();

    return (
        <div className="bg-white rounded-[32px] shadow-xl p-10 border border-slate-100 text-center max-w-sm mx-auto mt-20">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">
                로그아웃 하시겠습니까?
            </h2>

            <button
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                onClick={() => doLogout()}
            >
                LOGOUT NOW
            </button>
        </div>
    );
}
export default LogoutComponent;
