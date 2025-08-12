"use client";
import React from "react";
import PsMenuBar from "../PsMenuBar";
import "../../home-custom.css";

export default function ParticipatePage() {
  return (
    <>
      <PsMenuBar />
      <div className="content-overlay">
        <div className="homeCustomBox flex flex-col items-center mx-auto">
          <h2 className="fancyTitle">Participate</h2>
          <img src="/images/participate.png" alt="Participate" className="mt-6 rounded-xl shadow-lg w-64" />
          <div className="mt-6 text-base max-w-2xl text-center">
            <p>In any activity, we seek happiness. But material happiness is temporary and often leads to problems. <b>Spiritual activities</b> like <b>kirtan</b>, <b>chanting</b>, and <b>seva</b> uplift consciousness, enrich happiness, and purify existence.</p>
            <p className="mt-4">True participation means not just collecting information but undergoing transformation: <i>Asato ma sad gamaya, Tamaso ma jyotir gamaya, Mrityor ma amritam gamaya</i>.</p>
          </div>
        </div>
      </div>
    </>
  );
}
