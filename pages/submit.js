import { useState } from "react";

export default function Submit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      if (file) formData.append("file", file);

      const res = await fetch("/api/assets", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Asset submitted successfully (pending approval).");
        setTitle("");
        setDescription("");
        setTags("");
        setFile(null);
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (err) {
      setMessage("❌ Error submitting asset.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-navy">Submit Asset</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="file"
          className="w-full border p-2 rounded"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-white py-2 rounded hover:bg-blue-900"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
