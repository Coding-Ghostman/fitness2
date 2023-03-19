import { Button } from "@mui/material";
import Link from "./Link";
function Header() {
    const links = [
        { label: "Workout", path: "/workout" },
        { label: "Diet Plan", path: "/dietplan" },
        { label: "Fitness Plan", path: "/fitnessplan" },
        { label: "Progress", path: "/workout" },
        { label: "Friends", path: "/friends" },
    ];
    const renderedLinks = links.map((link) => {
        return (
            <Link activeClassName="" className="mr-5 hover:text-blue-300" key={link.label} to={link.path}>
                {link.label}
            </Link>
        );
    });

    return (
        <div style={{ backgroundColor: "#0e1b2b" }} className="relative flex w-full flex-wrap items-center justify-between py-3 text font-Rubik ">
            <div className="py-1">LOGO</div>
            <div className="py-1 ">
                {renderedLinks}
                <Link className="mr-6">
                    <Button sx={{ borderRadius: "20px", backgroundColor: "#E0E1DD", color: "black" }} variant="contained" size="medium" disableElevation>
                        Sign in
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Header;
