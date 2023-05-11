import Message from "../../../../../model/Message";

export default async function message(req, res, query) {
  console.log(req.query, "query");
  const { method, body } = req;
  if (method === "GET") {
    const message = await Message.find({ chat_id: req.query.id });
    res.send(message);
    console.log(message);
  } else if (method === "POST") {
    var message = new Message({
      chat_id: body.chat_id,
      receiver_id: body.receiver_id,
      sender_id: body.sender_id,
      message: body.message,
    });
    message = await message.save();
    res.send(message);
  }
}
