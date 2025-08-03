// pages/donate.js
import { useState } from "react";
import Head from "next/head";

export default function Donate() {
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-subscription-session", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error creating Stripe session.");
      }
    } catch (err) {
      alert("Payment failed.");
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-[#f1f5f9] px-4"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
          <h1
            className="text-3xl font-bold mb-2 text-[#1E3A8A] text-center"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Support MenAlsoMatter
          </h1>
          <p className="text-gray-700 mb-6 text-center">
            Donate ₹50 to enter the raffle and support men’s mental health. Every entry increases your odds!
          </p>
          <button
            onClick={handleDonate}
            disabled={loading}
            className="bg-[#1E3A8A] text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-[#3749ac] transition mb-3 w-full"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {loading ? "Redirecting..." : "Donate / Join Raffle"}
          </button>
          <button
            className="border border-[#1E3A8A] text-[#1E3A8A] px-6 py-3 rounded-lg hover:bg-[#e0e7ef] transition w-full"
            style={{ fontFamily: "'Lato', sans-serif", background: "transparent" }}
            onClick={() => window.location.href = "/about"}
          >
            Learn More
          </button>
          <div className="mt-6 w-full flex flex-col items-center">
            <div className="w-full h-2 bg-[#e5e7eb] rounded-full mb-2">
              <div className="h-2 bg-[#14B8A6] rounded-full" style={{ width: "30%" }} />
            </div>
            <span className="text-sm text-[#14B8A6] font-semibold">30% of raffle entries claimed!</span>
          </div>
        </div>
      </div>
    </>
  );
}
