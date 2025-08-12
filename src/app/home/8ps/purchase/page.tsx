"use client";
import React from "react";
import PsMenuBar from "../PsMenuBar";
import "../../home-custom.css";

export default function PurchasePage() {
  return (
    <>
      <PsMenuBar />
      <div className="content-overlay">
        <div className="homeCustomBox flex flex-col items-center mx-auto">
          <h2 className="fancyTitle">Purchase</h2>
          <p className="text-lg mt-2">Divine offerings: Find and purchase sacred items and offerings.</p>
          <img src="/images/purchase.png" alt="Purchase" className="mt-6 rounded-xl shadow-lg w-64" />
          <div className="mt-6 text-base max-w-2xl text-center">
            <p>Many visitors may not reach the gift stalls. Display gift shop items (esp. Srila Prabhupada’s books) online or on screens—people can pay in the queue and collect later from volunteers.
Remind them that <b>buying spiritual books is not just a transaction—it’s a transcendental investment</b>.
</p>
          </div>
        </div>
      </div>
    </>
  );
}
