// pages/api/create-subscription-session.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "MenAlsoMatter Donation",
              description: "₹50 Donation & Raffle Entry",
            },
            unit_amount: 5000, // ₹50 = 5000 paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thankyou`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
}
