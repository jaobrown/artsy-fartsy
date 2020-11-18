import * as React from "react";
import Head from "next/head";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const onDrop = React.useCallback((acceptedFiles) => {
    console.log("Home -> acceptedFiles", acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="bg-gray-200 overflow-hidden rounded-lg min-h-screen">
      <div className="px-4 py-5 sm:p-6">
        <div className="container mx-auto">
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <div>
              <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Artsy Fartsy
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      This is a retry of the first attempt.
                    </p>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="" method="POST">
                      <div {...getRootProps()}>
                        <label className="block text-sm leading-5 font-medium text-gray-700">
                          Photo Upload
                        </label>
                        <input
                          {...getInputProps()}
                          className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                        />
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {isDragActive ? (
                              <p className="mt-1 text-sm text-gray-600">
                                Drop the files here ...
                              </p>
                            ) : (
                              <p className="mt-1 text-sm text-gray-600">
                                <button className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                                  Click here
                                </button>{" "}
                                or drop files to upload
                              </p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
