import React from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { ImPencil2 } from "react-icons/im";
import {
    PiChalkboardTeacherFill,
    PiEnvelopeSimple,
    PiExam,
    PiSuitcaseSimpleLight,
} from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Sidebar = () => {
    const sidebarComponents = SidebarComponents();
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-white shadow-lg">
            <img src={logo} className="mt-2 ms-2" width={50} alt="logo" />
            {sidebarComponents.map((item, i) => (
                <SidebarIcon
                    key={i}
                    icon={item.logo}
                    caption={item.caption}
                    link={item.link}
                />
            ))}
            <hr className="shadow-lg mt-5" />
        </div>
    );
};

const SidebarComponents = () => {
    const sidebarComponents = [
        {
            logo: <RxDashboard size={28} />,
            caption: "Dashboard",
            link: "/",
        },
        {
            logo: <BsFillPeopleFill size={22} />,
            caption: "Applicants",
            link: "/applicants",
        },
        {
            logo: <PiSuitcaseSimpleLight size={28} />,
            caption: "Jobs",
            link: "/jobs",
        },
        {
            logo: <ImPencil2 size={20} />,
            caption: "Interview",
            link: "/interview",
        },
        {
            logo: <PiChalkboardTeacherFill size={28} />,
            caption: "Interviewer",
            link: "/interviewer",
        },
        {
            logo: <PiExam size={28} />,
            caption: "Assessment Test",
            link: "/assessmentTest",
        },
        {
            logo: <AiOutlineFolderOpen size={28} />,
            caption: "Template",
            link: "/template",
        },
        {
            logo: <PiEnvelopeSimple size={28} />,
            caption: "Offer Letter",
            link: "/offerLetter",
        },
    ];
    return sidebarComponents;
};

const SidebarIcon = ({ icon, caption, link }) => (
    <Link to={link}>
        <div className="sidebar-icon group">
            {icon}{" "}
            <span className="sidebar-caption group-hover:scale-100">
                {caption}
            </span>
        </div>
    </Link>
);

export default Sidebar;
