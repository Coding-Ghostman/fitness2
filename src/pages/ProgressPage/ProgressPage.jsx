import Header from "./Header";
import "../Page.css";

function ProgressPage() {
    return (
        <div className="bg-gradient h-screen overflow-y-hidden">
            <div className="inline-flex ml-5 mb-5 rounded-lg border mt-5 h-[96%] w-[95%] justify-center ">
                <Header />
            </div>
        </div>
    );
}

export default ProgressPage;
