import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from '../../utils/Postlyze.png'

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <div className="">
        <img 
          src={LogoIcon} 
          alt="Logo" 
          className="w-10 h-10" // Adjust sizing as needed
        />
      </div>
      <span className="text-white font-bold text-lg sm:text-xl">POSTLYZE</span>
    </Link>
  );
};
