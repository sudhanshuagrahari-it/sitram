"use client";
import React, { useState, useRef, useEffect } from "react";
// import "../home/home-custom.css";

import "../app/home/home-custom.css";

interface ProgressBarFloatingProps {
  progress: number;
  completedPs: string[];
  psList: string[];
}

const psColors: Record<string, string> = {
  Prepare: "bg-blue-400",
  Pray: "bg-purple-400",
  Perform: "bg-yellow-400",
  Participate: "bg-green-400",
  Purchase: "bg-pink-400",
  Perfect: "bg-orange-400",
  Perceive: "bg-cyan-400",
  Pledge: "bg-red-400",
};

export const ProgressBarFloating: React.FC<ProgressBarFloatingProps> = ({ completedPs }) => {
  const percent = Math.min(100, completedPs.length * 12.5);
  return (
    <div className="fixed z-50 left-6 top-6 w-[320px] bg-white/90 rounded-2xl shadow-2xl border-2 border-yellow-300 p-0 flex flex-col items-center">
      <div className="w-full p-4 flex flex-col items-center">
        <div className="font-bold text-yellow-700 mb-2 text-base drop-shadow">8Ps Progress</div>
        <div className="relative w-full bg-yellow-200 rounded-full h-5 mb-2 shadow-inner">
          <div
            className="bg-yellow-400 h-5 rounded-full transition-all duration-300 shadow"
            style={{ width: `${percent}%` }}
          ></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-extrabold text-yellow-700 drop-shadow">
            {percent}%
          </div>
        </div>
      </div>
    </div>
  );
};
