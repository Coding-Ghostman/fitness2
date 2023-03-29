import Header from "../components/ProgressPage/Header";
import { useState } from "react";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import "./Page.css";

const theme = createTheme({
    palette: {
        neutral: {
            main: "#0D1B2A",
        },
        white: {
            main: "#0D1B2A",
            text: "#fff",
        },
    },
});

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

const style_floating = {
    "&:hover": {
        background: "#2f4264",
    },
};

function ProgressPage() {
    const [date, setDate] = useState(dayjs());
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDateChange = (newDate) => {
        setDate(newDate);
        setOpen(false);
    };
    console.log(date.$d);

    return (
        <div className="m-0 overflow-auto bg-gradient h-screen">
            <div className=" block m-auto rounded-lg mt-6 h-[96%] w-[95%] justify-center items-center card-gradient shadow-xl">
                <div className="card-right">
                    <Header />
                    <Modal className="" open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box className="card overflow-y-hidden" sx={style_box}>
                            <Typography color="black" id="modal-modal-title" variant="h4" component="h2">
                                Choose any day
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StaticDatePicker
                                    defaultValue={date}
                                    placeholder="MM/DD/YYYY"
                                    format={"MM/DD/YYYY"}
                                    value={date}
                                    view="day"
                                    onAccept={handleDateChange}
                                    onChange={(newDate) => {
                                        setDate(newDate);
                                    }}
                                    orientation="landscape"
                                    disableFuture
                                />
                            </LocalizationProvider>
                        </Box>
                    </Modal>
                    <div>
                        <ThemeProvider theme={theme}>
                            <Fab size="large" sx={style_floating} onClick={handleOpen} className="interactable block left-6" aria-label="add">
                                <TodayRoundedIcon fontSize="large" />
                            </Fab>
                        </ThemeProvider>
                    </div>
                </div>
                <div className="block text-2xl font-bold lg:text-3xl lg:font-extrabold sm:text-xl md:text-2xl text-white py-6 px-6 w-[90%]">Breakfast</div>
                <div className="block m-auto rounded-lg h-[20%] w-[95%] justify-center items-center shadow-xl border">
                    <h3 className="interactable block text-2xl font-bold lg:text-3xl lg:font-extrabold sm:text-xl md:text-2xl text-white py-6 px-6 w-[90%] cursor-pointer">Enter your items</h3>
                </div>
            </div>
        </div>
    );
}

export default ProgressPage;
