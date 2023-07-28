import React from "react";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
    const username = "User name";
    return (
        <div className=" flex ms-36  min-w-[1200px] rounded-md bg-white px-5 py-3 shadow-lg">
            <div className="ms-auto flex">
                <div className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl bg-white text-gray-900 transition-all duration-300 ease-linear hover:bg-secondary">
                    <AiOutlineBell size={22} />
                </div>
                <div className="m-2 flex items-center font-bold">
                    Hello, {username}
                </div>
                <div className="relative flex h-12 w-12  cursor-pointer items-center justify-center rounded-3xl bg-secondary text-gray-900 transition-all duration-300 ease-linear hover:bg-primary hover:text-white">
                    <AiOutlineUser size={22} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
