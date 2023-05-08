import Image from "next/image";
import { Inter } from "next/font/google";
import firstImg from "../images/first.jpg";
import secondImg from "../images/second.jpg";
import thirdImg from "../images/third.jpg";
import fourthImg from "../images/fourth.jpg";
import postImg from "../images/post.jpg";
import post1Img from "../images/post1.jpg";
import post2Img from "../images/post2.jpg";
import Sidebar from "@/components/Sidebar";
import CreateModal from "@/components/CreateModal";
import { useEffect, useState } from "react";
import dbConnect from "../../utils/dbConnect";
import Post from "../../model/Post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import signin from "./auth/signin";
import Story from "@/components/Story";
import PostComp from "@/components/PostComp";

export default function Home({ data }) {
  const { data: session, status } = useSession();
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  console.log(status, "dattttttttttttttttttttttttttttttt");
  const [showModal, setShowModal] = useState(false);
  const posts = data;
  const images = [
    {
      name: "first",
      img: firstImg,
    },
    {
      name: "second",
      img: secondImg,
    },
    {
      name: "third",
      img: thirdImg,
    },
    {
      name: "fourth",
      img: fourthImg,
    },
    {
      name: "first",
      img: firstImg,
    },
    {
      name: "second",
      img: secondImg,
    },
    {
      name: "third",
      img: thirdImg,
    },
    {
      name: "fourth",
      img: fourthImg,
    },
  ];

  useEffect(() => {
    if (status !== "loading" && status !== "authenticated") {
      router.push("/auth/signin");
    }
  }, [status]);
  if (status === "loading") {
    return null;
  }

  return (
    <div className="col-span-5 grid grid-cols-5 overflow-y-auto h-screen">
      <div className="  col-span-3 py-6 px-2">
        <div className=" flex items-center h-fit gap-4">
          {images.map((img) => {
            return <Story img={img} />;
          })}
        </div>
        {posts.map((post) => {
          return <PostComp post={post} />;
        })}
      </div>

      <div className="col-span-2 mt-8 px-8">
        <div className="flex justify-between items-center bg-white ">
          <div className="flex justify-center items-center gap-2">
            <div className="rounded-full relative h-16 w-16  ">
              <Image
                src={firstImg}
                alt="Example Image"
                layout="responsive"
                height={64}
                width={64}
                className="rounded-full  object-cover  main-round-profile"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="text-md text-black font-medium">
                Pallavi Bhattari
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Pallavi Bhattari
              </div>
            </div>
          </div>
          <div className="text-md font-medium text-blue-400 ">Switch</div>
        </div>
        <div className="flex justify-between items-center mt-4 mb-6">
          <div className="text-md font-medium text-gray-500">
            Suggested for you
          </div>
          <div className="text-black text-sm">See All</div>
        </div>

        <div className="flex justify-between items-center bg-white mb-4 ">
          <div className="flex justify-center items-center gap-2">
            <div className="rounded-full relative h-10 w-10  ">
              <Image
                src={firstImg}
                alt="Example Image"
                layout="responsive"
                height={32}
                width={32}
                className="rounded-full  object-cover  ig-user-profile"
              />
            </div>
            <div className="flex flex-col justify-center items-start text-sm">
              <div className=" text-black font-medium">Pallavi Bhattari</div>
              <div className=" text-gray-500 font-medium">Pallavi Bhattari</div>
            </div>
          </div>
          <div className="text-md font-medium text-blue-400 ">Follow</div>
        </div>
        <div className="flex justify-between items-center bg-white mb-4 ">
          <div className="flex justify-center items-center gap-2">
            <div className="rounded-full relative h-10 w-10  ">
              <Image
                src={firstImg}
                alt="Example Image"
                layout="responsive"
                height={32}
                width={32}
                className="rounded-full  object-cover  ig-user-profile"
              />
            </div>
            <div className="flex flex-col justify-center items-start text-sm">
              <div className=" text-black font-medium">Pallavi Bhattari</div>
              <div className=" text-gray-500 font-medium">Pallavi Bhattari</div>
            </div>
          </div>
          <div className="text-md font-medium text-blue-400 ">Follow</div>
        </div>
      </div>
      {showModal && (
        <CreateModal setShowModal={setShowModal} showModal={showModal} />
      )}
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const posts = await Post.find().populate("user_id").lean();
  let serializedPosts = JSON.parse(JSON.stringify(posts));
  console.log(serializedPosts);

  return {
    props: {
      data: serializedPosts,
    },
  };
}
