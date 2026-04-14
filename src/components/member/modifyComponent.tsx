import { useActionState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import jwtAxios from "../../util/JWTUtil";
import PendingModal from "../common/pendingModal";
interface ModifyResult {
    result: string;
    error: string;
}
const initState: ModifyResult = {
    result: "",
    error: "",
};

const modifyAction = async (state: ModifyResult, formData: FormData) => {
    const email = formData.get("email") as string;
    const pw = formData.get("pw") as string;
    const nickname = formData.get("nickname") as string;
    if (pw.length < 8) {
        return { result: "", error: "패스워드는 8자 이상이어야 합니다." };
    }
    try {
        await jwtAxios.put("http://localhost:8080/api/member/modify", {
            email,
            pw,
            nickname,
        });
    } catch (err: any) {
        return {
            result: "",
            error:
                err.response?.data?.message || "수정 중 오류가 발생했습니다.",
        };
    }
    return { result: "Modified", error: "" };
};

function ModifyComponent() {
    const { loginState, moveToLogin } = useCustomLogin();
    const [state, action, isPending] = useActionState(modifyAction, initState);

    const closeModal = () => {
        moveToLogin();
    };

    const inputLabel = "w-1/4 text-slate-500 font-bold text-sm text-right pr-4";
    const inputStyle =
        "w-3/4 p-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium";

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 md:p-10">
            {isPending && <PendingModal />}

            <div className="mb-8 border-b border-slate-50 pb-6">
                <h2 className="text-2xl font-black text-slate-800">
                    Edit Profile
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                    계정 정보를 최신으로 유지하세요.
                </p>
            </div>

            <form action={action} className="space-y-6">
                {/* Email (Read Only) */}
                <div className="flex items-center">
                    <label className={inputLabel}>Email</label>
                    <input
                        className={`${inputStyle} bg-slate-50 text-slate-400 border-dashed cursor-not-allowed`}
                        name="email"
                        type="text"
                        defaultValue={loginState.email}
                        readOnly
                    />
                </div>

                {/* Password */}
                <div className="flex items-center">
                    <label className={inputLabel}>New Password</label>
                    <input
                        className={inputStyle}
                        name="pw"
                        type="password"
                        placeholder="변경할 비밀번호를 입력하세요"
                    />
                </div>

                {/* Nickname */}
                <div className="flex items-center">
                    <label className={inputLabel}>Nickname</label>
                    <input
                        className={inputStyle}
                        name="nickname"
                        type="text"
                        defaultValue={loginState.nickname}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-slate-50 mt-8">
                    <button
                        type="submit"
                        className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
                    >
                        SAVE CHANGES
                    </button>
                </div>
            </form>
        </div>
    );
}
export default ModifyComponent;
