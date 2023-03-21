import { Button } from "@mui/material";
import Link from "../link/Link";
function Header() {
    const links = [
        { label: "Workout", path: "/workout" },
        { label: "Diet Plan", path: "/dietplan" },
        { label: "Fitness Plan", path: "/fitnessplan" },
        { label: "Progress", path: "/progress" },
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
            <Link className="ml-6" to={`/`}>
                <div className="py-1">LOGO</div>
            </Link>
            <div className="py-1">
                {renderedLinks}
                <Link className="mr-6" to="/signup">
                    <Button sx={{ borderRadius: "20px", backgroundColor: "#E0E1DD", color: "black", fontWeight: "bold" }} variant="contained" size="medium" disableElevation>
                        Sign up
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Header;
