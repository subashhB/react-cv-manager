import React from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { ImPencil2 } from "react-icons/im";
import {
    PiChalkboardTeacherFill,
    PiEnvelopeSimple,
    PiExam,
} from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import logo from "../../../assets/logo.png";

const Sidebar = () => {
    const sidebarComponents = [
        { logo: <RxDashboard size={28} />, caption: "Dashboard" },
        { logo: <BsPersonFill size={28} />, caption: "Applicants" },
        { logo: <ImPencil2 size={20} />, caption: "Interview" },
        { logo: <PiChalkboardTeacherFill size={28} />, caption: "Interviewer" },
        { logo: <AiOutlineFolderOpen size={28} />, caption: "Template" },
        { logo: <PiExam size={28} />, caption: "Assessment Test" },
        { logo: <PiEnvelopeSimple size={28} />, caption: "Dashboard" },
    ];
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-white shadow-lg">
            <img src={logo} className="mt-2 ms-2" width={50} alt="logo" />
            {sidebarComponents.map((item, i) => (
                <SidebarIcon key={i} icon={item.logo} caption={item.caption} />
            ))}
        </div>
    );
};

const SidebarIcon = ({ icon, caption }) => (
    <div className="sidebar-icon group">
        {icon}{" "}
        <span className="sidebar-caption group-hover:scale-100">{caption}</span>
    </div>
);

export default Sidebar;
