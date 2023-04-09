import { useContext } from "react";
import DateSelect from "../components/Planner/DateSelect";
import NavigateDateLeft from "../components/Planner/NavigateDateLeft";
import NavigateDateRight from "../components/Planner/NavigateDateRight";
import DateContext from "../context/date";
import dayjs from "dayjs";

function ProgressPage() {
    const { date, setDate } = useContext(DateContext);
    console.log(date);
    const handleNextDay = () => {
        const nextDay = dayjs(date).add(1, "day");
        setDate(nextDay);
    };

    // function to handle going to the previous day
    const handlePrevDay = () => {
        const prevDay = dayjs(date).subtract(1, "day");
        setDate(prevDay);
    };
    return (
        <div className="m-0 overflow-auto bg-gradient h-screen">
            <div className="rounded-full flex flex-row items-center justify-evenly ml-12 mr-12 h-[80px] shadow_navigator  mt-6 gap-[20rem]">
                <div className="-mt-2">
                    <NavigateDateLeft handlePrev={handlePrevDay} />
                </div>
                <div className="">
                    <DateSelect updatedDate={date} handleDate={setDate} />
                </div>
                <div className="-mt-2">
                    <NavigateDateRight handleNext={handleNextDay} />
                </div>
            </div>
        </div>
    );
}

export default ProgressPage;
