import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data: sessions } = useSWR("/api/sessions");

  return (
    <div className="min-h-screen px-4 py-5 bg-gray-100 sm:p-6">
      <div className="container max-w-5xl mx-auto">
        <Head>
          <title>Artsy Fartsy</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="">
          {/* Section Header start */}
          <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
            <h1 className="text-lg font-medium leading-6 text-gray-900">
              All Sessions
            </h1>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <Link href="/all-images">
                <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Create new session
                </a>
              </Link>
            </div>
          </div>
          {/* Section header end */}

          <div className="mt-5 overflow-hidden bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {sessions &&
                sessions.map((session) => {
                  let duration = 0;
                  let imageCount = session.data.session.length;
                  session.data.session.map((image) => {
                    const imageTime = parseInt(image.time);
                    duration += imageTime;
                  });
                  return (
                    <li key={session.id}>
                      <Link href={`/draw/${session.id}`}>
                        <a className="block hover:bg-gray-50">
                          <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                              <div>
                                <div className="flex text-sm font-medium text-indigo-600 truncate">
                                  <p className="capitalize">Wonderful title</p>
                                  <p className="ml-1 font-normal text-gray-500">
                                    {imageCount} images
                                  </p>
                                </div>
                                <div className="flex mt-2">
                                  <div className="flex items-center text-sm text-gray-500">
                                    <svg
                                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <p>
                                      Estimated Duration:{" "}
                                      <span className="font-medium">
                                        {duration}
                                      </span>{" "}
                                      minutes
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-shrink-0 mt-4 sm:mt-0">
                                <div className="flex overflow-hidden">
                                  {session.data.session.map((image, idx) => {
                                    if (idx === 0) {
                                      return (
                                        <img
                                          key={idx}
                                          className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                                          src={image.image}
                                          alt="hello"
                                        />
                                      );
                                    } else {
                                      return (
                                        <img
                                          key={idx}
                                          className="inline-block w-6 h-6 -ml-1 rounded-full ring-2 ring-white"
                                          src={image.image}
                                          alt="hello"
                                        />
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ml-5">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
