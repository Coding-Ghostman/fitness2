import "./HeroSection.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import man from "../images/Man.png";
import woman from "../images/woman.png";

function HeroSection() {
    return (
        // <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        //     <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        //         <div className="flex flex-row justify-between items-center w-full">
        //             <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
        //                 Powering Your Workout
        //                 <br className="sm:block" />
        //                 With <span className="text-gradient"> Artificial Intelligence </span>{" "}
        //             </h1>
        //             <div className="ss:flex md:mr-4 mr-0">
        //                 <GetStarted />
        //             </div>
        //         </div>
        //         <p className={`${styles.paragraph} max-w-[470px] mt-5`}>Fuel the future of workout with the application of 3d motion tracking software.</p>
        //     </div>
        //     <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        //         <img alt="man" src={man} className="w-[100%] h-[100%] relative z-[5]" />

        //         <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        //         <div className="absolute z-[1] w-[60%] h-[60%] rounded-full top-0 white__gradient" />
        //         <div className="absolute z-[0] w-[40%] h-[35%] top-0 blue__gradient" />
        //     </div>
        //     {/* <div className={`ss:hidden ${styles.flexCenter}`}>
        //         <GetStarted />
        //     </div> */}
        // </section>
        <section className="bg-slate-700 h-screen w-screen ">
            <div className="">
                <div>
                    <h1>POWERING YOUR WORKOUT WITH AI</h1>
                    <p>Fuel the future of workout with the application Of 3d motion tracking software.</p>
                    <div>
                        <button>Try Now</button>
                        <button>Learn More </button> <RiArrowDropDownLine />
                    </div>
                </div>
                <div>
                    <img alt="woman" src={woman} />
                </div>
                <div>
                    <img alt="man" src={man} />
                </div>
            </div>
        </section>
    );
}
export default HeroSection;
