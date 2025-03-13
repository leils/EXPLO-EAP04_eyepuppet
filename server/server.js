const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server); // Attach Socket.io

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "../public")));

// Routes for pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/controller", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/controller.html"));
});

// Handle WebSocket connections
io.on("connection", (socket) => {
    console.log("⚡ New client connected:", socket.id);

    // Listen for video change request from controller
    socket.on("playSequence", (message) => {
        console.log(`🎥 Changing video to: ${message}`);
        
        // Broadcast to all video players
        io.emit("playSequence", message);
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
