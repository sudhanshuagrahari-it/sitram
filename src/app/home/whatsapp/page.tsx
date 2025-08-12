"use client";

import "../home-custom.css";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappPage() {
  return (
    <div className="content-overlay">
      <div className="homeCustomBox flex flex-col items-center mx-auto">
        <h2>Join ISKCON Hyderabad WhatsApp Group</h2>
        <p>Click the button below to join our WhatsApp group and stay connected!</p>
        <a
          href="https://chat.whatsapp.com/replace-with-real-link"
          target="_blank"
          rel="noopener noreferrer"
          className="option optionFancy optionFull flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="text-green-400 text-xl" />
          Join WhatsApp Group
        </a>
      </div>
    </div>
  );
}
