"use client";
import React, { useState, useEffect } from "react";
import PsMenuBar from "../8ps/PsMenuBar";
import "../home-custom.css";

const QUIZ_TYPE = "mahaavatar";
const QUIZ_TITLE = "Mahaavatar Quiz";
const MAX_SCORE = 10;
const P_NAME = "Mahaavatar";
const TOTAL_PS = 8;

const questions = [
  { id: 1, type: "text", text: "Whose name made stones float, whose touch made stone alive, who rescued stone heavy heart from an ocean of sorrow across ocean", answer: "Rama" },
  { id: 2, type: "text", text: "Today is His brother’s birthday/Has all attributes of Krishna except colour", answer: "Balaram" },
  { id: 3, type: "text", text: "neither in night nor in day; neither inside nor outside; neither living nor dead", answer: "Narasimha" },
  { id: 4, type: "text", text: "The RESCUER of MOTHER EARTH", answer: "Varaha" },
  { id: 5, type: "text", text: "one who covered entire universe with 2 steps", answer: "Vamana" },
  { id: 6, type: "image", src: "/images/mahaavatar5.png", answer: "Matsya" },
  { id: 7, type: "image", src: "/images/mahaavatar4.png", answer: "Kurma" },
  { id: 8, type: "image", src: "/images/mahaavatar6.png", answer: "Parasuram" },
  { id: 9, type: "image", src: "/images/mahaavatar7.png", answer: "Buddha" },
  { id: 10, type: "text", text: "When people doesn’t change by any means, He enters the scene", answer: "Kalki" },
];

const answerImages = [
  { id: 1, src: "/images/ans_ram.png", label: "Rama" },
  { id: 2, src: "/images/ans_k.png", label: "Balaram" },
  { id: 3, src: "/images/ans_narasimha.png", label: "Narasimha" },
  { id: 4, src: "/images/ans_varaha.png", label: "Varaha" },
  { id: 5, src: "/images/ans_vamana.png", label: "Vamana" },
  { id: 6, src: "/images/ans_matsya.png", label: "Matsya" },
  { id: 7, src: "/images/ans_kurma.png", label: "Kurma" },
  { id: 8, src: "/images/ans_parashurama.png", label: "Parasuram" },
  { id: 9, src: "/images/ans_buddha.png", label: "Buddha" },
  { id: 10, src: "/images/ans_ka.png", label: "Kalki" }
];

export default function MahaavatarQuizPage() {
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [tab, setTab] = useState(0); // 0: first 5, 1: next 5
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({ name: "", mobile: "", gender: "", address: "" });
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [error, setError] = useState("");
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    // Try to load userId from localStorage and fetch user info
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("userId");
      if (storedId) {
        setUserId(storedId);
        setLoadingUser(true);
        fetch(`/api/user/get?id=${storedId}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.user) {
              setUserInfo({
                name: data.user.name,
                mobile: data.user.mobile,
                gender: data.user.gender,
                address: data.user.address,
              });
            }
          })
          .finally(() => setLoadingUser(false));
      }
    }
  }, []);

  const handleDrop = (qIdx: number, label: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[qIdx] = label;
    setUserAnswers(newAnswers);
  };

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUserInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.mobile || !userInfo.gender || !userInfo.address) {
      setError("Please fill all details.");
      return;
    }
    setError("");
    // Submit user info to quiz API to get userId
    const res = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userInfo, answers: [], score: 0, quizType: QUIZ_TYPE, quizTitle: QUIZ_TITLE, maxScore: MAX_SCORE }),
    });
    const data = await res.json();
    if (data.success && data.userId) {
      setUserId(data.userId);
      if (typeof window !== "undefined") localStorage.setItem("userId", data.userId);
      setShowUserInfo(false);
    } else {
      setError("Could not save user info. Try again.");
    }
  };

  const handleSubmit = async () => {
    // If no userId, show form
    if (!userId) {
      setShowUserInfo(true);
      return;
    }
    let s = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) s++;
    });
    setScore(s);
    setSubmitted(true);
    // Save quiz attempt (no progress or P info for Mahaavatar)
    await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, answers: userAnswers, score: s, quizType: QUIZ_TYPE, quizTitle: QUIZ_TITLE, maxScore: MAX_SCORE }),
    });
  };

  // Responsive: 2x5 grid for desktop, 1x5 per tab for mobile
  const [windowWidth, setWindowWidth] = useState(1024);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  const isMobile = windowWidth < 700;
  const showQuestions = isMobile ? questions.slice(tab * 5, tab * 5 + 5) : questions;

  return (
    <div className="content-overlay">
      <div
        className="comeCustomBox1 quiz-main-container flex flex-col items-center mx-auto"
        style={{ width: isMobile ? "100vw" : "1200px", maxWidth: "98vw", margin: "0 auto" }}
      >
        <h2 className="fancyTitle mb-4">Mahaavatar Quiz</h2>
        <p className="mb-6 text-lg text-center max-w-2xl">Drag the correct answer image below each question. Some questions are images, some are text. Good luck!</p>
        {showUserInfo && (
          <form className="mb-6 p-6 rounded-2xl bg-yellow-50 border-2 border-yellow-300 shadow-lg max-w-lg w-full custom-user-form" onSubmit={handleUserInfoSubmit}>
            <div className="mb-3 font-bold text-xl text-yellow-900">Please enter your details</div>
            <input className="input-fancy mb-3 w-full p-3 rounded-lg border border-yellow-300" name="name" placeholder="Name" value={userInfo.name} onChange={handleUserInfoChange} />
            <input className="input-fancy mb-3 w-full p-3 rounded-lg border border-yellow-300" name="mobile" placeholder="Mobile Number" value={userInfo.mobile} onChange={handleUserInfoChange} />
            <select className="input-fancy mb-3 w-full p-3 rounded-lg border border-yellow-300" name="gender" value={userInfo.gender} onChange={handleUserInfoChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input className="input-fancy mb-3 w-full p-3 rounded-lg border border-yellow-300" name="address" placeholder="Address" value={userInfo.address} onChange={handleUserInfoChange} />
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <button className="fancy-btn px-8 py-3 rounded-xl bg-yellow-500 text-white font-bold shadow-lg hover:bg-yellow-600 w-full text-lg transition-all" type="submit">Save & Continue</button>
          </form>
        )}
        {isMobile && (
          <div className="flex gap-4 mb-4 justify-center">
            <button className="fancy-btn px-4 py-2 rounded-lg bg-yellow-400 text-white font-bold shadow hover:bg-yellow-600 transition-all" onClick={() => setTab(Math.max(0, tab - 1))} disabled={tab === 0}>Prev</button>
            <button className="fancy-btn px-4 py-2 rounded-lg bg-yellow-400 text-white font-bold shadow hover:bg-yellow-600 transition-all" onClick={() => setTab(Math.min(1, tab + 1))} disabled={tab === 1}>Next</button>
          </div>
        )}
        <div
          className="quiz-grid gap-6 mb-8"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)",
            gridTemplateRows: isMobile ? "1fr" : "repeat(2, 1fr)",
            maxWidth: isMobile ? undefined : 1100,
            margin: "0 auto",
            gap: isMobile ? 16 : 32
          }}
        >
          {showQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="quiz-question-box bg-white shadow flex flex-col items-center justify-center"
              style={{
                color: "black",
                minWidth: isMobile ? "90vw" : "180px",
                maxWidth: isMobile ? "98vw" : "210px",
                minHeight: isMobile ? "180px" : "250px",
                height: isMobile ? "auto" : "210px",
                aspectRatio: "1/1",
                borderRadius: "1.25rem",
                padding: "1.5rem",
                margin: isMobile ? 0 : 8,
                boxShadow: "0 2px 12px rgba(255,224,130,0.18)",
                border: "2px solid #ffe082"
              }}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                const label = e.dataTransfer.getData("text/plain");
                handleDrop(q.id - 1, label);
              }}
            >
              {q.type === "image" ? (
                <img src={q.src} alt={`Q${q.id}`} style={{ width: "100px", height: "100px", objectFit: "contain", marginBottom: 12, borderRadius: 16 }} />
              ) : (
                <div className="font-semibold text-lg mb-2 text-center">{q.text}</div>
              )}
              <div className="drop-area mt-2 mb-2 p-2 border-2 border-dashed border-yellow-400 rounded-lg min-h-[40px] flex items-center justify-center" style={{ minHeight: 56, width: "100%", background: "#fffde4" }}>
                {userAnswers[q.id - 1] ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        answerImages.find(a => a.label.toLowerCase() === userAnswers[q.id - 1].toLowerCase())?.src || ""
                      }
                      alt={userAnswers[q.id - 1]}
                      style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover", background: "#fffbe6", border: "2px solid #ffe082" }}
                    />
                    <span className="font-bold text-green-600 text-xs mt-1">{userAnswers[q.id - 1]}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">Drop answer here</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={`answer-row flex flex-wrap justify-center gap-3 mb-8 ${isMobile ? "answer-row-mobile" : ""}`}
          style={{ maxWidth: isMobile ? undefined : 900 }}>
          {answerImages.map(ans => (
            <div
              key={ans.id}
              style={{
                width: isMobile ? 60 : 80,
                height: isMobile ? 60 : 80,
                borderRadius: 12,
                background: "#fffbe6",
                border: "2px solid #ffe082",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 2,
                boxShadow: "0 1px 6px rgba(255,224,130,0.12)",
                cursor: "pointer",
                transition: "transform 0.2s"
              }}
              draggable
              onDragStart={e => e.dataTransfer.setData("text/plain", ans.label)}
              onClick={() => {
                // For mobile tap selection
                const firstEmpty = userAnswers.findIndex(a => !a);
                if (firstEmpty !== -1) handleDrop(firstEmpty, ans.label);
              }}
            >
              <img
                src={ans.src}
                alt={ans.label}
                style={{ width: isMobile ? 58 : 78, height: isMobile ? 58 : 78, objectFit: "cover", borderRadius: 8 }}
              />
            </div>
          ))}
        </div>
        {!submitted ? (
          <button className="fancy-btn px-6 py-2 rounded-full bg-green-500 text-white font-bold shadow hover:bg-green-600" onClick={handleSubmit}>Submit Quiz</button>
        ) : (
          <div className="text-center mt-4">
            <div className="text-2xl font-bold mb-2">Quiz Completed!</div>
            <div className="text-lg mb-4">You scored <span className="text-green-600 font-bold">{score}</span> out of 10!</div>
          </div>
        )}
      </div>
    </div>
  );
}
