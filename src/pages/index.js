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

export default function Home() {
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

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className=" col-span-1 border-r-gray-200 border-r h-screen py-8 ">
        <Sidebar />
      </div>
      <div className="col-span-3 py-8 px-2">
        <div className=" flex items-center h-fit gap-4">
          {images.map((img) => {
            return (
              <div className="flex flex-col gap-2 items-center">
                <div className="rounded-full relative h-16 w-16 top-0 border-blue-950 border-2 ">
                  <Image
                    src={img.img}
                    alt="Example Image"
                    layout="responsive"
                    height={64}
                    width={64}
                    className="rounded-full  object-cover  ig-story"
                  />
                </div>
                <div className="text-xs">{img.name}</div>
              </div>
            );
          })}
        </div>
        <div className=" px-8 mt-14">
          <div className="flex justify-between items-center bg-white ">
            <div className="flex justify-center items-center gap-2">
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
              <div className="text-sm text-gray-600 font-bold">user</div>
            </div>
            <div className="font-bold text-gray-600 ">...</div>
          </div>

          <div className="mt-4 post-img-container shadow-sm ">
            <Image
              src={postImg}
              alt="Example Image"
              layout="responsive"
              height="100%"
              width="100%"
              className="rounded-sm  post-img"
            />
          </div>
        </div>
        <div className=" px-8 mt-14">
          <div className="flex justify-between items-center bg-white ">
            <div className="flex justify-center items-center gap-2">
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
              <div className="text-sm text-gray-600 font-bold">user</div>
            </div>
            <div className="font-bold text-gray-600 ">...</div>
          </div>
          <div className="mt-4 post-img-container shadow-sm ">
            <Image
              src={post1Img}
              alt="Example Image"
              layout="responsive"
              height="100%"
              width="100%"
              className="rounded-sm  post-img"
            />
          </div>
        </div>
        <div className=" px-8 mt-14">
          <div className="flex justify-between items-center bg-white ">
            <div className="flex justify-center items-center gap-2">
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
              <div className="text-sm text-gray-600 font-bold">user</div>
            </div>
            <div className="font-bold text-gray-600 ">...</div>
          </div>
          <div className="mt-4 post-img-container shadow-sm ">
            <Image
              src={post2Img}
              alt="Example Image"
              layout="responsive"
              height="100%"
              width="100%"
              className="rounded-sm  post-img"
            />
          </div>
        </div>
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

      <CreateModal />
    </div>
  );
}
