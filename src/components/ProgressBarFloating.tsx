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

export const ProgressBarFloating: React.FC<ProgressBarFloatingProps> = ({ progress, completedPs, psList }) => {
  const [position, setPosition] = useState({ x: 40, y: 40 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };
    const handleMouseUp = () => setDragging(false);
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    offset.current = {
      x: e.clientX - (rect?.left || 0),
      y: e.clientY - (rect?.top || 0),
    };
  };

  return (
    <div
      ref={dragRef}
      className="fixed z-50 cursor-move shadow-2xl rounded-2xl border-2 border-yellow-300 p-0 flex flex-col items-center"
      style={{ left: position.x, top: position.y, minWidth: 280, userSelect: dragging ? "none" : "auto" }}
      onMouseDown={handleMouseDown}
    >
      <div className="w-full h-full bg-gradient-to-br from-yellow-100/90 via-yellow-200/80 to-yellow-300/70 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center">
        <div className="font-bold text-yellow-700 mb-2 text-base drop-shadow">8Ps Progress</div>
        <div className="flex gap-1 mb-2">
          {psList.map((p) => (
            <div
              key={p}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-yellow-300 mr-1 shadow ${
                completedPs.includes(p) ? psColors[p] : "bg-gray-200 text-gray-500"
              }`}
              title={p}
            >
              {p[0]}
            </div>
          ))}
        </div>
        <div className="relative w-full bg-yellow-200 rounded-full h-4 mb-4 shadow-inner">
          <div
            className="bg-yellow-400 h-4 rounded-full transition-all duration-300 shadow"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-extrabold text-yellow-700 drop-shadow">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};
