import { getSession } from "next-auth/react";
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const users = [];

export const addUser = (userId, socketId) => {
  const userIndex = users.findIndex((user) => user.userId === userId);
  if (userIndex !== -1) {
    users[userIndex].socketId = socketId;
  } else {
    users.push({
      userId,
      socketId,
    });
  }
};

const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index != -1) {
    users.splice(index, 1);
  }
};

export const getUser = (userId) => {
  const user = users.find((user) => user.userId === userId);
  return user;
};

export default async function chatSocket(req, res) {
  let io = res.socket.server.io;

  if (!io) {
    io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    res.socket.server.io = io;
  }
  io.on("connect", (socket) => {
    socket.on("addUser", (user) => {
      addUser(user.id, socket.id);
    });
    socket.on("sendMessage", (message) => {
      const user = getUser(message.receiver_id);
      console.log(user, message.receiver_id, "receiverrrrrrrrrrrrrrrrrrrrrrr");
      if (user) {
        io.to(user.socketId).emit("receiveMessage", message);
      }
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log(`disconnect ${socket.id}`);
    });
  });

  res.end();
}
