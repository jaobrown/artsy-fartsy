import * as React from "react";
import Head from "next/head";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const uploadHandler = (files) => {
    const url = `https://api.cloudinary.com/v1_1/koda-studio/image/upload`;
    const formData = new FormData();
    files.map((file) => {
      formData.append("file", file);
      formData.append("upload_preset", "unsigned");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          console.log(data);
        });
    });
  };

  const onDrop = React.useCallback((acceptedFiles) => {
    uploadHandler(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="min-h-screen overflow-hidden bg-gray-100 rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="container max-w-5xl mx-auto">
          <Head>
            <title>Artsy Fartsy</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="space-y-5">
            {/* Uploader Start */}
            <div className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6">
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
                      <label className="block text-sm font-medium leading-5 text-gray-700">
                        Photo Upload
                      </label>
                      <input
                        {...getInputProps()}
                        className="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md"
                      />
                      <div className="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="text-center">
                          <svg
                            className="w-12 h-12 mx-auto text-gray-400"
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
                              <span class="bg-white cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Click
                              </span>{" "}
                              or drop files to upload
                            </p>
                          )}
                          <p className="mt-1 text-xs text-gray-500">
                            PNG or JPG up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Uploader End */}

            {/* Items Start */}
            <div className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6">
              <div className="grid sm:grid-cols-2">
                {/* Image start */}
                <div className="w-40 h-40 overflow-hidden bg-gray-500 sm:rounded-md">
                  <img
                    src="https://source.unsplash.com/random"
                    alt="random"
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Image end */}
                {/* Input Start */}
                <div className="max-w-xs mt-5 sm:ml-auto sm:mt-0">
                  <label
                    htmlFor="minutes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Draw for...
                  </label>
                  <div className="relative flex mt-1 rounded-md shadow-sm">
                    <input
                      type="number"
                      id="minutes"
                      className="relative z-20 flex-1 block w-full px-3 py-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
                      placeholder="3"
                    />
                    <span className="relative z-10 inline-flex items-center px-3 text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 sm:text-sm">
                      minutes
                    </span>
                  </div>
                </div>

                {/* Input End */}
              </div>
            </div>
            {/* Items End */}

            {/* Actions Start */}
            <div className="flex justify-end">
              {/* <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Delete All
              </button> */}
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start Drawing
              </button>
            </div>
            {/* Actions End */}
          </main>
        </div>
      </div>
    </div>
  );
}
