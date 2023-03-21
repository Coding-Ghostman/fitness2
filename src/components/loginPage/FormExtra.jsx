import { Checkbox } from "@mui/material";
export default function FormExtra() {
    return (
        <div className="flex items-center justify-between ">
            <div className="flex items-center mr-44">
                {/* <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-purple-400 focus:ring-purple-500 border-gray-300 rounded" /> */}
                <Checkbox id="remember-me" name="remember-me" color="secondary" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                    Remember me
                </label>
            </div>

            <div className="text-sm">
                <a href="/" className="font-medium text-purple-400 hover:text-purple-500">
                    Forgot your password?
                </a>
            </div>
        </div>
    );
}
