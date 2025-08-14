"use client";
import "../home-custom.css";
import React, { useState, useEffect } from "react";
import { ProgressBarFloating } from "../../../components/ProgressBarFloating";
import { FaHandsWash, FaPrayingHands, FaRegStar, FaUsers, FaShoppingBag, FaRocket, FaEye, FaHandshake } from "react-icons/fa";
import Link from "next/link";

export default function EightPsPage() {
  const ps = [
    {
      name: "Prepare",
      desc: "Sacred preparation",
      href: "/home/8ps/prepare",
      icon: <FaHandsWash className="text-3xl text-blue-400" />,
      img: "/images/prepare.png"
    },
    {
      name: "Pray",
      desc: "Divine prayers",
      href: "/home/8ps/pray",
      icon: <FaPrayingHands className="text-3xl text-purple-400" />,
      img: "/images/pray.png"
    },
    {
      name: "Perform",
      desc: "Sacred rituals",
      href: "/home/8ps/perform",
      icon: <FaRegStar className="text-3xl text-yellow-400" />,
      img: "/images/perform.png"
    },
    {
      name: "Participate",
      desc: "Community seva",
      href: "/home/8ps/participate",
      icon: <FaUsers className="text-3xl text-green-400" />,
      img: "/images/participate.png"
    },
    {
      name: "Purchase",
      desc: "Divine offerings",
      href: "/home/8ps/purchase",
      icon: <FaShoppingBag className="text-3xl text-pink-400" />,
      img: "/images/purchase.png"
    },
    {
      name: "Perfect",
      desc: "Spiritual programs",
      href: "/home/8ps/perfect",
      icon: <FaRocket className="text-3xl text-orange-400" />,
      img: "/images/perfect.png"
    },
    {
      name: "Perceive",
      desc: "Divine gallery",
      href: "/home/8ps/perceive",
      icon: <FaEye className="text-3xl text-cyan-400" />,
      img: "/images/perceive.png"
    },
    {
      name: "Pledge",
      desc: "Sacred vows",
      href: "/home/8ps/pledge",
      icon: <FaHandshake className="text-3xl text-red-400" />,
      img: "/images/pledge.png"
    },
  ];

  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const psList = ps.map(p => p.name);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("userId");
      if (storedId) {
        fetch(`/api/progress/user?id=${storedId}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && Array.isArray(data.progress)) {
              const progObj: { [key: string]: number } = {};
              data.progress.forEach((p: any) => {
                progObj[p.pName] = p.percent;
              });
              setProgress(progObj);
            }
          });
      }
    }
  }, []);
  return (
    <div className="content-overlay">
      <ProgressBarFloating
        progress={Math.round((Object.values(progress).filter(v => v >= 12.5).length / psList.length) * 100)}
        completedPs={psList.filter(p => (progress[p] || 0) >= 12.5)}
        psList={psList}
      />
      <div className="homeCustomBox flex flex-col items-center mx-auto">
        <h2 className="fancyTitle mb-6">8Ps Divine Journey</h2>
        <div className="ps-menu-bar w-full flex flex-wrap justify-center gap-6 mb-8">
          {ps.map((p, idx) => {
            const percent = progress[p.name] || 0;
            const completed = percent >= 12.5;
            return (
              <Link
                href={p.href}
                key={p.name}
                className={`ps-menu-item group relative flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg border-2 w-40 h-44 transition-all duration-300
                  ${completed ? 'bg-green-700 border-green-400 scale-105 shadow-2xl' : 'bg-gradient-to-br from-white/10 to-black/40 border-yellow-200 hover:scale-105 hover:shadow-2xl'}
                `}
              >
                <div className={`mb-2 ${completed ? 'text-white' : ''}`}>{p.icon}</div>
                <div className={`font-bold text-lg ${completed ? 'text-green-200' : 'text-yellow-200 group-hover:text-yellow-400'} transition`}>
                  {p.name}
                </div>
                <div className={`text-xs mb-2 ${completed ? 'text-green-100' : 'text-white/80'}`}>{p.desc}</div>
                <img
                  src={p.img}
                  alt={p.name}
                  className={`rounded-xl w-16 h-16 object-cover border-2 ${completed ? 'border-green-300' : 'border-yellow-100 group-hover:border-yellow-400'} transition`}
                />
                {completed ? (
                  <span className="absolute bottom-2 right-2 text-xs text-green-200 font-bold">Completed</span>
                ) : (
                  <span className="absolute bottom-2 right-2 text-xs text-yellow-100 opacity-60">Click to explore</span>
                )}
              </Link>
            );
          })}
        </div>
        <p className="text-lg text-center text-yellow-100">Embark on your spiritual journey by exploring each P below!</p>
      </div>
    </div>
  );
}

