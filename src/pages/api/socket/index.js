import { getSession } from "next-auth/react";
import { Server } from "socket.io";
import { addUser } from "../../../../utils/socketUsers";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function chatSocket(req, res) {
  const session = await getSession({ req });
  console.log(session, "socket sesssion");

  let io = res.socket.server.io;
  res.users = [];

  if (!io) {
    io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });
    io.users = [];
    res.socket.server.io = io;
  }
  io.on("connection", (socket) => {
    addUser(session?.user?.id, socket.id);
  });

  io.on("message", () => {
    console.log("test");
  });

  res.end();
}
