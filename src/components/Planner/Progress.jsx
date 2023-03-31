import morning from "../../assets/morning.png";
import calorie from "../../assets/calorie.png";
import "./Panel.css";

function Progress() {
    return (
        <div className="lg:text-4xl lg:font-bold md:text-3xl sm:font-[600] md:font-[800] sm:text-3xl text-2xl w-full text-white flex flex-col gap-4 mt-20 ml-8 lg:ml-12 ">
            <div>
                <p className="cursor-default">Progress Report</p>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 w-[80%]">
                    <div className="flex bg_panel items-center justify-center rounded-[50%] mt-2 h-12 w-12">
                        <img className="-mt-4 w-10 h-10" alt="" src={morning} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-2xl">BreakFast</p>
                        <p className="text-lg">08:00 AM</p>
                    </div>
                    <div className="flex flex-row justify-center items-center ml-auto mt-1">
                        <p className="text-2xl ">223 Kcal</p>
                        <img className="w-8 h-8" alt="" src={calorie} />
                    </div>
                </div>
                <div className="flex flex-row gap-4 w-[80%]">
                    <div className="flex bg_panel items-center justify-center rounded-[50%] mt-2 h-12 w-12">
                        <img className="-mt-4 w-10 h-10" alt="" src={morning} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-2xl">BreakFast</p>
                        <p className="text-lg">08:00 AM</p>
                    </div>
                    <div className="flex flex-row justify-center items-center ml-auto mt-1">
                        <p className="text-2xl ">223 Kcal</p>
                        <img className="w-8 h-8" alt="" src={calorie} />
                    </div>
                </div>
                <div className="flex flex-row gap-4 w-[80%]">
                    <div className="flex bg_panel items-center justify-center rounded-[50%] mt-2 h-12 w-12">
                        <img className="-mt-4 w-10 h-10" alt="" src={morning} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-2xl">BreakFast</p>
                        <p className="text-lg">08:00 AM</p>
                    </div>
                    <div className="flex flex-row justify-center items-center ml-auto mt-1">
                        <p className="text-2xl ">223 Kcal</p>
                        <img className="w-8 h-8" alt="" src={calorie} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Progress;
