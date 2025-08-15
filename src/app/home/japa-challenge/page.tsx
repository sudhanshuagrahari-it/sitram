"use client";
import "../home-custom.css";
import React, { useRef, useState } from "react";

const text = "Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Ram Hare Ram Ram Ram Hare Hare";
const words = text.split(" ");
// Example timings in seconds (start time for each word)
const timings = [0, 1.2, 1.7, 2.07, 2.7, 3.2, 3.6, 4.2, 4.7, 5.2, 5.5, 6.0, 6.4, 6.9, 7.3, 7.6];

export default function JapaChallengePage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentWord, setCurrentWord] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync highlight with audio
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = audio.currentTime;
    let wordIdx = timings.length - 1;
    for (let i = 0; i < timings.length; i++) {
      if (time < timings[i]) {
        wordIdx = i - 1;
        break;
      }
    }
    setCurrentWord(Math.max(0, wordIdx));
  };

   const handlePlayClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0; // restart from beginning
    audio.play();
    setPlayCount((prev) => prev + 1);
    setIsPlaying(true);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentWord(0);
  };

  return (
    <div className="content-overlay">
      <div className="homeCustomBox flex flex-col items-center mx-auto">
        <h2>Japa Challenge</h2>
         {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src="/audio/japa.mp3"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          style={{ display: "none" }}
        />

        {/* Custom Play button */}
        <button
          onClick={handlePlayClick}
          disabled={isPlaying}
          style={{
            background: isPlaying ? "#ccc" : "#ffe082",
            padding: "0.5em 1em",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: isPlaying ? "not-allowed" : "pointer",
            marginBottom: "1em",
            opacity: isPlaying ? 0.6 : 1
          }}
        >
          ▶ Chant Mantra
        </button>

        {/* Play count */}
        <div style={{ marginBottom: "1em", color: "#ccc" }}>
          Japa Counter: {playCount}
        </div>

        <div className="mt-6 text-2xl flex flex-wrap gap-2 justify-center">
          {words.map((word, idx) => (
            <React.Fragment key={idx}>
            <span
              key={idx}
              style={{
                color: idx === currentWord ? "#ffe082" : "#fff",
                fontWeight: idx === currentWord ? "bold" : "normal",
                transition: "color 0.2s",
              }}
            >
              {word} {" "}
            </span>
            {(idx + 1) % 4 === 0 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}