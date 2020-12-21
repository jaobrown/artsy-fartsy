import * as React from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Image, Transformation } from 'cloudinary-react'

import { usePositionReorder, useMeasurePosition } from '@/hooks'

const SessionForm = ({ onSubmit, title, inputs: images, mode, id }) => {
  const { register, handleSubmit, errors } = useForm()

  const editMode = mode === 'edit'

  const [inputs, setInputs] = React.useState([])

  const [order, setOrder, updatePosition, updateOrder] = usePositionReorder(
    inputs
  )

  React.useEffect(() => {
    setInputs(images)
  }, [images])

  React.useEffect(() => {
    setOrder(inputs)
  }, [inputs])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id={id}>
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
      {order.map((image, idx) => {
        return (
          <DragItem
            idx={idx}
            image={image}
            key={image.public_id}
            updatePosition={updatePosition}
            updateOrder={updateOrder}
          >
            <div className="grid sm:grid-cols-2">
              {/* Image start */}
              <div className="w-40 h-40 overflow-hidden bg-gray-500 sm:rounded-md">
                <Image
                  publicId={image.public_id}
                  className="object-cover w-full h-full"
                  alt={image.public_id}
                >
                  <Transformation quality="auto" fetchFormat="auto" />
                </Image>
                <span className="hidden">
                  <input
                    type="hidden"
                    id={`images[${idx}][image]`}
                    name={`images[${idx}][image]`}
                    ref={register({ required: true })}
                    defaultValue={image.url}
                  />
                </span>
                <span className="hidden">
                  <input
                    type="hidden"
                    id={`images[${idx}][public_id]`}
                    name={`images[${idx}][public_id]`}
                    ref={register({ required: true })}
                    defaultValue={image.public_id}
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
                    onWheel={(e) => e.target.blur()}
                    min={1}
                    id={`images[${idx}][time]`}
                    className="relative z-20 flex-1 block w-full px-3 py-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
                    placeholder="3"
                    name={`images[${idx}][time]`}
                    ref={register({ required: true })}
                    defaultValue={editMode ? image.time : ``}
                  />
                  <span className="relative z-10 inline-flex items-center px-3 text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 sm:text-sm">
                    minutes
                  </span>
                </div>
              </div>

              {/* Input End */}
            </div>
          </DragItem>
        )
      })}
    </form>
  )
}

function DragItem({ image, updatePosition, updateOrder, idx, children }) {
  const [isDragging, setIsDragging] = React.useState(false)

  const ref = useMeasurePosition((pos) => {
    updatePosition(idx, pos)
  })

  return (
    <motion.div
      layout
      drag="y"
      ref={ref}
      dragElastic={1}
      dragConstraints={{ top: 0, bottom: 0 }}
      key={image.public_id}
      animate={{ scale: isDragging ? 1.05 : 1 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onViewportBoxUpdate={(_, delta) => {
        if (isDragging) {
          updateOrder(idx, delta.y.translate)
        }
      }}
      className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6 cursor-move"
    >
      {children}
    </motion.div>
  )
}

export default SessionForm
