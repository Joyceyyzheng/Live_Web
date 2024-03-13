// Express is a node module for building HTTP servers
const express = require("express");
const app = express();

// Tell Express to look in the "public" folder for any files first
app.use(express.static("public"));

// If the user just goes to the "route" / then run this function
app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Here is the actual HTTP server
var http = require("http");
// We pass in the Express object
var httpServer = http.createServer(app);
// Listen on port 80 - default http port
httpServer.listen(80);

// WebSocket Portion
// WebSockets work with the HTTP server
const io = require("socket.io")(httpServer);

let messages = [];

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on(
  "connection",
  // We are given a websocket object in our function
  function (socket) {
    console.log("We have a new client: " + socket.id);

    for (let i = 0; i < messages.length; i++) {
      socket.emit("chatmessage", messages[i]);
    }

    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on("chatmessage", function (data) {
      // Data comes in as whatever was sent, including objects
      console.log("Received: 'chatmessage' " + data);

      //store the data
      messages.push(data);

      // Send it to all of the clients
      // socket.broadcast.emit("chatmessage", data);
      //send to literally everybody(including yourself)
      io.emit("chatmessage", data);
    });

    socket.on("click", function (data) {
      io.emit("click", {});
    });

    socket.on("disconnect", function () {
      console.log("Client has disconnected " + socket.id);
    });
  }
);
