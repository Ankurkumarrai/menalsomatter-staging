import { useEffect, useState } from "react";

export default function Assets() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("/api/assets?status=approved");
      const data = await res.json();
      setAssets(data);
    };
    fetchAssets();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-navy">Approved Assets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="p-4 bg-white shadow rounded-xl">
            <h2 className="text-xl font-bold">{asset.title}</h2>
            <p className="text-gray-700">{asset.description}</p>
            <p className="text-sm text-gray-500">
              Tags: {asset.tags?.join(", ")}
            </p>
            {asset.file_url && (
              <a
                href={asset.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 underline mt-2 inline-block"
              >
                View File
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
