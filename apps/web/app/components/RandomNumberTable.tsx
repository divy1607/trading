'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';

interface RandomNumber {
  id: number;
  number: number;
  timeStamp: string;
}

function RandomNumberTable() {
  const { data: session } = useSession();
  const [numbers, setNumbers] = useState<RandomNumber[]>([]);
  const [status, setStatus] = useState('Connecting...');

  useEffect(() => {
    if (!session) return;

    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
      setStatus('Connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNumbers(prev => [...prev, data]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus('Error connecting');
    };

    ws.onclose = () => {
      setStatus('Disconnected');
    };

    return () => ws.close();
  }, [session]);

  return (
    <div className="mt-4">
      <p className="mb-2">Status: {status}</p>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Time</th>
            <th className="border p-2">Random Number</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((number) => (
            <tr key={number.id}>
              <td className="border p-2">
                {new Date(number.timeStamp).toLocaleString()}
              </td>
              <td className="border p-2">{number.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RandomNumberDisplay() {
  return (
    <SessionProvider>
      <RandomNumberTable />
    </SessionProvider>
  )
}