"use client";
import React from "react";
import PsMenuBar from "../PsMenuBar";
import { useState } from "react";
import "../../home-custom.css";

export default function PreparePage() {
  return (
    <>
      <PsMenuBar />
      <div className="content-overlay">
        <div className="homeCustomBox flex flex-col items-center mx-auto">
          <h2 className="fancyTitle">Prepare for Janmashtami</h2>
          <img src="/images/prepare.png" alt="Prepare" className="mt-6 rounded-xl shadow-lg w-64" />
          <div className="mt-6 text-base max-w-2xl text-center">
            <p>Janmashtami is the divine appearance day of Lord Sri Krishna, the Supreme Personality of Godhead. He appeared as the 8th child of Vasudeva and Devaki. The 7th child was Lord Balarama, symbolizing the spiritual master (Guru). The first six pregnancies of Devaki were destroyed—representing the six anarthas: <b>Kama</b> (lust), <b>Krodha</b> (anger), <b>Lobha</b> (greed), <b>Moha</b> (illusion), <b>Mada</b> (pride), and <b>Matsarya</b> (envy).</p>
            <p className="mt-4">When these impurities are cleansed from our hearts and we take shelter of the spiritual master (Balarama), Krishna can appear in our hearts and lives too.</p>
          </div>
          <FancyQuiz />
        </div>
      </div>
    </>
  );
}
function FancyQuiz() {
  const quizQuestions = [
    {
      question: "Who appeared as the 8th child of Vasudeva and Devaki?",
      options: ["Lord Rama", "Lord Krishna", "Lord Balarama", "Lord Shiva"],
      answer: "Lord Krishna",
    },
    {
      question: "Who symbolizes the spiritual master (Guru)?",
      options: ["Lord Krishna", "Lord Balarama", "Devaki", "Vasudeva"],
      answer: "Lord Balarama",
    },
    {
      question: "Which of the following is NOT one of the six anarthas?",
      options: ["Kama", "Krodha", "Lobha", "Bhakti"],
      answer: "Bhakti",
    },
  ];

  const [step, setStep] = useState("start");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(""));
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Simulate user info check (replace with real check if available)
  const userInfoAvailable = false;

  function handleProceed() {
    if (!userInfoAvailable) {
      setStep("userinfo");
    } else {
      setStep("quiz");
    }
  }

  function handleUserInfoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !mobile) {
      setError("Please enter both name and mobile number.");
      return;
    }
    setError("");
    setStep("quiz");
  }

  interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
  }

  type Step = "start" | "userinfo" | "quiz" | "result";

  function handleAnswer(idx: number, value: string): void {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  }

  interface QuizSubmitPayload {
    name: string;
    mobile: string;
    answers: string[];
    score: number;
  }

  function handleQuizSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    let newScore = 0;
    quizQuestions.forEach((q, i) => {
      if (answers[i] === q.answer) newScore++;
    });
    setScore(newScore);
    setStep("result");
    // Submit to API
    const payload: QuizSubmitPayload = { name, mobile, answers, score: newScore };
    fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => setSubmitted(true));
  }

  return (
    <div className="fancy-quiz-box mt-8 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-yellow-50 to-yellow-100 max-w-xl mx-auto">
      {step === "start" && (
        <button className="fancy-btn px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold shadow-lg hover:scale-105 transition" onClick={handleProceed}>
          Proceed to Complete
        </button>
      )}
      {step === "userinfo" && (
        <form className="flex flex-col gap-4 items-center" onSubmit={handleUserInfoSubmit}>
          <input className="input-fancy" type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
          <input className="input-fancy" type="tel" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className="fancy-btn px-6 py-2 rounded-full bg-yellow-500 text-white font-bold shadow hover:bg-yellow-600" type="submit">Continue to Quiz</button>
        </form>
      )}
      {step === "quiz" && (
        <form className="flex flex-col gap-6" onSubmit={handleQuizSubmit}>
          {quizQuestions.map((q, idx) => (
            <div key={idx} className="quiz-question-box p-4 rounded-xl bg-white shadow">
              <div className="font-semibold mb-2">{q.question}</div>
              {q.options.map(opt => (
                <label key={opt} className="flex items-center gap-2 mb-1">
                  <input type="checkbox" checked={answers[idx] === opt} onChange={() => handleAnswer(idx, opt)} />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ))}
          <button className="fancy-btn px-6 py-2 rounded-full bg-green-500 text-white font-bold shadow hover:bg-green-600 mt-4" type="submit">Submit Quiz</button>
        </form>
      )}
      {step === "result" && (
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Quiz Completed!</div>
          <div className="text-lg mb-4">You scored <span className="text-green-600 font-bold">{score}</span> out of {quizQuestions.length}!</div>
          {submitted && <div className="text-sm text-gray-500">Your attempt has been recorded. Thank you!</div>}
        </div>
      )}
    </div>
  );
}