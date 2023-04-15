import Header from "./components/Header/Header";
import WelcomePage from "./pages/WelcomePage";
import Route from "./components/route/Route";
import DietPlanPage from "./pages/DietPlanPage";
import WorkoutPage from "./pages/WorkoutPage";
import FitnessPlanPage from "./pages/FitnessPlanPage";
import ProgressPage from "./pages/ProgressPage";
import FriendsPage from "./pages/FriendsPage";
import Workout from "./pages/Workout";
import SignInAnimation from "./components/Animation/NotSIgnInAnimation";
import Yoga from "./pages/Yoga";
import ResetFirebase from "./components/loginPage/ResetFirebase";
import RegisterFirebase from "./components/loginPage/RegisterFirebase";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import RewardsPage from "./pages/RewardsPage";
import { AuthContext } from "./components/auth/auth";
import Trailer from "./components/Trailer/Trailer";
import DateContext from "./context/date";
import dayjs from "dayjs";
import HomePage from "./pages/Homepage";
import Loading from "./components/Animation/Loading";
import LogInPage from "./pages/LogInPage";

const MEALS = [
    { id: "1", name: "Breakfast", time: "08:30 AM" },
    { id: "2", name: "Lunch", time: "12:30 PM" },
    { id: "3", name: "Snacks", time: "4:30 PM" },
    { id: "4", name: "Dinner", time: "8:30 PM" },
];

function App() {
    const { currentUser } = useContext(AuthContext);
    const [date, setDate] = useState(dayjs());
    const [scrollTop, setScrollTop] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 6000); // Simulating a 3 second loading time
    }, []);

    return (
        <div className="app scrollbar overflow-y-auto ">
            <Trailer />
            {loading ? (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[1000]">
                    <Loading />
                </div>
            ) : null}
            <div className="z-[1]">
                <div className="z-[1]">
                    <div className="m-0 z-10 overflow-hidden">
                        <Header scrollTop={scrollTop} />
                    </div>
                    <section className="h-1 z-10 bg-slate-700"></section>
                    <DateContext.Provider value={{ date, setDate, MEALS }}>
                        <Route path="/workout">
                            <WorkoutPage />
                        </Route>
                        <Route path="/">
                            {/* <WelcomePage /> */}
                            <HomePage setScrollTop={setScrollTop} />
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

                        <Route path="/rewards">
                            <RewardsPage />
                        </Route>
                        <Route path="/yoga">
                            <Yoga />
                        </Route>
                        <Route path="/fitness">
                            <Workout />
                        </Route>
                        <Route path="/login">
                            <LogInPage />
                        </Route>
                        <Route path="/reset">
                            <ResetFirebase />
                        </Route>
                        <Route path="/register">
                            <RegisterFirebase />
                        </Route>
                    </DateContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default App;
