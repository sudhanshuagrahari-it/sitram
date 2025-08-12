"use client";
import React from "react";
import PsMenuBar from "../PsMenuBar";
import "../../home-custom.css";

export default function PerceivePage() {
  return (
    <>
      <PsMenuBar />
      <div className="content-overlay">
        <div className="homeCustomBox flex flex-col items-center mx-auto">
          <h2 className="fancyTitle">Perceive</h2>
          <p className="text-lg mt-2">Divine gallery: Experience the divine through images and stories.</p>
          <img src="/images/perceive.png" alt="Perceive" className="mt-6 rounded-xl shadow-lg w-64" />
        <div className="mt-6 text-base max-w-2xl text-center">
            <p>Know the founder-acharya—<b>Srila Prabhupada</b>—and how the Krishna Consciousness movement began.</p>
            <p className="mt-4">View <b>Abhay Charan series, Prabhupada’s darshan gallery</b>, and short lectures.</p>
            <p className="mt-4">Understand how one <b>pure devotee</b> can change the destiny of the world.</p>

          </div>
        </div>
      </div>
    </>
  );
}
