import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

function signup() {
  const [input, setInput] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const data = {
        ...input,
        action: "",
      };
      console.log(data);

      const res = await axios.post("/api/user/", data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={(e) => login(e)}
        className="flex flex-col gap-3 justify-center items-center h-96 "
      >
        <div className="font-bold text-xl mb-3">signUp</div>
        <div>
          <input
            className="border border-gray-300 px-3 py-1 rounded "
            type="text"
            placeholder="Enter your Username"
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <input
            className="border border-gray-300 px-3 py-1 rounded "
            type="email"
            placeholder="Enter your email here"
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <input
            type="password"
            className="border border-gray-300 px-3 py-1 rounded"
            placeholder="Enter your Password here"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button
          type="submit"
          className=" block bg-gray-600 text-white font-medium hover:bg-gray-700 px-4 py-2 rounded"
        >
          SignUp
        </button>
      </form>
    </div>
  );
}

export default signup;
