"use client";

import React, { useEffect, useState } from "react";
import { FaGift, FaShoppingBasket, FaBookOpen, FaChalkboardTeacher, FaCamera, FaPrayingHands } from "react-icons/fa";

export default function GiftSummaryPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [gitaRegs, setGitaRegs] = useState<any[]>([]);
  const [japaCount, setJapaCount] = useState<number>(0);
  const [progresses, setProgresses] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [userMobile, setUserMobile] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("userInfo");
      if (user) {
        const u = JSON.parse(user);
        setUserMobile(u.mobile || "");
        setUserName(u.name || "");
      }
      const japa = localStorage.getItem("japaCount");
      setJapaCount(japa ? parseInt(japa) : 0);
    }
  }, []);

  useEffect(() => {
    if (!userMobile) return;
    setLoading(true);
    fetch(`/api/gift-summary?mobile=${encodeURIComponent(userMobile)}`)
      .then(res => res.json())
      .then(data => {
        setCartItems(data.cartItems || []);
        setGitaRegs(data.gitaRegs || []);
        setProgresses(data.progresses || []);
        setAttempts(data.attempts || []);
      })
      .finally(() => setLoading(false));
  }, [userMobile]);

  return (
    <div className="content-overlay min-h-screen flex flex-col items-center justify-center">
      <div className="homeCustomBox max-w-2xl w-full mx-auto p-8 rounded-2xl shadow-2xl bg-white/90">
        <h2 className="fancyTitle mb-6 flex items-center gap-2 text-yellow-700"><FaGift className="text-yellow-500" /> Gift Summary</h2>
        {loading ? (
          <div className="text-center text-yellow-700 font-bold text-lg">Loading your summary…</div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="font-bold text-lg text-yellow-700 mb-2 flex items-center gap-2"><FaShoppingBasket /> Krishna Basket Items</h3>
              {cartItems.length === 0 ? (
                <div className="text-gray-500">No items added to cart.</div>
              ) : (
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {cartItems.map((item, idx) => (
                    <li key={idx}>{item.title} x {item.qty} ({item.price} each)</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-6">
              <h3 className="font-bold text-lg text-yellow-700 mb-2 flex items-center gap-2"><FaBookOpen /> Bhagavad Gita Registration</h3>
              {gitaRegs.length === 0 ? (
                <span className="text-red-700 font-semibold">Not Registered</span>
              ) : (
                <span className="text-green-700 font-semibold">Registered ({gitaRegs.map(r => r.language).join(", ")})</span>
              )}
            </div>
            <div className="mb-6">
              <h3 className="font-bold text-lg text-yellow-700 mb-2 flex items-center gap-2"><FaPrayingHands /> Japa Challenge</h3>
              <span className="text-gray-700">Total Japa Count: <span className="font-bold">{japaCount}</span></span>
            </div>
            <div className="mb-6">
              <h3 className="font-bold text-lg text-yellow-700 mb-2 flex items-center gap-2"><FaChalkboardTeacher /> Quiz Progress & Scores</h3>
              {progresses.length === 0 ? (
                <div className="text-gray-500">No quiz progress found.</div>
              ) : (
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {progresses.map((p, idx) => {
                    const attempt = attempts.find(a => a.quizId === p.pName);
                    return (
                      <li key={idx}>
                        {p.pName}: {p.completed ? "Completed" : "In Progress"} | Score: <span className="font-bold">{attempt ? attempt.score : "-"}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="text-center text-yellow-700 font-bold text-lg">Participate in all activities to unlock more divine gifts!</div>
          </>
        )}
      </div>
    </div>
  );
}
