import { Link } from "react-router";
import { getKakaoLoginLink } from "../../api/kakaoApi";
const KakaoLoginComponent = () => {
    const link = getKakaoLoginLink();
    return (
        <div className="flex flex-col gap-3">
            <Link
                to={link}
                className="flex justify-center items-center w-full py-4 bg-[#FEE500] text-[#191919] rounded-2xl font-bold hover:bg-[#FDD835] transition-colors shadow-sm"
            >
                <span className="mr-2">🟡</span> 카카오 계정으로 로그인
            </Link>
            <p className="text-center text-[11px] text-slate-400 font-medium">
                로그인 시{" "}
                <span className="underline cursor-pointer">이용약관</span> 및
                자동 가입에 동의하게 됩니다.
            </p>
        </div>
    );
};
export default KakaoLoginComponent;
