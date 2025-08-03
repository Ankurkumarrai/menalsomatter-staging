import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>Learn More | MenAlsoMatter</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-[#f1f5f9] px-4"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full flex flex-col items-center">
          <h1
            className="text-3xl font-bold mb-4 text-[#1E3A8A] text-center"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Learn More About MenAlsoMatter
          </h1>
          <section className="mb-6 text-gray-700 text-center">
            <h2 className="text-xl font-bold mb-2 text-[#1E3A8A]" style={{ fontFamily: "'Lato', sans-serif" }}>
              Our Mission
            </h2>
            <p>
              MenAlsoMatter is dedicated to men’s mental health, connection, and positive action. We provide a safe space for sharing stories, accessing resources, and supporting one another.
            </p>
          </section>
          <section className="mb-6 text-gray-700 text-center">
            <h2 className="text-xl font-bold mb-2 text-[#1E3A8A]" style={{ fontFamily: "'Lato', sans-serif" }}>
              How It Works
            </h2>
            <p>
              Contributors offer digital or physical goods—like courses, coaching, or e-books. Every sale supports our mission, and you can join raffles to win prizes while making a difference.
            </p>
          </section>
          <section className="mb-6 text-gray-700 text-center">
            <h2 className="text-xl font-bold mb-2 text-[#1E3A8A]" style={{ fontFamily: "'Lato', sans-serif" }}>
              Contributor Earnings
            </h2>
            <p>
              Contributors earn <span className="font-bold text-[#14B8A6]">80%</span> of each sale. MenAlsoMatter receives a <span className="font-bold text-[#14B8A6]">20%</span> commission to fund platform growth and outreach.
            </p>
          </section>
          <section className="mb-6 text-gray-700 text-center">
            <h2 className="text-xl font-bold mb-2 text-[#1E3A8A]" style={{ fontFamily: "'Lato', sans-serif" }}>
              What You Can Offer
            </h2>
            <ul className="list-disc list-inside text-left mx-auto max-w-sm">
              <li>Online courses</li>
              <li>Coaching sessions</li>
              <li>E-books & guides</li>
              <li>Physical goods</li>
              <li>Community support</li>
            </ul>
          </section>
          <section className="mb-6 text-gray-700 text-center">
            <h2 className="text-xl font-bold mb-2 text-[#1E3A8A]" style={{ fontFamily: "'Lato', sans-serif" }}>
              Community Voices
            </h2>
            <p>
              “MenAlsoMatter helped me find support and share my story.”<br />
              “The resources and community have made a real difference in my life.”
            </p>
          </section>
          <section className="mb-6 text-gray-700 text-center">
            <h2 className="text-xl font-bold mb-2 text-[#1E3A8A]" style={{ fontFamily: "'Lato', sans-serif" }}>
              Get Involved
            </h2>
            <p>
              Want to contribute, partner, or need help? <br />
              <a href="mailto:hello@menalsomatter.com" className="text-[#14B8A6] underline">Contact us</a> anytime.
            </p>
          </section>
          <Link
            href="/"
            className="mt-4 border border-[#1E3A8A] text-[#1E3A8A] px-6 py-3 rounded-lg hover:bg-[#f1f5f9] font-bold transition"
            style={{ fontFamily: "'Lato', sans-serif", background: "transparent" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}