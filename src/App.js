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
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import "./App.css";
import RewardsPage from "./pages/RewardsPage";

function App() {
    const [user, setUser] = useState({});
    const handleUser = (userData) => {
        setUser(userData);
    };

    /// Mouse Trailer code Down Below

    useEffect(() => {
        const trailer = document.getElementById("trailer");
        const animateTrailer = (e, interacting) => {
            const x = e.clientX - trailer.offsetWidth / 2;
            const y = e.clientY - trailer.offsetHeight / 2;
            const keyframes = {
                transform: `translate(${x}px,${y}px) scale(${trailer.dataset.type === "date" || trailer.dataset.type === "left" || trailer.dataset.type === "right" ? 3 : interacting ? 2 : 1})`,
            };

            trailer.animate(keyframes, { duration: 600, fill: "forwards" });
        };
        window.onmousemove = (e) => {
            const interactable = e.target.closest(".interactable");
            const interacting = interactable !== null;
            const icon_left = document.getElementById("trailer-icon-left");
            const icon_right = document.getElementById("trailer-icon-right");
            const icon_calendar = document.getElementById("trailer-icon-calendar");
            animateTrailer(e, interacting);

            trailer.dataset.type = interacting ? interactable.dataset.type : "";

            if (trailer.dataset.type === "date") {
                icon_calendar.style.opacity = "1";
                icon_calendar.style.transition = "opacity 300ms ease";
                icon_left.style.opacity = "0";
                icon_right.style.opacity = "0";

                trailer.style.backgroundColor = "#e8ebee";
            } else if (trailer.dataset.type === "left") {
                icon_left.style.opacity = "1";
                icon_left.style.transition = "opacity 300ms ease";
                icon_calendar.style.opacity = "0";
                icon_right.style.opacity = "0";
                trailer.style.backgroundColor = "#e8ebee";
            } else if (trailer.dataset.type === "right") {
                icon_right.style.opacity = "1";
                icon_right.style.transition = "opacity 300ms ease";
                icon_calendar.style.opacity = "0";
                icon_left.style.opacity = "0";
                trailer.style.backgroundColor = "#e8ebee";
            } else {
                icon_left.style.opacity = "0";
                icon_right.style.opacity = "0";
                icon_calendar.style.opacity = "0";
                trailer.style.backgroundColor = "transparent";
            }
        };
    }, []);

    return (
        <div className="app">
            <div className="hidden md:block" id="trailer">
                <div className="scale-50">
                    <CalendarTodayRoundedIcon className="absolute top-[6px] -left-[2px]" id="trailer-icon-calendar" fontSize="small" sx={{ color: "#0e1b2b" }} />
                    <ChevronLeftRoundedIcon className="absolute -left-[9px]" id="trailer-icon-left" fontSize="large" sx={{ color: "#0e1b2b" }} />
                    <ChevronRightRoundedIcon className="absolute -left-[9px]" id="trailer-icon-right" fontSize="large" sx={{ color: "#0e1b2b" }} />
                </div>
            </div>
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
