import LoginFirebase from "../components/loginPage/LoginFirebase";
import { useState } from "react";
import "./Page.css";
function LogInPage({ handleChange, auth }) {
    const [user, setUser] = useState({});
    const handleUser = (val) => {
        setUser(val);
        handleChange(val);
    };

    return (
        <div className="bg-gradient h-screen">
            <LoginFirebase />
        </div>
    );
}

export default LogInPage;
