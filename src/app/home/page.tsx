"use client";

import React from "react";
import "./home-custom.css";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaBookOpen, FaGift, FaCamera } from "react-icons/fa";
import { GiPrayerBeads } from "react-icons/gi";

export default function HomePage() {
  return (
    <div className="content-overlay">
      <div className="homeCustomBox flex flex-col items-center mx-auto">
        <div className="flex flex-col items-center mb-8">
          <Image src="/iskcon-logo.png" alt="ISKCON Logo" width={400} height={100} className="mb-2 rounded-full text-center shadow-lg border-4 border-white/30" />
          <h1 className="mt-2 text-center fancyTitle">Welcome to Isckon Radha Madan Mohan</h1>
        </div>
        <section className="w-full flex flex-col gap-8">
          <div>
            <h2 className="flex items-center gap-2 mb-3"><FaWhatsapp className="text-green-400" /> Get Connected</h2>
            <div className="optionRow">
              <Link href="/home/whatsapp" className="option optionFancy optionFull"><FaWhatsapp /> Join ISKCON Hyd WhatsApp Group</Link>
              <Link href="/home/bhagavad-gita" className="option optionFancy optionFull"><FaBookOpen /> Join ISKCON Bhagavad Gita Classes</Link>
            </div>
          </div>
          <div>
            <h2 className="flex items-center gap-2 mb-3"><FaGift className="text-yellow-400" /> Get Your Free Gifts</h2>
            <div className="optionRow">
              <Link href="/home/8ps" className="option optionFancy optionFull"><FaGift /> 8 PS</Link>
              <Link href="/home/japa-challenge" className="option optionFancy optionFull"><GiPrayerBeads /> Japa Challenge</Link>
            </div>
          </div>
          <div>
            <h2 className="flex items-center gap-2 mb-3"><FaCamera className="text-pink-400" /> Contest Challenge</h2>
            <div className="optionRow">
              <Link href="/home/selfie-contest" className="option optionFancy optionFull"><FaCamera /> Selfie Contest</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
