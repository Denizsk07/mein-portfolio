import React from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="container mx-auto text-center px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex space-x-8">
            <a
              href="mailto:deniz20070206@gmail.com"
              className="text-gray-400 hover:text-neon-green transition-all duration-300 transform hover:scale-110 font-mono"
            >
              deniz20070206@gmail.com
            </a>
            <a
              href="https://www.tiktok.com/@deniz.sk07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
            >
              <FaTiktok size={24} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCET7SLUDY3Auhdb79ZddiIQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://www.instagram.com/deniz.sk07?igsh=MW1wb2loeDl5dWFlOQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-500 transition-all duration-300 transform hover:scale-110"
            >
              <FaInstagram size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Deniz Kaya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
