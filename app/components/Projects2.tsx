"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "../data2";
import { PinContainer } from "../ui/Pin";
import Link from "next/link";

const RecentProjects2 = () => {
  return (
    <div className="mb-20">
      <div className="grid-cols-1 md:grid-cols-2 flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw] no-underline"
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <PinContainer title={item.title}>
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <img src="/bg.png" alt="bgimg" />
                  </div>
                  <img
                    src={item.img}
                    alt="cover"
                    className="z-10 absolute bottom-0"
                  />
                </div>

                <h1 className="font-bold lg:text-2xl md:text-xl text-white line-clamp-1">
                  {item.title}
                </h1>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                >
                  {item.des}
                </p>

                <div className="flex justify-center items-center mt-7 mb-3">
                  <p className="flex lg:text-xl md:text-xs text-sm text-white">
                    Zum Projekt
                  </p>
                  <FaLocationArrow className="ml-3" color="#ffff" />
                </div>
              </PinContainer>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects2;
