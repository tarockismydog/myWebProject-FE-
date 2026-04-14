import { NavLink } from "react-router";
import useCustomLogin from "../../hooks/useCustomLogin";

function BasicMenu() {
    const { loginState, loginStatus } = useCustomLogin();

    return (
        <nav
            id="navbar"
            className="flex items-center justify-between bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-50"
        >
            <div className="flex items-center gap-8">
                {/* 로고 영역 */}
                <div className="text-2xl font-black text-indigo-600 tracking-tighter">
                    <NavLink to="/">MYWEB</NavLink>
                </div>

                <ul className="flex space-x-6 text-slate-600 font-semibold">
                    <li className="hover:text-indigo-600 transition-colors">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-indigo-600" : ""
                            }
                        >
                            Main
                        </NavLink>
                    </li>
                    <li className="hover:text-indigo-600 transition-colors">
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "text-indigo-600" : ""
                            }
                        >
                            About
                        </NavLink>
                    </li>
                    {loginStatus && (
                        <>
                            <li className="hover:text-indigo-600 transition-colors">
                                <NavLink
                                    to="/products/"
                                    className={({ isActive }) =>
                                        isActive ? "text-indigo-600" : ""
                                    }
                                >
                                    Products
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <div className="flex items-center font-medium">
                {!loginStatus ? (
                    <NavLink
                        to={"/member/login"}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                    >
                        Login
                    </NavLink>
                ) : (
                    <div className="flex items-center gap-4 text-sm">
                        <p className="text-slate-700 font-bold border-r pr-4 border-slate-200">
                            <span className="text-indigo-600">
                                {loginState.nickname}
                            </span>
                            님
                        </p>
                        <NavLink
                            to={"/member/logout"}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                            Logout
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
}
export default BasicMenu;
