import formidable from "formidable";
import { supabase } from "../../utils/supabaseClient";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "File upload error" });

      const { title, description, tags } = fields;
      let file_url = null;

      // (Optional) File handling: skip for now, just save fields
      if (files.file) {
        file_url = files.file.originalFilename; // placeholder
      }

      const { data, error } = await supabase.from("ip_assets").insert([
        {
          title,
          description,
          tags: tags ? tags.split(",").map((t) => t.trim()) : [],
          file_url,
          status: "pending",
        },
      ]);

      if (error) return res.status(500).json({ error: error.message });
      res.status(200).json({ success: true, data });
    });
  } else if (req.method === "GET") {
    const status = req.query.status || "approved";
    const { data, error } = await supabase
      .from("ip_assets")
      .select("*")
      .eq("status", status);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
