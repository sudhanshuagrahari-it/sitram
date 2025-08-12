"use client";
import React from "react";
import PsMenuBar from "../PsMenuBar";
import "../../home-custom.css";

export default function PerfectPage() {
  return (
    <>
      <PsMenuBar />
      <div className="content-overlay">
        <div className="homeCustomBox flex flex-col items-center mx-auto">
          <h2 className="fancyTitle">Perfect</h2>
          <p className="text-lg mt-2">Spiritual programs: Attend and perfect your spiritual journey through programs.</p>
          <img src="/images/perfect.png" alt="Perfect" className="mt-6 rounded-xl shadow-lg w-64" />
          <div className="mt-6 text-base max-w-2xl text-center">
            <p>Perfect your life by taking the next step after Janmashtami—join <b>IYS programs, VLC courses, Bhakti Vriksha, Online Bhagavad Gita classes</b>, or other ISKCON programs.
This is about <b>sustaining the connection</b> we felt during the festival and turning it into a lifestyle.
</p>
          </div>
        </div>
      </div>
    </>
  );
}
