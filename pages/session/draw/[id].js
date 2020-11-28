import * as React from "react";
import Head from "next/head";
import { useTimer } from "react-timer-hook";

import { getSessionById } from "../../../utils/fauna";
import { useIncrement } from "../../../hooks";

const Timer = ({ expiryTimestamp, onExpire, increment, decrement }) => {
  const {
    seconds,
    minutes,
    start,
    pause,
    isRunning,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => onExpire(),
  });
  return (
    <div className="relative flex flex-row-reverse items-center justify-center space-x-3">
      <span className="ml-5 text-xl font-medium">
        {minutes}:{seconds}
      </span>
      <span className="flex p-2 bg-gray-800 rounded-lg">
        <button onClick={increment} className="w-8 h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </span>
      <span className="flex p-2 bg-gray-800 rounded-lg">
        {isRunning ? (
          <button onClick={pause} className="w-8 h-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        ) : (
          <button onClick={resume} className="w-8 h-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
      </span>
      <span className="flex p-2 bg-gray-800 rounded-lg">
        <button onClick={decrement} className="w-8 h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </span>
    </div>
  );
};

export default function Draw({ session }) {
  const imageCount = session.data.session.images.length;
  const [activeIndex, { inc, dec, reset }] = useIncrement({
    maxValue: imageCount,
    minValue: 0,
    step: 1,
  });

  return (
    <div>
      <Head>
        <title>{session.data.session.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen text-white bg-gray-100">
        {activeIndex < session.data.session.images.length ? (
          <div className="w-full h-full">
            {session.data.session.images.map((image, idx) => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + image.time * 60);
              if (activeIndex === idx) {
                return (
                  <div key={idx} className="w-full h-full">
                    <div className="w-full h-full">
                      <img
                        src={image.image}
                        className="object-contain w-full h-full mx-auto"
                      />
                    </div>

                    <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
                      <div className="max-w-xl px-2 mx-auto sm:px-6 lg:px-8">
                        <div className="p-2 bg-gray-900 rounded-lg shadow-lg sm:p-3">
                          <div className="flex flex-wrap items-center justify-between">
                            <div className="flex items-center flex-1 w-0">
                              <Timer
                                expiryTimestamp={time}
                                onExpire={inc}
                                increment={inc}
                                decrement={dec}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return;
            })}
          </div>
        ) : (
          <div>
            <div>End of the line, jack</div>
            <button onClick={reset}>Restart</button>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;
    const session = await getSessionById(id);
    return {
      props: { session },
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/`);
    return { props: {} };
  }
}
