import { useEffect } from "react";
import useZustandCart from "../zstore/useZustandCart";
import useZustandMember from "../zstore/useZustandMember";

export default function useCustomCart() {
    // const { loginState, loginStatus } = useCustomLogin();
    const { member: loginState, status: loginStatus } = useZustandMember();

    // const cartItems = useSelector((state: RootState) => state.cartSlice);
    const { items, getItems, requestChangeCart, status } = useZustandCart();

    // const dispatch = useDispatch<AppDispatch>();

    const cartItems = { items: items, status: status };

    useEffect(() => {
        if (loginStatus) {
            // dispatch(getCartItemsAsync());
            getItems();
        }
    }, [loginStatus]);

    const changeCart = (cino: number | null, pno: number, amount: number) => {
        const email = loginState.email;

        let qty = 1;

        if (cino) {
            const targetArr = cartItems.items.filter(
                (item) => item.cino == cino,
            );

            if (targetArr.length > 0) {
                qty = targetArr[0].qty + amount;
            }
        }

        const requestItem: CartItemRequest = cino
            ? { email, cino, pno, qty }
            : { email, pno, qty };

        console.log(requestItem);
        // dispatch(postChangeCartItemAsync(requestItem));
        requestChangeCart(requestItem);
    };

    return { loginStatus, loginState, cartItems, changeCart };
}
