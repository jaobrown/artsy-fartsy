import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Image, Transformation } from 'cloudinary-react'

import { useToggle } from '../../../../library/hooks'

const ListItem = ({ session, sessionDeleted }) => {
  const { isToggled, toggle } = useToggle(false)
  const [isDeleted, setIsDeleted] = React.useState(false)

  let duration = 0
  let imageCount = session.data.session.images.length
  session.data.session.images.map((image) => {
    const imageTime = parseInt(image.time)
    duration += imageTime
  })

  const deleteSession = async (session) => {
    await session.data.session.images.map((image) => {
      try {
        fetch('/api/deleteImage', {
          method: 'DELETE',
          body: JSON.stringify(image),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (err) {
        console.error(err)
      }
    })

    setIsDeleted(true)

    try {
      await fetch('/api/deleteSession', {
        method: 'DELETE',
        body: JSON.stringify(session.id),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (err) {
      console.error(err)
    }

    sessionDeleted()
  }

  return (
    <AnimatePresence>
      {!isDeleted && (
        <motion.li
          layout
          key="list-item"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
        >
          <div className="block hover:bg-gray-50 sm:rounded-md">
            <div className="flex items-center px-4 sm:px-6">
              <Link href={`/session/draw/${session.id}`}>
                <a className="flex-1 min-w-0 py-4 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex text-sm font-medium text-indigo-600 truncate">
                      <p className="capitalize">{session.data.session.title}</p>
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
                          Estimated Duration:{' '}
                          <span className="font-medium">{duration}</span>{' '}
                          minutes
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-4 sm:mt-0">
                    <div className="flex overflow-hidden">
                      {session.data.session.images.map((image, idx) => {
                        if (idx === 0) {
                          return (
                            <Image
                              alt={`${image.public_id}`}
                              key={idx}
                              publicId={image.public_id}
                              className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                            >
                              <Transformation
                                quality="auto"
                                fetchFormat="auto"
                              />
                            </Image>
                          )
                        } else {
                          return (
                            <Image
                              alt={`${image.public_id}`}
                              key={idx}
                              publicId={image.public_id}
                              className="inline-block w-6 h-6 -ml-1 rounded-full ring-2 ring-white"
                            >
                              <Transformation
                                quality="auto"
                                fetchFormat="auto"
                              />
                            </Image>
                          )
                        }
                      })}
                    </div>
                  </div>
                </a>
              </Link>
              <div className="flex items-center flex-shrink-0 ml-5">
                <div className="relative inline-block text-left ">
                  <div>
                    <button
                      onClick={toggle}
                      className="flex items-center justify-center w-6 h-6 text-gray-400 rounded-full hover:ring-2 hover:ring-gray-200 hover:text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <span className="sr-only">Open options</span>
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  {isToggled && (
                    <div className="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link href={`/session/edit/${session.id}`}>
                          <a
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            Edit
                          </a>
                        </Link>
                      </div>
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          onClick={() => deleteSession(session)}
                          className="block w-full px-4 py-2 text-sm text-left text-red-700 hover:bg-red-100 hover:text-red-800 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.li>
      )}
    </AnimatePresence>
  )
}

export default ListItem
