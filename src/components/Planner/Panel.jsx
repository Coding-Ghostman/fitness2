import DateSelect from "./DateSelect";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useState, useContext } from "react";
import DateContext from "../../context/date";
import dayjs from "dayjs";
import "./Panel.css";

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
            <div className="top-1 right-10 md:w-[550px] sm:w-[350px] w-[100vw] h-[91.5vh] float-right bg-slate-700 overflow-y-auto overflow-x-hidden z-10 box__shadow rounded-xl ">
                <div>
                    <DateSelect updatedDate={date} handleDate={setDate} />
                </div>
                <div className="flex flex-row justify-center items-center gap-6 mt-2">
                    <IconButton data-type="left" onClick={handlePrevDay} className="interactable scale-[1.5]" sx={{ color: "#fff" }}>
                        <ChevronLeftRoundedIcon />
                    </IconButton>
                    <IconButton data-type="right" onClick={handleNextDay} className="interactable scale-[1.5]" sx={{ color: "#fff" }}>
                        <ChevronRightRoundedIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default Panel;
