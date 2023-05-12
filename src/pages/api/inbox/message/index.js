import Message from "../../../../../model/Message";
import { getUser } from "../../../../../utils/socketUsers";

export default async function message(req, res, query) {
  const { method, body } = req;
  if (method === "GET") {
    const message = await Message.find({ chat_id: req.query.id });
    res.send(message);
  } else if (method === "POST") {
    var message = new Message({
      chat_id: body.chat_id,
      receiver_id: body.receiver_id,
      sender_id: body.sender_id,
      message: body.message,
    });
    message = await message.save();
    if (res?.socket?.server?.io) {
      console.log("emit message", getUser(1));
      res.socket.server.io.emit("message", message);
    }
    res.send(message);
  }
}
