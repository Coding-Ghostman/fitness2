import Header from "./components/Header/Header";
import WelcomePage from "./pages/WelcomePage";
import Route from "./components/route/Route";
import DietPlanPage from "./pages/DietPlanPage";
import WorkoutPage from "./pages/WorkoutPage";
import FitnessPlanPage from "./pages/FitnessPlanPage";
import ProgressPage from "./pages/ProgressPage";
import FriendsPage from "./pages/FriendsPage";
import SignUpPage from "./pages/SignUpPage";
// import styles from "./style";
import LogInPage from "./pages/LogInPage";

function App() {
    return (
        <div>
            <Header />
            <section className="h-1 bg-slate-700"></section>
            <div>
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
                <Route path="/signup">
                    <SignUpPage />
                </Route>
                <Route path="/login">
                    <LogInPage />
                </Route>
            </div>
        </div>
    );
}

export default App;
