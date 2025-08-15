"use client";
import React, { useState, useRef, useEffect } from "react";

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

  // Drag logic
  const [pos, setPos] = useState<{x: number, y: number}>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("progressBarPos");
      if (saved) return JSON.parse(saved);
    }
    return { x: 24, y: 24 };
  });
  const dragRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current) return;
      setPos(prev => {
        const newPos = { x: e.clientX - offset.current.x, y: e.clientY - offset.current.y };
        localStorage.setItem("progressBarPos", JSON.stringify(newPos));
        return newPos;
      });
    }
    function onMouseUp() { dragging.current = false; }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  function onDragStart(e: React.MouseEvent) {
    dragging.current = true;
    const rect = dragRef.current?.getBoundingClientRect();
    offset.current = {
      x: e.clientX - (rect?.left ?? 0),
      y: e.clientY - (rect?.top ?? 0)
    };
  }

  return (
    <div
      ref={dragRef}
      className="progressbar-floating-google"
      style={{ left: pos.x, top: pos.y, position: "fixed", zIndex: 1000, cursor: "move" }}
      onMouseDown={onDragStart}
    >
      <div className="progressbar-floating-google-inner">
        <div className="progressbar-floating-title">8Ps Progress</div>
        <div className="progressbar-bar-outer-google" style={{ background: '#ffe082', position: 'relative' }}>
          <div
            className="progressbar-bar-inner-google"
            style={{ width: `${percent}%`, background: '#fff', position: 'absolute', left: 0, top: 0, height: '100%' }}
          ></div>
          <div className="progressbar-bar-label-google">
            {percent}%
          </div>
        </div>
      </div>
    </div>
  );
};
