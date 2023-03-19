import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import styles from "./style";
function App() {
    return (
        <div>
            <Header />
            <div style={{ "background-image": "linear-gradient(to bottom, #0e1b2b , #1b263a )" }} className={`${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <HeroSection />
                </div>
            </div>
        </div>
    );
}

export default App;
