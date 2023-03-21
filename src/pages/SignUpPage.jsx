import Header from "../components/loginPage/Header";
import Signup from "../components/loginPage/Signup";
import "./Page.css";
function SignupPage() {
    return (
        <div className="bg-gradient h-screen">
            <Header heading="Signup to create an account" paragraph="Already have an account? " linkName="Login" linkUrl="/login" />
            <Signup />
        </div>
    );
}
export default SignupPage;
