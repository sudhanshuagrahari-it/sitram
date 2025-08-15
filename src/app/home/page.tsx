"use client";

import React, { useState } from "react";
import "./home-custom.css";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaBookOpen, FaGift, FaCamera, FaChalkboardTeacher, FaPrayingHands, FaShoppingBasket, FaDonate, FaListAlt } from "react-icons/fa";
import { GiPrayerBeads } from "react-icons/gi";

export default function HomePage() {
  const [showSummary, setShowSummary] = useState(false);
  return (
    <div className="content-overlay">
      <div className="homeCustomBox flex flex-col items-center mx-auto">
        <div className="flex flex-col items-center mb-8">
          <Image src="/iskcon-logo.png" alt="ISKCON Logo" width={400} height={100} className="mb-2 rounded-full text-center shadow-lg border-4 border-white/30" />
          <h1 className="mt-2 text-center fancyTitle">Welcome to Iskcon Sri Sri Radha Madanmohan</h1>
        </div>
        <div className="w-full max-w-2xl grid grid-cols-2 grid-rows-3 gap-6 mb-8">
          {/* Row 1 */}
          <Link href="/home/whatsapp" className="option optionFancy flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-200 hover:scale-105 transition-all">
            <FaWhatsapp className="text-4xl text-green-500 mb-2" />
            <span className="font-bold text-lg">Connect</span>
            <span className="text-sm text-green-700">Join WhatsApp</span>
          </Link>
          <Link href="/home/bhagavad-gita" className="option optionFancy flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-200 hover:scale-105 transition-all">
            <FaBookOpen className="text-4xl text-blue-500 mb-2" />
            <span className="font-bold text-lg">Course</span>
            <span className="text-sm text-blue-700">Bhagavad Gita</span>
          </Link>
          {/* Divider */}
        </div>
        <hr className="w-full border-yellow-300 mb-4" />
        <div className="mb-2 text-yellow-700 font-bold text-lg">Attend this to get free gift</div>
        <div className="w-full max-w-2xl grid grid-cols-2 grid-rows-2 gap-6 mb-8">
          {/* Row 2 */}
          <Link href="/home/mahaavatar-quiz" className="option optionFancy flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-pink-200 hover:scale-105 transition-all">
            <FaCamera className="text-4xl text-pink-500 mb-2" />
            <span className="font-bold text-lg">Challenge</span>
            <span className="text-sm text-pink-700">Mahaavatar Quiz</span>
          </Link>
          <Link href="/home/shloka-contest" className="option optionFancy flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-200 hover:scale-105 transition-all">
            <FaChalkboardTeacher className="text-4xl text-purple-500 mb-2" />
            <span className="font-bold text-lg">Contest</span>
            <span className="text-sm text-purple-700">Shloka Contest</span>
          </Link>
          {/* Row 3 */}
          <Link href="/home/japa-challenge" className="option optionFancy flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-200 hover:scale-105 transition-all">
            <GiPrayerBeads className="text-4xl text-orange-500 mb-2" />
            <span className="font-bold text-lg">Chanting</span>
            <span className="text-sm text-orange-700">Japa Challenge</span>
          </Link>
          <Link href="/home/8ps" className="option optionFancy flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-200 hover:scale-105 transition-all">
            <FaGift className="text-4xl text-yellow-500 mb-2" />
            <span className="font-bold text-lg">Cultivate</span>
            <span className="text-sm text-yellow-700">8 Ps Divine Journey</span>
          </Link>
        </div>
        {/* Donation and Krishna Basket buttons */}
        <div className="flex flex-col md:flex-row gap-6 mt-8 w-full max-w-2xl justify-center items-center">
          <a href="https://donate.iskcon.com" target="_blank" rel="noopener noreferrer" className="fancy-btn bg-red-500 text-white px-8 py-3 rounded-full font-bold shadow hover:bg-red-600 text-lg flex items-center gap-2"><FaDonate className="text-xl" /> Donate</a>
          <Link href="/home/8ps/purchase/items" className="fancy-btn bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow hover:bg-green-700 text-lg flex items-center gap-2"><FaShoppingBasket className="text-xl" /> Krishna Basket</Link>
        </div>
        {/* Gift summary icon */}
        <a
          href="/gift-summary"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-yellow-400 text-white rounded-full shadow-lg p-4 z-50 hover:bg-yellow-500 transition-all flex flex-col items-center"
          title="Show Gift Summary"
        >
          <FaListAlt className="text-3xl mb-1" />
          <span className="text-xs font-bold">Gifts</span>
        </a>
      </div>
    </div>
  );
}
