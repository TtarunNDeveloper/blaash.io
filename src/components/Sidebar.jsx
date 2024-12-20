import { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaRegChartBar, FaShoppingBag, FaRegListAlt, FaVideo, FaStream, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import logo from "../assets/logo.png";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-full">
      <button onClick={toggleSidebar} className="absolute top-4 -right-4 bg-white text-gray-800 rounded-full p-2 focus:outline-none z-10">
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
      <nav className={`w-${isOpen ? "60" : "20"} ml-4 mt-2 h-full bg-gray-800 text-white p-4 rounded-xl flex flex-col items-center transition-width duration-300`}>
        <img src={logo} alt="LOGO" className={`h-12 mb-6 ${isOpen ? "block" : "hidden"}`} />
        <ul className={`space-y-4 w-full ${isOpen ? "block" : "hidden"}`}>
          <li className="flex items-center">
            <FaRegChartBar className="mr-2" /> Revenue
          </li>
          <li className="flex items-center">
            <FaShoppingBag className="mr-2" /> Shoppable Video <FaChevronDown className="ml-8" />
          </li>
          <li className="flex items-center">
            <FaRegListAlt className="mr-2" /> Story 
          </li>
          <li className="flex items-center">
            <FaVideo className="mr-2" /> Live Commerce <FaChevronDown className="ml-11"/>
          </li>
          <li className="flex flex-col">
            <div className="flex items-center">
              <FaStream className="mr-2" /> Playlist Manager <FaChevronDown className="ml-9" />
            </div>
            <ul className="ml-8 mt-2 space-y-2 text-sm">
              <li>Product playlist</li>
            </ul>
          </li>
          <li className="flex items-center">
            <FaRegListAlt className="mr-2" /> One Click Post
          </li>
          <li className="flex items-center">
            <FaCalendarAlt className="mr-2" /> Calendar
          </li>
          <li className="flex items-center">
            <FaUserFriends className="mr-2" /> Hire Influencer
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
