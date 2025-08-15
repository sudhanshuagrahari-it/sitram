"use client";
import "../home-custom.css";
import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";
import { isValidPhoneNumber } from "libphonenumber-js";

export default function BhagavadGitaPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    gender: "",
    address: "",
    maritalStatus: "",
    language: ""
  });
  const [showForm, setShowForm] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check localStorage for user details
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setForm((f) => ({ ...f, language: "" }));
        setShowForm(true); // still ask for language
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function isValidIndianMobile(mobile: string) {
      // Remove spaces, dashes, etc.
      const cleaned = mobile.replace(/\D/g, "");
      // Static check: 10 digits, starts with 6-9
      if (!/^([6-9][0-9]{9})$/.test(cleaned)) return false;
      // Library check (libphonenumber-js)
      try {
        return isValidPhoneNumber(cleaned, 'IN');
      } catch {
        return false;
      }

      // import { isValidPhoneNumber } from "libphonenumber-js";
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      let userInfo = user;
      if (!user) {
        // Save user info in localStorage
        userInfo = { ...form };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
      // Check if already registered (by mobile+language)
      const checkRes = await fetch(`/api/bhagavad-gita/check?mobile=${encodeURIComponent(userInfo.mobile)}&language=${encodeURIComponent(form.language)}`);
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        if (checkData.exists) {
          setAlreadyRegistered(true);
          setShowForm(false);
          setSubmitting(false);
          return;
        }
      }
      // Save registration (user + language) in DB
      const res = await fetch("/api/bhagavad-gita/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userInfo,
          language: form.language
        })
      });
      if (!res.ok) throw new Error("Failed to register");
      setSuccess(true);
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="content-overlay">
      <div className="homeCustomBox flex flex-col items-center mx-auto">
        <button className="back-btn" onClick={() => router.push("/home")}>← Back to Home</button>
        <h2>Join ISKCON Bhagavad Gita Classes</h2>
        <p>Register for Bhagavad Gita Course!</p>
        {showForm && (
          <form onSubmit={handleSubmit} className="gita-form" style={{ width: "100%", maxWidth: 400, margin: "1.5rem auto" }}>
            {!user && (
              <>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="option optionFancy optionFull" required />
                <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" className="option optionFancy optionFull" required 
                maxLength={10}
              pattern="[6-9]{1}[0-9]{9}"
              inputMode="numeric"
                />
                <select name="gender" value={form.gender} onChange={handleChange} className="option optionFancy optionFull" required>
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
    
                </select>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="option optionFancy optionFull" required />
                <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="option optionFancy optionFull" required>
                  <option value="">Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </>
            )}
            <select name="language" value={form.language} onChange={handleChange} className="option optionFancy optionFull" required>
              <option value="">Preferred Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Telugu">Telugu</option>
            </select>
            <button type="submit" className="option optionFancy optionFull" disabled={submitting} style={{ marginTop: 12 }}>
              {submitting ? "Registering..." : "Register"}
            </button>
            {error && <div style={{ color: "#e53935", marginTop: 8 }}>{error}</div>}
          </form>
        )}
        {alreadyRegistered && (
          <div style={{ color: '#bfa100', fontWeight: 600, margin: '1.5rem 0', textAlign: 'center' }}>
            Thanks! You are already registered.<br />We will reach out to you shortly.
          </div>
        )}
        {success && (
          <div style={{ color: '#43a047', fontWeight: 600, margin: '1.5rem 0', textAlign: 'center' }}>
            Thanks for registering!<br />We will reach out to you shortly.
          </div>
        )}
      </div>
    </div>
  );
}


