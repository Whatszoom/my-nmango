"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const addData = async () => {
    if (!input.trim()) return;

    await fetch("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    });

    setInput(""); // clear input

    const res = await fetch("/api/test");
    const updated = await res.json();
    setData(updated);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-black">
      <main className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Image src="/next.svg" alt="Next.js logo" width={100} height={20} />

          <h1 className="text-xl font-semibold">
            MongoDB Connected Mahadev Gydium EC2 Test File ✅
          </h1>
        </div>

        {/* Input + Button */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:border-zinc-700"
          />
          <button
            onClick={addData}
            className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Add
          </button>
        </div>

        {/* Data List */}
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {data.map((item, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800"
            >
              {item?.name}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
