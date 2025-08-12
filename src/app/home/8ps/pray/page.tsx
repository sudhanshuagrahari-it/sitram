"use client";
import React from "react";
import PsMenuBar from "../PsMenuBar";
import "../../home-custom.css";

export default function PrayPage() {
  return (
    <>
      <PsMenuBar />
      <div className="content-overlay">
        <div className="homeCustomBox flex flex-col items-center mx-auto">
          <h2 className="fancyTitle">Pray</h2>
          <img src="/images/pray.png" alt="Pray" className="mt-6 rounded-xl shadow-lg w-64" />
          <div className="mt-6 text-base max-w-2xl text-center">
            <p>The Lord says in <b>Bhagavad Gita</b>—as we approach Him, He reciprocates accordingly. Our intelligence is to approach Him in the right mood, so we get the best reciprocation. Example:</p>
            <ul className="mt-4 text-left list-disc list-inside">
              <li><b>Duryodhana vs Arjuna</b> – Duryodhana sought Krishna’s army (energy) for victory; Arjuna sought Krishna Himself (the energetic) for love.</li>
              <li><b>Ravana vs Hanuman</b> – Ravana separated Lord Rama from Sita (bhoga vritti), Hanuman united Them (seva vritti).</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
