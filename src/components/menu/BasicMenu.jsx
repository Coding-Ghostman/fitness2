import Modal from "@mui/material/Modal";
import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import Fingerprint from "@mui/icons-material/Fingerprint";

const style_box = {
    position: "absolute",
    left: "100%",
    top: "50%",
    transform: "translate(-50%, -39%)",
    width: 1000,
    height: 1000,
    fontWeight: "bold",
    background: "linear-gradient(to top , transparent, #2f4264)",
    borderRadius: "60%",
    boxShadow: 24,
    p: 4,
};
const style_floating = {
    "&:hover": {
        background: "#2f4264",
    },
};

function BasicMenu() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal className="" open={open} onClose={handleClose}>
                <Box className="card overflow-y-hidden" sx={style_box}></Box>
            </Modal>
            <IconButton onClick={handleOpen} aria-label="fingerprint" color="secondary">
                <Fingerprint />
            </IconButton>
        </div>
    );
}
export default BasicMenu;
