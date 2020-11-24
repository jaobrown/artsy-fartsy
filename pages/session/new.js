import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

export default function New() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [images, setImages] = React.useState([]);

  // Upload (called on file drop)
  const upload = async (files) => {
    const url = `https://api.cloudinary.com/v1_1/koda-studio/image/upload`;
    const formData = new FormData();
    const uploadedImages = [];
    await files.map((file) => {
      formData.append("file", file);
      formData.append("upload_preset", "unsigned");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          uploadedImages.push({
            public_id: data.public_id,
            url: data.url,
            signature: data.signature,
          });
        });
    });
    setImages(uploadedImages);
  };

  // Cancel - deletes uploaded images from cloudinary, pushes to home
  const cancel = async () => {
    if (images.length > 0) {
      await images.map((image) => {
        try {
          fetch("/api/deleteImage", {
            method: "POST",
            body: JSON.stringify(image),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (err) {
          console.error(err);
        }
      });
    }
    router.push("/");
  };

  // Save to session
  const save = async (data, destination = "/") => {
    try {
      fetch("/api/createSession", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
    router.push(destination);
  };

  // Drop zone setup
  const onDrop = React.useCallback((acceptedFiles) => {
    upload(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="min-h-screen px-4 py-5 bg-gray-100 sm:p-6">
      <Head>
        <title>Artsy Fartsy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container max-w-5xl mx-auto">
        <main className="">
          {/* Section Header start */}
          <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
            <h1 className="text-lg font-medium leading-6 text-gray-900">
              New Session
            </h1>
            {/* Actions start */}
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <button
                onClick={() => cancel()}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>

              {images.length > 0 && (
                <button
                  type="submit"
                  form="create-session-form"
                  className="inline-flex items-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save and return
                </button>
              )}
            </div>
            {/* Actions end */}
          </div>
          {/* Section header end */}

          {/* Upload Start */}
          <div className="px-4 py-5 mt-5 bg-white shadow sm:rounded-lg sm:p-6">
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
                <form>
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
                            <span className="font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
          {/* Upload end */}

          <div className="mt-5">
            {images.length > 0 && (
              <form
                onSubmit={handleSubmit(save)}
                className="space-y-5"
                id="create-session-form"
              >
                {images.map((image, idx) => (
                  <div
                    className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6"
                    key={idx}
                  >
                    <div className="grid sm:grid-cols-2">
                      {/* Image start */}
                      <div className="w-40 h-40 overflow-hidden bg-gray-500 sm:rounded-md">
                        <img
                          src={image.url}
                          alt="random"
                          className="object-cover w-full h-full"
                        />
                        <span className="sr-only">
                          <label htmlFor={`images[${idx}][image]`}>image</label>
                          <input
                            type="url"
                            id={`images[${idx}][image]`}
                            name={`images[${idx}][image]`}
                            ref={register({ required: true })}
                            defaultValue={image.url}
                          />
                        </span>
                      </div>
                      {/* Image end */}
                      {/* Input Start */}
                      <div className="max-w-xs mt-5 sm:ml-auto sm:mt-0">
                        <label
                          htmlFor={`images[${idx}][time]`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Draw for...
                        </label>
                        <div className="relative flex mt-1 rounded-md shadow-sm">
                          <input
                            type="number"
                            id={`images[${idx}][time]`}
                            className="relative z-20 flex-1 block w-full px-3 py-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
                            placeholder="3"
                            name={`images[${idx}][time]`}
                            ref={register({ required: true })}
                          />
                          <span className="relative z-10 inline-flex items-center px-3 text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 sm:text-sm">
                            minutes
                          </span>
                        </div>
                      </div>

                      {/* Input End */}
                    </div>
                  </div>
                ))}
                {/* Actions Start */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    form="create-session-form"
                    className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Start Drawing
                  </button>
                </div>
                {/* Actions End */}
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
