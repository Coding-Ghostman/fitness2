import { useContext, useEffect } from "react";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import sunset from "../../assets/sunset.png";
import DateContext from "../../context/date";
import "./ReportCard.css";

function ReportCard({ meals, items }) {
    useEffect(() => {
        document.getElementById("cards").onmousemove = (e) => {
            for (const card of document.getElementsByClassName("card")) {
                const rect = card.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        };
    }, []);

    const RenderedItems = items.map((item) => {
        return <div>{item.WorkoutName}</div>;
    });
    
    // console.log(items);
    const RenderedCards = meals.map((item) => {
        return (
            <div className="card ">
                <div className="card-content">
                    <div className="card-image">
                        {item.id === "1" ? (
                            <WbTwilightRoundedIcon fontSize="large" className="scale-[2.5]" sx={{ color: "white" }} />
                        ) : item.id === "2" ? (
                            <WbSunnyRoundedIcon fontSize="large" className="scale-[2.5]" sx={{ color: "white" }} />
                        ) : item.id === "3" ? (
                            <img className="scale-[0.33]" alt="" src={sunset} />
                        ) : (
                            <DarkModeRoundedIcon fontSize="large" className="scale-[2.5]" sx={{ color: "white" }} />
                        )}
                    </div>
                    <div className="card-info-wrapper">
                        <div className="card-info">
                            <div className="card-info-title">
                                <h3>{item.name}</h3>
                                <h4>{RenderedItems}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div id="cards" className="flex justify-center items-center">
            {RenderedCards}
        </div>
    );
}
export default ReportCard;
