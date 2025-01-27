import React from "react";
import {
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="w-full h-20 bg-white bg-opacity-10 backdrop-blur-md shadow-md flex items-center justify-between px-6 mb-6">
      <h1 className="text-xl font-semibold text-white">
        Carlano Database Verwaltung
      </h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <BellIcon className="h-6 w-6 text-white cursor-pointer" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
            3
          </span>
        </div>

        <div className="relative group">
          <UserCircleIcon className="h-7 w-7 text-white cursor-pointer" />
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-lg hidden group-hover:block">
            <ul className="p-2 space-y-2">
              <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">
                Profil
              </li>
              <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">
                Einstellungen
              </li>
              <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">
                Abmelden
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
