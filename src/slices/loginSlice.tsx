import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtil";

export interface LoginInfo {
    email: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
    roleNames: string[];
    status: string;
}

const initState: LoginInfo = {
    email: "",
    nickname: "",
    accessToken: "",
    refreshToken: "",
    roleNames: [],
    status: "",
};

export const loginPostAsync = createAsyncThunk(
    "loginPostAync", // 이름(문자열)
    ({ email, pw }: { email: string; pw: string }) => {
        // 액션의 페이로드.. email과 pw로 이루어진 객체를 줘
        return loginPost(email, pw);
    },
);

const loginSlice = createSlice({
    name: "loginSlice",
    initialState: initState,
    reducers: {
        save: (state, action) => {
            const payload = action.payload; // {소셜로그인 회원이 사용}
            const newState = { ...payload, status: "saved" };
            setCookie("member", JSON.stringify(newState), 1); // 1일

            return payload;
        },
        logout: (state, action) => {
            removeCookie("member");
            return { ...initState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                console.log("loginPostAsync.fulfilled");

                const newState: LoginInfo = action.payload;
                newState.status = "fulfilled";

                setCookie("member", JSON.stringify(newState), 1);

                return newState;
            })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("loginPostAsync.pending");
                state.status = "panding";
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("loginPostAsync.rejected");
                state.status = "rejected";
            });
    },
});

export const { save, logout } = loginSlice.actions;

export default loginSlice.reducer;
