"use client";
import React from "react";
import { FaGift } from "react-icons/fa";

export default function GiftSummaryPage() {
  return (
    <div className="content-overlay min-h-screen flex flex-col items-center justify-center">
      <div className="homeCustomBox max-w-2xl w-full mx-auto p-8 rounded-2xl shadow-2xl bg-white/90">
        <h2 className="fancyTitle mb-6 flex items-center gap-2 text-yellow-700"><FaGift className="text-yellow-500" /> Gift Summary</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 space-y-3 mb-6">
          <li>WhatsApp Group: Stay connected for updates</li>
          <li>Bhagavad Gita Course: Learn the essence of Gita</li>
          <li>Mahaavatar Quiz: Test your knowledge and win</li>
          <li>Shloka Contest: Recite and reflect on shlokas</li>
          <li>Japa Challenge: Chant and track your progress</li>
          <li>8 Ps Divine Journey: Complete all 8 steps</li>
          <li>Krishna Basket: Purchase divine items</li>
          <li>Special Gifts for active participants!</li>
        </ul>
        <div className="text-center text-yellow-700 font-bold text-lg">Participate in all activities to unlock more divine gifts!</div>
      </div>
    </div>
  );
}
