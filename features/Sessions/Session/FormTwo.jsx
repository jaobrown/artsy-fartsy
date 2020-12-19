import * as React from 'react'
import { useForm, useWatch, useFieldArray } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Image, Transformation } from 'cloudinary-react'

const FormTwo = ({ title, inputs: images, mode, id }) => {
  const editMode = mode === 'edit'

  const [inputs, setInputs] = React.useState([])

  const submissionHandler = (data) => {
    console.log(data)
  }

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues: {
      title: editMode ? title : ``,
      inputs: [], // -- empty first
      //test: [{ firstName: "Bill", lastName: "Luo" }]
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inputs',
    fields: images, // empty first
  })

  React.useEffect(async () => {
    setInputs(images)
    reset({
      inputs: images,
    })
  }, [images])

  return (
    <form
      onSubmit={handleSubmit(submissionHandler)}
      className="space-y-5"
      id={id}
    >
      <div className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6">
        <div className="col-span-6 sm:col-span-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Session Title
          </label>
          <input
            type="text"
            id="title"
            className="block w-full mt-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="title"
            ref={register({ required: true })}
            placeholder="Warm up session"
            defaultValue={editMode ? title : ``}
          />
        </div>
      </div>
      {fields.map(({ id, public_id, url, time }, idx) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6"
            key={id}
          >
            <div className="grid sm:grid-cols-2">
              {/* Image start */}
              <div className="w-40 h-40 overflow-hidden bg-gray-500 sm:rounded-md">
                <Image
                  publicId={public_id}
                  className="object-cover w-full h-full"
                  alt={public_id}
                >
                  <Transformation quality="auto" fetchFormat="auto" />
                </Image>
                <span className="sr-only">
                  <label htmlFor={`images[${idx}].image`}>image</label>
                  <input
                    type="url"
                    id={`images[${idx}].image`}
                    name={`images[${idx}].image`}
                    ref={register({ required: true })}
                    defaultValue={url}
                  />
                </span>
                <span className="sr-only">
                  <label htmlFor={`images[${idx}].public_id`}>
                    cloudinary public id
                  </label>
                  <input
                    type="text"
                    id={`images[${idx}].public_id`}
                    name={`images[${idx}].public_id`}
                    ref={register({ required: true })}
                    defaultValue={public_id}
                  />
                </span>
              </div>
              {/* Image end */}
              {/* Input Start */}
              <div className="max-w-xs mt-5 sm:ml-auto sm:mt-0">
                <label
                  htmlFor={`images[${idx}].time`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Draw for...
                </label>
                <div className="relative flex mt-1 rounded-md shadow-sm">
                  <input
                    type="number"
                    id={`images[${idx}].time`}
                    className="relative z-20 flex-1 block w-full px-3 py-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
                    placeholder="3"
                    name={`images[${idx}].time`}
                    ref={register({ required: true })}
                    defaultValue={editMode ? time : ``}
                  />
                  <span className="relative z-10 inline-flex items-center px-3 text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 sm:text-sm">
                    minutes
                  </span>
                </div>
              </div>

              {/* Input End */}
            </div>
            <button onClick={() => remove(idx)}>Remove</button>
          </motion.div>
        )
      })}
      <button onClick={() => append()}>Append</button>
      <input type="submit" />
    </form>
  )
}

export default FormTwo
