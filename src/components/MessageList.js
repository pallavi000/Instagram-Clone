import React, { useEffect, useRef, useState } from "react";
import firstImg from "../images/fourth.jpg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import io from "socket.io-client";

function MessageList({ setMessages, messages, chat }) {
  const { data: session } = useSession();
  const [isSubmit, setIsSubmit] = useState(false);
  const [input, setInput] = useState("");
  const socket = useRef();

  async function connectSocket() {}

  // socket connect
  useEffect(() => {
    console.log("messagelist");
    if (!socket.current) {
      socket.current = io("http://localhost:3000", {
        path: "/api/socket",
      });
    }

    if (socket.current) {
      socket.current.on("connect", () => {
        socket.current.emit("addUser", session.user);
      });

      socket.current.on("receiveMessage", (message) => {
        setMessages((prev) => {
          var find = prev.find((m) => m._id === message._id);
          if (find) {
            return prev;
          } else {
            return [...prev, message];
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    if (input.length > 0) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [input]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const data = {
        message: input,
        sender_id: session.user.id,
        receiver_id: chat.participants[0]._id,
        chat_id: chat._id,
      };
      const res = await axios.post("/inbox/message", data);
      setMessages((prev) => [...prev, res.data]);
      setInput("");
      socket.current.emit("sendMessage", res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" col-span-3 relative ">
      <div className="flex items-center justify-between border-b border-gray-200 py-5 px-8 mb-6 relative">
        <div className="flex justify-center items-center gap-2">
          <div className="rounded-full relative h-8 w-8  border-blue-950 border-2 ">
            <Image
              src={firstImg}
              alt="Example Image"
              layout="responsive"
              height={32}
              width={32}
              className="rounded-full  object-cover  ig-message-profile"
            />
          </div>
          <div className="  font-bold capitalize">
            {chat.participants[0].name}
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>
      </div>

      <div className="message-list  justify-between px-4 overflow-y-scroll h-[399px] ">
        {messages.map((message) => {
          return session?.user?.id !== message?.sender_id ||
            session?.user?.id !== message?.sender_id ? (
            <div className="flex  gap-2 items-center mb-4">
              <div className="rounded-full relative h-8 w-8  border-blue-950 border-2 ">
                <Image
                  src={firstImg}
                  alt="Example Image"
                  layout="responsive"
                  height={32}
                  width={32}
                  className="rounded-full  object-cover  ig-message-profile"
                />
              </div>
              <div className="border border-gray-200 px-4 py-3 text-sm  rounded-2xl h-fit w-fit">
                {message.message}
              </div>
            </div>
          ) : (
            <div>
              <div className=" bg-gray-200  px-4 py-3 text-sm  rounded-lg   h-fit mb-4 w-fit ml-auto">
                {message.message}
              </div>
            </div>
          );
        })}
      </div>

      <div className="message-input   absolute bottom-4  w-full  ">
        <form
          onSubmit={(e) => sendMessage(e)}
          className="mx-4 grid grid-cols-8 gap-2 rounded-3xl p-4 border border-gray-400"
        >
          <div className="col-span-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </div>
          <input
            className="col-span-6 outline-0 border-0 text-sm text-gray-600"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
            value={input}
          ></input>
          {isSubmit ? (
            <button
              type="submit"
              className="col-span-1 text-blue-400 font-medium  "
            >
              Send
            </button>
          ) : (
            <div className="col-span-1 flex items-center gap-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default MessageList;
