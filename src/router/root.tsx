import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import BasicLayout from "../layouts/basicLayout";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";

const Loading = () => <div>Loading....</div>;
const Main = lazy(() => import("../pages/mainPage")); // 지연로딩
const About = lazy(() => import("../pages/aboutPage"));

const router = createBrowserRouter([
    // 브라우저의 주소창을 기반으로 라우팅함
    {
        path: "/",
        Component: BasicLayout,
        children: [
            // Outlet 자리에 들어갈 속재료
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <Main />
                    </Suspense>
                ),
            },
            {
                path: "about",
                element: (
                    <Suspense fallback={<Loading />}>
                        <About />
                    </Suspense>
                ),
            },
            // todoRouter(),
            productsRouter(),
        ],
    },
    memberRouter(),
]);

export default router;
