"use client";
import { useEffect, useState } from "react";

export default function WebSocketClient() {
  const [data, setData] = useState<{ number: number; timeStamp: string } | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      console.log("📩 Received:", receivedData);
      setData(receivedData);
    };

    ws.onclose = () => {
      console.log("❌ Disconnected from WebSocket server");
    };

    return () => ws.close();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">Real-Time WebSocket Data</h2>
      {data ? (
        <div>
          <p className="text-xl">🔢 Number: <strong>{data.number}</strong></p>
          <p className="text-sm text-gray-600">⏳ Timestamp: {new Date(data.timeStamp).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p className="text-gray-500">Waiting for data...</p>
      )}
    </div>
  );
}
