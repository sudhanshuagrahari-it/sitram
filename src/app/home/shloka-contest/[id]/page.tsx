"use client";
import "../../home-custom.css";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const shlokaData = [
  { id: 1, title: "Shloka 1", img: "/images/shloka1.png", content: "Content for Shloka 1." },
  { id: 2, title: "Shloka 2", img: "/images/shloka2.png", content: "Content for Shloka 2." },
  { id: 3, title: "Shloka 3", img: "/images/shloka3.png", content: "Content for Shloka 3." },
  { id: 4, title: "Shloka 4", img: "/images/shloka4.png", content: "Content for Shloka 4." },
  { id: 5, title: "Shloka 5", img: "/images/shloka5.png", content: "Content for Shloka 5." },
  { id: 6, title: "Shloka 6", img: "/images/shloka6.png", content: "Content for Shloka 6." },
];

export default function ShlokaDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const idx = shlokaData.findIndex(s => s.id === id);
  const shloka = shlokaData[idx];
  const [showTest, setShowTest] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", mobile: "", gender: "", address: "", maritalStatus: "" });
  const [userId, setUserId] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("userId");
      if (storedId) setUserId(storedId);
    }
  }, []);

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) {
      setError("Please share what you have learnt.");
      return;
    }
    if (!userId && (!userInfo.name || !userInfo.mobile || !userInfo.gender || !userInfo.address || !userInfo.maritalStatus)) {
      setError("Please fill all user details.");
      return;
    }
    setError("");
    // Save via quiz API
    const res = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(userId ? { userId } : userInfo),
        answers: [answer],
        score: 1,
        quizType: `shloka${id}`,
        quizTitle: shloka.title,
        maxScore: 1,
        pName: "ShlokaContest",
        percent: 12.5
      })
    });
    if (res.ok) {
      setSubmitted(true);
      setTimeout(() => {
        // Go to next shloka or back to grid
        if (idx < shlokaData.length - 1) {
          router.push(`/home/shloka-contest/${shlokaData[idx + 1].id}`);
        } else {
          router.push("/home/shloka-contest");
        }
      }, 1200);
    } else {
      setError("Could not save. Try again.");
    }
  };

  return (
    <div className="content-overlay">
      <div className="homeCustomBox flex flex-col items-center mx-auto max-w-2xl">
        <button className="self-start mb-4 text-yellow-200 hover:text-yellow-400" onClick={() => router.push("/home/shloka-contest")}>← Back to Shloka List</button>
        <h2 className="fancyTitle mb-4">{shloka.title}</h2>
        <img src={shloka.img} alt={shloka.title} className="rounded-xl w-40 h-40 object-cover border-2 border-yellow-200 mb-4" />
        <div className="mb-6 text-lg text-yellow-100 text-center">{shloka.content}</div>
        <div className="flex gap-4 mb-8">
          <button className="fancy-btn px-6 py-2 rounded-full bg-yellow-500 text-white font-bold shadow hover:bg-yellow-600" disabled={idx === 0} onClick={() => router.push(`/home/shloka-contest/${shlokaData[idx - 1].id}`)}>Previous</button>
          <button className="fancy-btn px-6 py-2 rounded-full bg-yellow-500 text-white font-bold shadow hover:bg-yellow-600" disabled={idx === shlokaData.length - 1} onClick={() => router.push(`/home/shloka-contest/${shlokaData[idx + 1].id}`)}>Next</button>
        </div>
        <button className="fancy-btn px-8 py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 mb-4" onClick={() => setShowTest(true)} disabled={showTest || submitted}>Take Test</button>
        {showTest && !submitted && (
          <form className="custom-form-glass flex flex-col gap-4 items-center w-full" onSubmit={handleTestSubmit}>
            <textarea className="input-fancy w-full min-h-[80px]" placeholder="What have you learnt from this shloka?" value={answer} onChange={e => setAnswer(e.target.value)} />
            {!userId && (
              <>
                <input className="input-fancy" name="name" type="text" placeholder="Your Name" value={userInfo.name} onChange={handleUserInfoChange} />
                <input className="input-fancy" name="mobile" type="tel" placeholder="Mobile Number" value={userInfo.mobile} onChange={handleUserInfoChange} />
                <select className="input-fancy" name="gender" value={userInfo.gender} onChange={handleUserInfoChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select className="input-fancy" name="maritalStatus" value={userInfo.maritalStatus} onChange={handleUserInfoChange}>
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
                <input className="input-fancy" name="address" type="text" placeholder="Address" value={userInfo.address} onChange={handleUserInfoChange} />
              </>
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button className="fancy-btn px-6 py-2 rounded-full bg-green-500 text-white font-bold shadow hover:bg-green-600 mt-2" type="submit">Submit</button>
          </form>
        )}
        {submitted && <div className="text-green-200 font-bold mt-4">Saved! Moving to next...</div>}
      </div>
    </div>
  );
}
