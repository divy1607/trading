import { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`✅ WebSocket server started on ws://localhost:${PORT}`);

function generateAndSendNumber() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const data = {
        number: randomNumber,
        timeStamp: new Date().toISOString(),
    };

    console.log("Generated:", data);

    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(data));
        }
    });
}

setInterval(generateAndSendNumber, 5000);

wss.on("connection", (ws) => {
    console.log("🔗 New client connected");

    ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));

    ws.on("close", () => {
        console.log("❌ Client disconnected");
    });
});
