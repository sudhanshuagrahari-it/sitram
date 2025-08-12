"use client";
import React from "react";
import PsMenuBar from "../PsMenuBar";
import "../../home-custom.css";

export default function PledgePage() {
  return (
    <>
    <PsMenuBar />
    <div className="content-overlay">
      <div className="homeCustomBox flex flex-col items-center mx-auto">
        <h2 className="fancyTitle">Pledge</h2>
        <p className="text-lg mt-2">Sacred vows: Make your sacred pledge and strengthen your spiritual resolve.</p>
        <img src="/images/pledge.png" alt="Pledge" className="mt-6 rounded-xl shadow-lg w-64" />
        <div className="mt-6 text-base max-w-2xl text-center">
            <p>Make a personal vow for the year:</p>
            <ul className="mt-4 text-left list-disc list-inside">
              <li>Chant a fixed number of rounds daily.</li>
              <li>Bring at least three friends for darshan next Janmashtami.</li>
              <li>Participate in regular temple programs.</li>
            </ul>
          </div>
      </div>
    </div>
    </>
  );
}
