import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
// import { Button } from "./Button";
import { Button } from "@mui/material";
export function Header() {
  return (
    <div className="p-2 md:p-5 md:px-10 flex flex-row justify-between items-center">
      <Link to="/">
        <div className="flex flex-row gap-1 md:gap-3 items-center cursor-pointer">
          <img src={Logo} alt="logo" className="h-10 w-10 " />
          <h1 className=" md:text-xl cursor-pointer font-bold">UnplashBox</h1>
        </div>
      </Link>

      <div className="flex flex-row gap-3 items-center">
        <Link to="/">
          <Button
            variant="text"
            className="text-[#6C727F] px-5 font-bold hover:text-[#121826] hover:bg-[#E5E7EBCC]  font-bevnpro"
          >
            Home
          </Button>
        </Link>
        <Link to="/collections">
          <Button
            variant="text"
            className="text-[#6C727F] px-5 font-bold hover:text-[#121826] hover:bg-[#E5E7EBCC]  font-bevnpro"
          >
            Collection
          </Button>
        </Link>
      </div>
    </div>
  );
}
