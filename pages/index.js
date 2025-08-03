// pages/index.js
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
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
        className="min-h-screen bg-[#f1f5f9] text-gray-900 px-6 py-12 flex flex-col items-center"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full flex flex-col items-center">
          <h1
            className="text-4xl font-bold text-[#1E3A8A] mb-4 text-center"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Welcome to MenAlsoMatter
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl text-center mb-6">
            A wellness and support platform dedicated to men’s mental health,
            community stories, and practical resources—promoting connection,
            openness, and positive action.
          </p>
          <div className="flex gap-4 mb-6 w-full justify-center">
            <button
              onClick={handleDonate}
              disabled={loading}
              className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg shadow hover:bg-[#3749ac] font-bold w-1/2 text-center transition"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {loading ? "Redirecting..." : "Donate / Join Raffle"}
            </button>
            <Link
              href="/about"
              className="border border-[#1E3A8A] px-6 py-3 rounded-lg hover:bg-[#f1f5f9] font-bold w-1/2 text-center transition"
              style={{ fontFamily: "'Lato', sans-serif", background: "transparent" }}
            >
              Learn More
            </Link>
          </div>
          <div className="w-full flex flex-col items-center mb-6">
            <div className="w-full h-2 bg-[#e5e7eb] rounded-full mb-2">
              <div className="h-2 bg-[#14B8A6] rounded-full" style={{ width: "30%" }} />
            </div>
            <span className="text-sm text-[#14B8A6] font-semibold">30% of raffle entries claimed!</span>
          </div>
          <div className="mt-4">
            <Image
              src="/hero-mental-health.svg"
              alt="Mental Health"
              width={400}
              height={250}
            />
          </div>
        </div>
      </div>
    </>
  );
}
