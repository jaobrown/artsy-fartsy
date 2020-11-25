import * as React from "react";
import { useForm } from "react-hook-form";

const Form = ({ onSubmit, inputs: images }) => {
  const { register, handleSubmit, errors } = useForm();

  const [inputs, setInputs] = React.useState([]);

  React.useEffect(() => {
    setInputs(images);
  }, [images]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      id="create-session-form"
    >
      {inputs.map((image, idx) => (
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
      {/* {images.length > 0 && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    form="create-session-form"
                    className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Start Drawing
                  </button>
                </div>
              )} */}
      {/* Actions End */}
    </form>
  );
};

export default Form;
