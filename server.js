const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let currentVideo = "/videos/blink2.mp4"; // Default video

wss.on("connection", (ws) => {
    ws.send(currentVideo); // Send the correct file path

    ws.on("message", (message) => {
        currentVideo = message;
        console.log(message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(currentVideo); // Send the full path
            }
        });
    });
});

console.log("WebSocket server running on ws://localhost:8080");
