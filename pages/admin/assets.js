import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient"; // adjust path if different

export default function AdminAssetsPage() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const { data, error } = await supabase.from("ip_assets").select("*");
    if (error) console.error(error);
    else setAssets(data);
  };

  const updateStatus = async (id, status) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("ip_assets")
      .update({
        status,
        approved_by: user?.id,
        approved_at: new Date(),
      })
      .eq("id", id);

    if (error) console.error(error);
    else fetchAssets();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Asset Approvals</h2>
      <div className="space-y-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="p-4 bg-white shadow rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{asset.title}</h3>
              <p className="text-gray-600">{asset.description}</p>
              <p className="text-sm text-[#14B8A6]">{asset.tags?.join(", ")}</p>
              {asset.file_url && (
                <a
                  href={asset.file_url}
                  target="_blank"
                  className="text-blue-600 text-sm underline"
                >
                  View File
                </a>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => updateStatus(asset.id, "approved")}
                className="bg-[#1E3A8A] text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(asset.id, "rejected")}
                className="border border-[#14B8A6] text-[#14B8A6] px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
