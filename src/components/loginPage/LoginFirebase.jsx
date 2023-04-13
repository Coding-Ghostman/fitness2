import React, { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../auth/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import useNavigation from "../../hooks/use-navigation";
import LoadingAnimation from "../Animation/LoadingAnimation";
import Link from "../link/Link";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const { navigateReplace } = useNavigation();
    useEffect(() => {
        if (loading) {
            <LoadingAnimation />;
            return;
        }
        // navigateReplace("/")
        if (user) {
            navigateReplace("/");
        }
    }, [user, loading]);
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-sm p-4 bg-[#134a5c] rounded shadow-lg">
                <h2 className="flex text-3xl justify-center text-white items-center font-bold mb-4">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-xl text-white font-semibold mb-1" for="email">
                            Email Address
                        </label>
                        <input className="w-full  rounded-lg px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    </div>
                    <div>
                        <label className="block text-xl text-white font-semibold mb-1" for="password">
                            Password
                        </label>
                        <input className="w-full border-gray-300 rounded px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded py-2" onClick={() => logInWithEmailAndPassword(email, password)}>
                        Sign In
                    </button>
                    <button
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded py-2"
                        onClick={() => {
                            signInWithGoogle();
                            navigateReplace("/");
                        }}
                    >
                        Sign in with Google
                    </button>
                    <div className="text-right">
                        <Link className="text-white hover:text-gray-300" to="/reset">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="text-center ">
                        <span className="font-semibold">Don't have an account?</span>{" "}
                        <Link className="text-white hover:text-gray-300" to="/register">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;
