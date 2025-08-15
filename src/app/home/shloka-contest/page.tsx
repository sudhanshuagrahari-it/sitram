"use client";
import "../home-custom.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const shlokaCards = [
  { id: 1, img: "/images/shloka1.png", title: "Shloka 1" },
  { id: 2, img: "/images/shloka1.png", title: "Shloka 2" },
  { id: 3, img: "/images/shloka1.png", title: "Shloka 3" },
  { id: 4, img: "/images/shloka1.png", title: "Shloka 4" },
  { id: 5, img: "/images/shloka1.png", title: "Shloka 5" },
  { id: 6, img: "/images/shloka1.png", title: "Shloka 6" },
];

export default function ShlokaContestPage() {
  return (
    <div className="content-overlay">
      <div className="homeCustomBox flex flex-col items-center mx-auto">
        <h2 className="fancyTitle mb-6">Shloka Contest</h2>
        <div className="ps-menu-bar w-full grid grid-cols-2 grid-rows-3 gap-8 max-w-2xl mb-8">
          {shlokaCards.map(card => (
            <Link
              href={`/home/shloka-contest/${card.id}`}
              key={card.id}
              className="ps-menu-item group relative flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg border-2 w-full h-56 transition-all duration-300 bg-gradient-to-br from-white/10 to-black/40 border-yellow-200 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={card.img}
                alt={card.title}
                style={{ width: "9rem", height: "11rem", objectFit: "cover" }}
                className="rounded-xl w-28 h-28 object-cover border-2 border-yellow-100 group-hover:border-yellow-400 transition mb-2"
              />
              <div className="font-bold text-lg text-yellow-200 group-hover:text-yellow-400 transition">
                {card.title}
              </div>
            </Link>
          ))}
        </div>
        <p className="text-lg text-center text-yellow-100">Click a shloka to view, learn, and get gifts!</p>
      </div>
    </div>
  );
}
