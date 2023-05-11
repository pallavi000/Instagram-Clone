import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import logoImg from "../../images/instagram.png";
import Image from "next/image";
import firstImg from "../../images/first.jpg";
import secondImg from "../../images/second.jpg";
import thirdImg from "../../images/third.jpg";
import fourthImg from "../../images/fourth.jpg";
import Link from "next/link";

function signup() {
  const [input, setInput] = useState({});
  const router = useRouter();
  const [currentImg, setCurrentImg] = useState("");

  const images = [firstImg, secondImg, thirdImg, fourthImg];

  const changeImage = () => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentImg(images[randomIndex]);
    }, 1000); // Delay for 1 second
  };

  useEffect(() => {
    changeImage();
  }, [currentImg]);

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

      const res = await axios.post("/user/", data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen col-span-6">
      <div className="image-container ">
        <div className="insta-img">
          <Image
            src={currentImg}
            alt="Example Image"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="login-form">
        <form onSubmit={(e) => login(e)} className="  px-8 py-8  border">
          <div className="flex flex-col gap-6 justify-center items-center">
            <div className="font-bold text-xl my-2">
              <Image
                src={logoImg}
                alt="Example Image"
                layout="responsive"
                width={500}
                height={500}
              />
            </div>
            <div className="w-full">
              <input
                className="border border-gray-300 px-3 py-2 rounded text-gray-500 text-sm bg-gray-50 outline-none w-full focus:bg-gray-50 "
                type="text"
                placeholder="Full name"
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full">
              <input
                className="border border-gray-300 px-3 py-2 rounded text-gray-500 text-sm bg-gray-50 outline-none w-full focus:bg-gray-50 "
                type="email"
                placeholder="Phone number, username, email,"
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                className="border border-gray-300 px-3 py-2 text-gray-500 text-sm rounded bg-gray-50 outline-none w-full"
                placeholder="password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              type="submit"
              className=" block bg-blue-400 text-white font-medium hover:bg-blue-300 px-4 py-1 rounded-md w-full"
            >
              {" "}
              Sign Up
            </button>
          </div>
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="border-b border-gray-300  w-full "></div>
            <div className="font-medium text-gray-500">OR</div>
            <div className="border-b border-gray-300  w-full"></div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="font-medium text-cyan-600 cursor-pointer">
              Login with facebook
            </div>
          </div>
          <div className="text-xs text-blue-700 self-center flex justify-center items-center mt-4 cursor-pointer">
            Forgot password ?{" "}
          </div>
        </form>
        <div className="  px-4 py-6  border mt-8 self-center flex justify-center">
          <div className="">
            have an account?{" "}
            <Link
              href={"/auth/signin"}
              className="text-blue-400 font-medium cursor-pointer"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signup;
