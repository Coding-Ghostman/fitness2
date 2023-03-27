import Header from "./components/Header/Header";
import WelcomePage from "./pages/WelcomePage";
import Route from "./components/route/Route";
import DietPlanPage from "./pages/DietPlanPage";
import WorkoutPage from "./pages/WorkoutPage";
import FitnessPlanPage from "./pages/FitnessPlanPage";
import ProgressPage from "./pages/ProgressPage";
import FriendsPage from "./pages/FriendsPage";
import SignUpPage from "./pages/SignUpPage";
import UserContext from "./context/user";
import LogInPage from "./pages/LogInPage";
import { useState, useEffect } from "react";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import "./App.css";
import RewardsPage from "./pages/RewardsPage";

function App() {
    const [user, setUser] = useState({});
    const handleUser = (userData) => {
        setUser(userData);
    };

    /// Mouse Trailer code Down Below
    useEffect(() => {
        const trailer = document.getElementById("trailer") || document.getElementById("menu");
        const animateTrailer = (e, interacting) => {
            const x = e.clientX - trailer.offsetWidth / 2;
            const y = e.clientY - trailer.offsetHeight / 2;
            const keyframes = {
                transform: `translate(${x}px,${y}px) scale(${interacting ? 2 : 1})`,
            };

            trailer.animate(keyframes, { duration: 600, fill: "forwards" });
        };
        window.onmousemove = (e) => {
            const interactable = e.target.closest(".interactable");
            const interacting = interactable !== null;

            animateTrailer(e, interacting);
        };
        console.log("hello");
    }, []);

    return (
        <div className="app">
            <div id="trailer"></div>
            <UserContext.Provider value={user}>
                <div className="m-0 overflow-hidden">
                    <Header />
                </div>
                <section className=" h-1 bg-slate-700"></section>
                <div className="m-0 overflow-hidden">
                    <Route path="/">
                        <WelcomePage />
                    </Route>
                    <Route path="/workout">
                        <WorkoutPage />
                    </Route>
                    <Route path="/dietplan">
                        <DietPlanPage />
                    </Route>
                    <Route path="/fitnessplan">
                        <FitnessPlanPage />
                    </Route>
                    <Route path="/progress">
                        <ProgressPage />
                    </Route>
                    <Route path="/friends">
                        <FriendsPage />
                    </Route>
                    <Route path="/login">
                        <LogInPage handleChange={handleUser} />
                    </Route>
                    <Route path="/rewards">
                        <RewardsPage />
                    </Route>
                </div>
            </UserContext.Provider>
        </div>
    );
}

export default App;
