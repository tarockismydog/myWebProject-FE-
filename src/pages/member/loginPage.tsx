import LoginComponent from "../../components/member/loginComponent";
import BasicMenu from "../../components/menus/basicMenu";

function LoginPage() {
    return (
        <div className="fixed inset-0 z-[1055] flex flex-col bg-slate-50 overflow-auto">
            <BasicMenu />
            <div className="flex-1 flex justify-center items-center p-4">
                {/* 배경에 은은한 원형 장식을 추가하면 더 예쁩니다 */}
                <div className="w-full max-w-[450px]">
                    <LoginComponent />
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
