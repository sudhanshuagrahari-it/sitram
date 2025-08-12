"use client";
import React from "react";
import PsMenuBar from "../PsMenuBar";
import "../../home-custom.css";

export default function PerformPage() {
  return (
    <>
      <PsMenuBar />
      <div className="content-overlay">
        <div className="homeCustomBox flex flex-col items-center mx-auto">
          <h2 className="fancyTitle">Perform Worship</h2>
          <img src="/images/perform.png" alt="Perform" className="mt-6 rounded-xl shadow-lg w-64" />
          <div className="mt-6 text-base max-w-2xl text-center">
            <p>Worship is an act of gratitude—offering back to the Lord what we have received from Him: <b>Tera Tujhko Arpana, Kya Lage Mera</b>.</p>
            <ul className="mt-4 text-left list-disc list-inside">
              <li><b>Fruit vendor lady</b> offered her stock to Krishna and received His mercy.</li>
              <li><b>Sudama</b> gave his little rice with pure love and got abundance in return.</li>
              <li>Even <b>Putana</b>, who tried to kill Krishna, was given the position of a mother because of her external offering.</li>
            </ul>
            <p className="mt-4">Offerings represent the five elements:</p>
            <ul className="text-left list-disc list-inside">
              <li>Lamp = Fire</li>
              <li>Arghyam = Water</li>
              <li>Incense = Earth</li>
              <li>Chamara = Air</li>
              <li>Conch = Ether</li>
            </ul>
            <p className="mt-4">—the very elements that make up our body.</p>
          </div>
        </div>
      </div>
    </>
  );
}
