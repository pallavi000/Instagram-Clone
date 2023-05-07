import React, { useEffect, useState } from "react";
import firstImg from "../images/first.jpg";
import Image from "next/image";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

function CreateModal({ setShowModal }) {
  const { data: session } = useSession();
  console.log(session);
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    activeInput();
  }, []);
  console.log(caption, photo);

  const activeInput = () => {
    document.addEventListener("DOMContentLoaded", function () {
      var input = document.getElementById("postInput");
      input.click();
    });
  };

  async function addPost(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("caption", caption);
      data.append("image", photo);
      data.append("user_id", session?.user?.id);
      const res = await axios.post("/api/post", data);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black   bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
      <div
        className="text-white font-bold absolute top-10 right-10"
        onClick={() => setShowModal(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 bold cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="bg-white rounded-lg  font-bold w-1/3 py-4 z-50">
        <div className="font-medium text-black text-md self-center flex justify-center pb-4 border-b border-gray-300">
          Create new post
        </div>
        <form className=" py-8 px-4" onSubmit={(e) => addPost(e)}>
          <div className="flex  flex-col  gap-3">
            <div className="flex  items-center gap-2">
              <div className="rounded-full relative h-10 w-10  border-blue-950 border-2 ">
                <Image
                  src={firstImg}
                  alt="Example Image"
                  layout="responsive"
                  height={64}
                  width={64}
                  className="rounded-full  object-cover  ig-user-profile"
                />
              </div>
              <div className="text-sm text-gray-600 font-bold">
                Pallavi bhattarai
              </div>
            </div>
            <input
              type="text"
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's on your mind ?"
              id="postInput"
              className="border-0 text-sm font-normal outline-none "
            />
            <div className="flex flex-col justify-center items-center py-4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <input
                type="file"
                id="post-img"
                className="invisible"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              <label
                className="text-xl font-normal cursor-pointer"
                for="post-img"
              >
                Drag photos and videos here
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-400 text-white font-medium w-full p-1 flex justify-center self-center rounded-md mt-4 cursor-pointer"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateModal;
