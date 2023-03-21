import Header from "../components/loginPage/Header";
import Login from "../components/loginPage/Login";
import "./Page.css";
function LogInPage() {
    return (
        <div className="bg-gradient h-screen">
            <Header heading="Login to your account" paragraph="Don't have an account yet? " linkName="Signup" linkUrl="/signup" />
            <Login />
        </div>
    );
}

export default LogInPage;
