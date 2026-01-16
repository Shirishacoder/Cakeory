import React, { useState } from "react";

const CreateImg = ({ onImagesGenerated, onGenerateStart }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    console.log("Server response:", data); // Debug log

    if (data.image) {
      // Pass prompt along with url to fix "Select" button
      onImagesGenerated([{ url: data.image, prompt: prompt }]);
    } else if (data.images && data.images.length > 0) {
      onImagesGenerated(data.images.map((img) => ({ url: img, prompt: prompt })));
    }
  } catch (e) {
    alert("Backend call failed");
    console.error(e);
  }

  setLoading(false);
};

  return (
    <div className="space-y-4">
      <input
        className="border p-3 w-full rounded"
        placeholder="Describe cake design"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
  onClick={generateImage}
  disabled={loading}
  className="bg-[rgba(224,99,99,0.85)] text-white px-6 py-2 rounded hover:bg-amber-700 transition-colors disabled:opacity-50 font-parastoo"
>
  {loading ? "Generating..." : "Generate"}
</button>

    </div>
  );
};

export default CreateImg;