const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let currentVideo = "/videos/sleep-cycle.mp4"; // Default video
let startMessage = {
    type: "loop",
    path: currentVideo
}

wss.on("connection", (ws) => {
    ws.send(JSON.stringify(startMessage)); // Send default start video

    ws.on("message", (message) => {
        console.log(JSON.parse(message));
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); 
            }
        });
    });
});

console.log("WebSocket server running on ws://localhost:8080");
