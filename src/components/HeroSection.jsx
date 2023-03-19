import "./HeroSection.css";
import styles from "../style";
import backimage from "../images/Man.png";
import "./HeroSection.css";

function HeroSection() {
    return (
        <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
                        Powering Your Workout
                        <br className="sm:block" hidden />
                        With <span className="text-"> Artificial Intelligence </span>{" "}
                    </h1>
                </div>
            </div>
        </section>
    );
}
export default HeroSection;
