import Header from "./components/Header/Header";
import WelcomePage from "./pages/WelcomePage";
import Route from "./components/route/Route";
import DietPlanPage from "./pages/DietPlanPage";
import WorkoutPage from "./pages/WorkoutPage";
import FitnessPlanPage from "./pages/FitnessPlanPage";
import ProgressPage from "./pages/ProgressPage";
import FriendsPage from "./pages/FriendsPage";
import Workout from "./pages/Workout";
import BackAnimation from "./components/Animation/BackAnimation";
import Yoga from "./pages/Yoga";
import LoginFirebase from "./components/loginPage/LoginFirebase";
import ResetFirebase from "./components/loginPage/ResetFirebase";
import RegisterFirebase from "./components/loginPage/RegisterFirebase";
import { useEffect } from "react";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import "./App.css";
import RewardsPage from "./pages/RewardsPage";
import { AuthProvider } from "./components/auth/auth";

function App() {
    /// Mouse Trailer code Down Below

    useEffect(() => {
        const trailer = document.getElementById("trailer");
        const animateTrailer = (e, interacting) => {
            const x = e.clientX - trailer.offsetWidth / 2;
            const y = e.clientY - trailer.offsetHeight / 2;
            const keyframes = {
                transform: `translate(${x}px,${y}px) scale(${
                    trailer.dataset.type === "date" ||
                    trailer.dataset.type === "left" ||
                    trailer.dataset.type === "right" ||
                    trailer.dataset.type === "Yoga" ||
                    trailer.dataset.type === "Workout" ||
                    trailer.dataset.type === "back"
                        ? 3
                        : interacting
                        ? 2
                        : 1
                })`,
            };
            trailer.animate(keyframes, { duration: 600, fill: "forwards" });
        };
        window.onmousemove = (e) => {
            const interactable = e.target.closest(".interactable");
            const interacting = interactable !== null;

            const icon_left = document.getElementById("trailer-icon-left");
            const icon_right = document.getElementById("trailer-icon-right");
            const icon_calendar = document.getElementById("trailer-icon-calendar");
            const icon_yoga = document.getElementById("yoga");
            const icon_workout = document.getElementById("workout");
            const icon_back = document.getElementById("back");
            // const icon_account = document.getElementById("account");
            animateTrailer(e, interacting);

            trailer.dataset.type = interacting ? interactable.dataset.type : "";

            if (trailer.dataset.type === "date") {
                icon_calendar.style.opacity = "1";
                icon_calendar.style.transition = "opacity 300ms ease";
                trailer.style.backgroundColor = "#e8ebee";
            } else if (trailer.dataset.type === "left") {
                icon_left.style.opacity = "1";
                icon_left.style.transition = "opacity 300ms ease";
                trailer.style.backgroundColor = "#e8ebee";
            } else if (trailer.dataset.type === "right") {
                icon_right.style.opacity = "1";
                icon_right.style.transition = "opacity 300ms ease";
                trailer.style.backgroundColor = "#e8ebee";
            } else if (trailer.dataset.type === "Yoga") {
                icon_yoga.style.opacity = "1";
                icon_workout.style.opacity = "0";
                icon_back.style.opacity = "0";
                icon_yoga.style.transition = "opacity 300ms ease";
                trailer.style.backgroundColor = "#e8ebee";
            } else if (trailer.dataset.type === "Workout") {
                icon_workout.style.opacity = "1";
                icon_back.style.opacity = "0";
                icon_yoga.style.opacity = "0";
                icon_workout.style.transition = "opacity 300ms ease";
                trailer.style.backgroundColor = "#e8ebee";
            } else if (trailer.dataset.type === "back") {
                icon_back.style.opacity = "1";
                icon_yoga.style.opacity = "0";
                icon_workout.style.opacity = "0";
                icon_back.style.transition = "opacity 300ms ease";
                trailer.style.backgroundColor = "#e8ebee";
            } else {
                icon_left.style.opacity = "0";
                icon_right.style.opacity = "0";
                icon_calendar.style.opacity = "0";
                icon_yoga.style.opacity = "0";
                icon_workout.style.opacity = "0";
                icon_back.style.opacity = "0";
                // icon_account.style.opacity = "0";
                trailer.style.backgroundColor = "transparent";
            }
        };
    }, []);

    return (
        <div className="app scrollbar">
            <div className="hidden md:block" id="trailer">
                <div className="scale-50">
                    <CalendarTodayRoundedIcon className="absolute top-[7px] -left-[1px] opacity-0" id="trailer-icon-calendar" fontSize="small" sx={{ color: "#0e1b2b" }} />
                    <ChevronLeftRoundedIcon className="absolute -left-[9px] opacity-0" id="trailer-icon-left" fontSize="large" sx={{ color: "#0e1b2b" }} />
                    <ChevronRightRoundedIcon className="absolute -left-[9px] opacity-0" id="trailer-icon-right" fontSize="large" sx={{ color: "#0e1b2b" }} />
                    <SelfImprovementIcon className="absolute -left-[9px] opacity-0" id="yoga" fontSize="large" sx={{ color: "#0e1b2b" }} />
                    <FitnessCenterIcon className="absolute -left-[9px] opacity-0" id="workout" fontSize="large" sx={{ color: "#0e1b2b" }} />
                    <div className="absolute w-8 -right-2 opacity-0" id="back">
                        <BackAnimation />
                    </div>
                </div>
            </div>
            <AuthProvider>
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
                        {/* <LogInPage handleChange={handleUser} /> */}
                        <LoginFirebase />
                    </Route>
                    <Route path="/reset">
                        <ResetFirebase />
                    </Route>
                    <Route path="/register">
                        <RegisterFirebase />
                    </Route>
                    <Route path="/rewards">
                        <RewardsPage />
                    </Route>
                    <Route path="/yoga">
                        <Yoga />
                    </Route>
                    <Route path="/fitness">
                        <Workout />
                    </Route>
                </div>
            </AuthProvider>
        </div>
    );
}

export default App;
