import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
    TruckIcon,
    WrenchIcon,
    LinkIcon,
    UserIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,

} from "@heroicons/react/24/outline";
import { FolderAddFilled, LogoutOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const menuItems = [
    { name: "Startseite", icon: HomeIcon, path: "/" }, 
    { name: "Personenwagen", icon: TruckIcon, path: "/personenwagen" }, 
    { name: "Wohnmobile", icon: TruckIcon, path: "/wohnmobile" }, 
    { name: "Nutzfahrzeuge", icon: WrenchIcon, path: "/nutzfahrzeuge" }, 
    { name: "Lastwagen", icon: TruckIcon, path: "/lastwagen" }, 
    { name: "Anhänger", icon: LinkIcon, path: "/anhaenger", badge: 2 }, 
    { name: "Motorrad", icon: UserIcon, path: "/motorrad" }, 
    { name: "Einstellungen", icon: Cog6ToothIcon, path: "/einstellungen" }, 
  ];

  return (
    <div
      className={`h-screen bg-gradient-to-b from-[#0A2540] to-[#1F2937] text-white ${
        isMinimized ? "w-20" : "w-64"
      } transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between">
        <img
          src="/assets/carlano.svg"
          alt="Logo"
          className={`h-20 transition-all duration-300 ${
            isMinimized && "mx-auto"
          }`}
        />
      </div>

      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="group">
              <Link
                to={item.path}
                className="flex items-center p-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-blue-600"
              >
                <item.icon className="h-6 w-6" />
                {!isMinimized && (
                  <span className="ml-4 font-medium">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <button
        className="m-5 flex gap-2 items-center"
        onClick={()=>{
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        ><LogoutOutlined />Logout</button>
      </nav>

      <div className="p-4">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-all"
        >
          <ArrowLeftIcon
            className={`h-6 w-6 transform ${
              isMinimized ? "rotate-180" : ""
            } transition-transform`}
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
