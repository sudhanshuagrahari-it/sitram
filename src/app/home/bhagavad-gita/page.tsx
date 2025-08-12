"use client";
import "../home-custom.css";
import React from "react";

export default function BhagavadGitaPage() {
  return (
    <div className="content-overlay">
      <div className="homeCustomBox flex flex-col items-center mx-auto">
        <h2>Join ISKCON Bhagavad Gita Classes</h2>
        <p>Click the button below to join our Bhagavad Gita classes WhatsApp group!</p>
        <a
          href="https://chat.whatsapp.com/replace-with-real-link"
          target="_blank"
          rel="noopener noreferrer"
          className="option optionFancy optionFull"
        >
          Join Gita Classes Group
        </a>
      </div>
    </div>
  );
}

