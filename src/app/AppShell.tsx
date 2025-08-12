"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const bgImages = [
  "/bg1.png",
  "/bg2.png",
  "/bg3.png",
  "/bg4.png",
];

function GoogleTranslate() {
  const ref = useRef(null);
  useEffect(() => {
    // @ts-ignore
    if (window.google && window.google.translate) return;
    const script = document.createElement('script');
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    // @ts-ignore
    window.googleTranslateElementInit = function () {
      // @ts-ignore
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,te',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };
    document.body.appendChild(script);
  }, []);
  return (
    <div
      id="google_translate_element"
      ref={ref}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        background: 'linear-gradient(90deg, #ffe082 10%, #fffde4 90%)',
        borderRadius: '2rem',
        padding: '8px 18px',
        boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
        minWidth: 120,
        minHeight: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: 16,
        color: '#222',
        border: '2px solid #ffe082',
        cursor: 'pointer',
      }}
    />
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <GoogleTranslate />
      <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Sliding background image */}
        <div className="absolute inset-0 w-full h-full -z-20">
          <Image
            src={bgImages[bgIndex]}
            alt="Background"
            fill
            style={{ objectFit: "cover", transition: "opacity 0.7s" }}
            className="animate-fadein"
            priority
          />
          {/* Dark overlay for better content visibility */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[8px]" />
        </div>
        {/* <div className="flex flex-col items-center w-full z-20 mt-8 mb-4">
          <Image src="/iskcon-logo.png" alt="ISKCON Logo" width={400} height={100} className="mb-2 rounded-full text-center shadow-lg border-4 border-white/30" />
          <h1 className="mt-2 text-center fancyTitle">Welcome to Isckon Radha Madan Mohan</h1>
        </div> */}
        <main className="w-full flex flex-col items-center justify-center z-10">
          {children}
        </main>
      </div>
    </>
  );
}
