import { supabase } from "../../../utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, admin_id } = req.body;

  const { data, error } = await supabase
    .from("ip_assets")
    .update({
      status: "rejected",
      approved_by: admin_id || null,
      approved_at: new Date(),
    })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ success: true, data });
}
