import { useState, useContext } from "react";
import DateContext from "../../context/date";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./Panel.css";

const style_box = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    fontWeight: "bold",
    borderRadius: 4,
    bgcolor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function DateSelect({ handleDate, updatedDate }) {
    const { date, setDate } = useContext(DateContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDateChange = (newDate) => {
        handleDate(newDate);
        setOpen(false);
    };

    // console.log(dayjs(date).format("dddd, MMMM D"));
    return (
        <div>
            <div className="lg:text-3xl lg:font-bold md:text-4xl md:font-[800] sm:text-3xl w-full text-white flex gap-4 mt-4 ml-8 ">
                <h2 className="cursor-default">Date: </h2>
                <span onClick={handleOpen} data-type="date" className="interactable cursor-pointer underline">
                    {dayjs(date).format("dddd, MMMM D")}
                </span>
            </div>
            <Modal className="" open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className="card overflow-y-hidden" sx={style_box}>
                    <Typography sx = {{fontWeight:"bold", fontFamily:"Rubik"}} color="black" id="modal-modal-title" variant="h4" component="h2">
                        Choose any day
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            sx={{}}
                            defaultValue={date}
                            placeholder="MM/DD/YYYY"
                            format={"MM/DD/YYYY"}
                            value={date}
                            view="day"
                            onAccept={handleDateChange}
                            onChange={(newDate) => {
                                setDate(newDate);
                            }}
                            onClose={handleClose}
                            orientation="portrait"
                        />
                    </LocalizationProvider>
                </Box>
            </Modal>
        </div>
    );
}
export default DateSelect;
