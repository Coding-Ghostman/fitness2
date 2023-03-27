import { IconButton, Button } from "@mui/material";
import Link from "../link/Link";
import AccountMenu from "../menu/AccountMenu";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/user";
import menu from "../../assets/main-menu.png";
import BasicMenu from "../menu/BasicMenu";
import Menu from "../menu/Menu";

function Header() {
    const value = useContext(UserContext);
    const [userObject, setUserObject] = useState({});

    useEffect(() => {
        setUserObject(JSON.parse(localStorage.getItem("userObject")));
    }, [localStorage.getItem("userObject")]);

    console.log(userObject);
    const links = [
        { label: "Workout", path: "/workout" },
        { label: "Diet Plan", path: "/dietplan" },
        { label: "Fitness Plan", path: "/fitnessplan" },
        { label: "Progress", path: "/progress" },
        { label: "Friends", path: "/friends" },
    ];
    const renderedLinks = links.map((link) => {
        return (
            <div className="interactable">
                <Link activeClassName="" className="mr-9 mt-1 hover:text-blue-300" key={link.label} to={link.path}>
                    {link.label}
                </Link>
            </div>
        );
    });

    return (
        <div style={{ backgroundColor: "#0e1b2b" }} className="relative flex w-full flex-wrap items-center justify-between py-3 font-Rubik ">
            <Link className="ml-6" to={`/`}>
                <div className="py-1 interactable">LOGO</div>
            </Link>
            <div className=" flex-row py-1 justify-center items-center hidden md:flex ">
                {renderedLinks}
                {userObject && (
                    <div className="interactable mr-6 -ml-2">
                        <AccountMenu handleUserObject={setUserObject} />
                    </div>
                )}
                {!userObject && (
                    <Link className="interactable mr-6" to="/login">
                        <Button sx={{ borderRadius: "20px", backgroundColor: "#E0E1DD", color: "black", fontWeight: "bold" }} variant="contained" size="medium" disableElevation>
                            Log In
                        </Button>
                    </Link>
                )}
            </div>
            <div className="md:hidden interactable">
                <IconButton variant="text " disableRipple>
                    <BasicMenu />
                </IconButton>
            </div>
        </div>
    );
}

export default Header;
