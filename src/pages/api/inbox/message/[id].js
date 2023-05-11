import Message from "../../../../../model/Message";

export default async function message(req, res, query) {
  console.log(req.query, "query");
  const { method, body } = req;
  if (method === "GET") {
    const message = await Message.find({ chat_id: req.query.id });
    res.send(message);
    console.log(message);
  }
}
