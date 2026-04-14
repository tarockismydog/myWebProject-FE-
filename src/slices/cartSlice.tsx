import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart } from "../api/cartApi";

export const getCartItemsAsync = createAsyncThunk("getCartItemAsync", () => {
    return getCartItems();
});

export const postChangeCartItemAsync = createAsyncThunk(
    "postChangeCartItemAsync",
    (param: CartItemRequest) => {
        return postChangeCart(param);
    },
);

const initState: CartItemsArray = { items: [], status: "" };

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartItemsAsync.fulfilled, (state, action) => {
                return { items: action.payload, status: "fulfilled" };
            })
            .addCase(getCartItemsAsync.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(getCartItemsAsync.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(postChangeCartItemAsync.fulfilled, (state, action) => {
                return { items: action.payload, status: "fulfilled" };
            })
            .addCase(postChangeCartItemAsync.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(postChangeCartItemAsync.rejected, (state, action) => {
                state.status = "rejected";
            });
    },
});

export default cartSlice.reducer;
