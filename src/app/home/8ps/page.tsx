"use client";
import "../home-custom.css";
import React from "react";
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

  return (
    <div className="content-overlay">
      <div className="homeCustomBox flex flex-col items-center mx-auto">
        <h2 className="fancyTitle mb-6">8Ps Divine Journey</h2>
        <div className="ps-menu-bar w-full flex flex-wrap justify-center gap-6 mb-8">
          {ps.map((p, idx) => (
            <Link href={p.href} key={p.name} className="ps-menu-item group relative flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg bg-gradient-to-br from-white/10 to-black/40 border-2 border-yellow-200 hover:scale-105 hover:shadow-2xl transition-all duration-300 w-40 h-44">
              <div className="mb-2">{p.icon}</div>
              <div className="font-bold text-lg text-yellow-200 group-hover:text-yellow-400 transition">{p.name}</div>
              <div className="text-xs text-white/80 mb-2">{p.desc}</div>
              <img src={p.img} alt={p.name} className="rounded-xl w-16 h-16 object-cover border-2 border-yellow-100 group-hover:border-yellow-400 transition" />
              <span className="absolute bottom-2 right-2 text-xs text-yellow-100 opacity-60">Click to explore</span>
            </Link>
          ))}
        </div>
        <p className="text-lg text-center text-yellow-100">Embark on your spiritual journey by exploring each P below!</p>
      </div>
    </div>
  );
}

