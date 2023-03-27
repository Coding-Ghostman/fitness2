import { Button } from "@mui/material";
import Link from "../link/Link";
import AccountMenu from "../menu/AccountMenu";
import { useState, useContext } from "react";
import UserContext from "../../context/user";
import BasicMenu from "../menu/BasicMenu";

function Header() {
    const value = useContext(UserContext);
    const userObject = JSON.parse(localStorage.getItem("userObject"));
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
            <Link className="interactable ml-6" to={`/`}>
                <div className="py-1">LOGO</div>
            </Link>
            <div className=" flex-row py-1 justify-center items-center hidden md:flex ">
                {renderedLinks}
                {Object.keys(userObject).length > 0 && (
                    <div className="interactable mr-6 -ml-2">
                        <AccountMenu />
                    </div>
                )}
                {Object.keys(userObject).length === 0 && (
                    <Link className="interactable mr-6" to="/login">
                        <Button sx={{ borderRadius: "20px", backgroundColor: "#E0E1DD", color: "black", fontWeight: "bold" }} variant="contained" size="medium" disableElevation>
                            Log In
                        </Button>
                    </Link>
                )}
            </div>
            <div className="md:hidden">
                <BasicMenu />
            </div>
        </div>
    );
}

export default Header;
