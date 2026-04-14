import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { getCookie } from "../util/cookieUtil";
import useZustandMember from "../zstore/useZustandMember";

const useCustomLogin = () => {
    // const dispatch = useDispatch<AppDispatch>();
    const { member, status, login, logout, save } = useZustandMember();

    // 로그인 상태 객체
    // const loginState = useSelector((state: RootState) => state.loginSlice);
    const loginState = member;

    // 로그인 여부
    // const loginStatus = loginState.status; // fulfilled, pending, rejected 인지
    const loginStatus = status; // fulfilled, pending, rejected 인지

    useEffect(() => {
        if (!loginStatus) {
            const cookieData = getCookie("member");

            if (cookieData) {
                // dispatch(save(cookieData));
                save(cookieData);
            }
        }
    });

    const navigate = useNavigate();

    const doLogin = async (email: string, pw: string) => {
        // dispatch(loginPostAsync({ email, pw }));
        login(email, pw);
    };

    const doLogout = () => {
        // dispatch(logout(null));
        logout();
    };

    const moveToLogin = () => {
        navigate("/member/login");
    };

    const moveToLoginReturn = () => {
        // 로그인 페이지로 이동 컴포넌트
        return <Navigate replace to="/member/login" />;
    };

    const moveToPath = (path: string) => {
        // 페이지이동
        navigate({ pathname: path }, { replace: true });
    };

    return {
        loginState,
        loginStatus,
        doLogin,
        navigate,
        doLogout,
        moveToLogin,
        moveToLoginReturn,
        moveToPath,
    };
};

export default useCustomLogin;
