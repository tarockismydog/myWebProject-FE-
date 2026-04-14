import { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import ResultModal from "../common/resultModal";
import KakaoLoginComponent from "./kakaoLoginComponent";

interface LoginResult {
    email: string;
    signed: boolean;
}

const initState: LoginResult = {
    email: "",
    signed: false,
};

function LoginComponent() {
    const { doLogin, loginStatus, moveToPath } = useCustomLogin();

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const handleLogin = () => {
        doLogin(email, pw);
    };

    const closeModal = () => {
        moveToPath("/");
    };

    return (
        <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/60 p-8 md:p-12 border border-slate-100">
            {/* 상태 알림 레이어 */}
            {loginStatus === "pending" && (
                <div className="mb-4 p-3 bg-amber-50 text-amber-600 text-sm font-bold rounded-xl text-center animate-pulse">
                    로그인 확인 중...
                </div>
            )}
            {loginStatus === "fulfilled" && (
                <ResultModal
                    title="Login Result"
                    content="로그인 되었습니다."
                    callbackFn={closeModal}
                />
            )}
            {loginStatus === "rejected" && (
                <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-sm font-bold rounded-xl text-center">
                    이메일 또는 비밀번호를 확인하세요.
                </div>
            )}

            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                    Welcome Back
                </h2>
                <p className="text-slate-400 mt-2 font-medium">
                    서비스 이용을 위해 로그인해주세요
                </p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                        Email Address
                    </label>
                    <input
                        className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                        placeholder="example@mail.com"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                        Password
                    </label>
                    <input
                        className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                        placeholder="••••••••"
                        type="password"
                        onChange={(e) => setPw(e.target.value)}
                    />
                </div>

                <button
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all mt-4"
                    onClick={handleLogin}
                >
                    SIGN IN
                </button>
            </div>

            <div className="mt-8">
                <div className="relative flex items-center justify-center mb-6">
                    <div className="w-full border-t border-slate-100"></div>
                    <span className="absolute bg-white px-4 text-xs font-bold text-slate-300 uppercase tracking-widest">
                        Or continue with
                    </span>
                </div>
                <KakaoLoginComponent />
            </div>
        </div>
    );
}
export default LoginComponent;

// const dispatch = useDispatch();

// const [state, action, isPending] = useActionState(
//     async (state: LoginResult, formData: FormData) => {
//         // 2초간 딜레이
//         await new Promise((resolve) => setTimeout(resolve, 2000));

//         const email = formData.get("email") as string;
//         const pw = formData.get("pw") as string;

//         console.log("email", email, "pw", pw);

//         return { email: email, signed: true };
//     },
//     initState,
// );
// useEffect(() => {
//     if (state.signed) {
//         dispatch(login(state));
//     }
// }, [state.signed]);
