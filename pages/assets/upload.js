import { useState } from "react";
import { supabase } from "../../utils/supabaseClient"; // adjust path if different

export default function AssetUploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    let fileUrl = null;
    if (file) {
      const { data, error } = await supabase.storage
        .from("assets")
        .upload(`uploads/${Date.now()}-${file.name}`, file);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
      fileUrl = data?.path;
    }

    const { error } = await supabase.from("ip_assets").insert([
      {
        title,
        description,
        tags: tags.split(",").map((t) => t.trim()),
        file_url: fileUrl,
      },
    ]);

    if (error) alert(error.message);
    else alert("Asset submitted successfully!");

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
        Upload New Asset
      </h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1E3A8A] text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
