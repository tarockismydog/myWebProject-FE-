import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import useZustandMember from "../../zstore/useZustandMember";

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const authCode = searchParams.get("code");

    // const dispatch = useDispatch<AppDispatch>();
    const { save } = useZustandMember();

    const navigate = useNavigate();

    // authCode 로 -> Access Token 얻기
    useEffect(() => {
        if (authCode) {
            getAccessToken(authCode).then((data) => {
                if (data) {
                    getMemberWithAccessToken(data).then((memberInfo) => {
                        console.log("==================");
                        console.log(memberInfo);
                        // dispatch(save(memberInfo));
                        save(memberInfo);

                        if (memberInfo.social) {
                            navigate("/member/modify");
                        }
                    });
                }
            });
        }
    }, [authCode]);

    return <Navigate to={"/"}></Navigate>;
};
export default KakaoRedirectPage;
