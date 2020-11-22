import * as React from "react";
import Head from "next/head";
import { useTimer } from "react-timer-hook";

import { getSessionById } from "../../../utils/fauna";
import { useIncrement } from "../../../hooks";

const Timer = ({ expiryTimestamp, onExpire }) => {
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
    <div className="relative flex flex-col items-center justify-center">
      <span className="absolute font-bold -top-6">
        {minutes}:{seconds}
      </span>
      {isRunning ? (
        <button onClick={pause} className="w-10 h-10">
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
        <button onClick={resume} className="w-10 h-10">
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
    </div>
  );
};

export default function Draw({ session }) {
  const imageCount = session.data.session.length;
  const [activeIndex, { inc, dec, reset }] = useIncrement({
    maxValue: imageCount,
    minValue: 0,
    step: 1,
  });

  return (
    <div>
      <Head>
        <title>Draw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen text-white bg-gray-100">
        {activeIndex < session.data.session.length ? (
          <div className="w-full h-full">
            {session.data.session.map((image, idx) => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + image.time * 60); // 10 minutes timer
              if (activeIndex === idx) {
                return (
                  <div key={idx} className="w-full h-full">
                    <div className="w-full h-full">
                      <img
                        src={image.image}
                        className="object-contain w-full h-full mx-auto"
                      />
                    </div>

                    <div className="fixed inset-x-0 bottom-0 flex items-center justify-center px-10 py-5 pt-10 transition duration-150 hover:text-gray-700 hover:bg-gray-100">
                      <button onClick={dec} className="w-7 h-7">
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
                      <Timer expiryTimestamp={time} onExpire={inc} />
                      <button onClick={inc} className="w-7 h-7">
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
