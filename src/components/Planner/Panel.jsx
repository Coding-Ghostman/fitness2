import DateSelect from "./DateSelect";
import { useState, useContext } from "react";
import DateContext from "../../context/date";
import dayjs from "dayjs";
import "./Panel.css";
import NavigateDate from "./NavigateDate";
import Progress from "./Progress";

function Panel() {
    const { date, setDate } = useContext(DateContext);
    // function to handle going to the next day
    const handleNextDay = () => {
        const nextDay = dayjs(date).add(1, "day");
        setDate(nextDay);
    };

    // function to handle going to the previous day
    const handlePrevDay = () => {
        const prevDay = dayjs(date).subtract(1, "day");
        setDate(prevDay);
    };

    // console.log(dayjs(date).add(1, "day"));
    return (
        <div className="relative bg_panel">
            <div className="xl:w-[35vw] lg:w-[40vw] sm:w-[50vw] w-[100vw] h-[100vh] float-right bg-slate-700 overflow-y-auto overflow-x-hidden z-10 box__shadow rounded-xl ">
                <div className="flex">
                    <div className="-ml-4">
                        <DateSelect updatedDate={date} handleDate={setDate} />
                    </div>
                    <div className="ml-auto mr-10 mt-9">
                        <NavigateDate handlePrev={handlePrevDay} handleNext={handleNextDay} />
                    </div>
                </div>
                <div>
                    <Progress />
                </div>
            </div>
        </div>
    );
}

export default Panel;
