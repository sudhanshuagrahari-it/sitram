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
      <div className="homeCustomBox shloka-contest-box">
        <h2 className="fancyTitle">Shloka Contest</h2>
        <div className="ps-menu-bar shloka-menu-bar">
          {shlokaCards.map(card => (
            <Link
              href={`/home/shloka-contest/${card.id}`}
              key={card.id}
              className="ps-menu-item shloka-menu-item"
            >
              <img
                src={card.img}
                alt={card.title}
                className="shloka-menu-img"
              />
              <div className="shloka-menu-title">{card.title}</div>
            </Link>
          ))}
        </div>
        <p className="shloka-menu-desc">Click a shloka to view, learn, and get gifts!</p>
      </div>
    </div>
  );
}
