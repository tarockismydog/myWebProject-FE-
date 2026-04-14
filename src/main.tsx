import { QueryClient } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router/root.tsx";
import store from "./store.tsx";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        {/* <Provider store={store}> */}
        <RouterProvider router={router} />
        {/* </Provider> */}
        <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>,
);
