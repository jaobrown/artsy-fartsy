import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useTimer } from 'react-timer-hook'
import { Image, Transformation } from 'cloudinary-react'
import { motion, AnimatePresence } from 'framer-motion'

import { getSessionById } from '../../../vendors/fauna'
import { useIncrement } from '../../../library/hooks'

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
  })
  return (
    <div className="relative flex flex-row-reverse items-center justify-center space-x-3">
      <span className="w-16 h-8 ml-6 text-xl font-medium">
        {minutes}:{seconds}
      </span>

      <span className="flex p-2 transition duration-75 bg-gray-800 rounded-lg hover:bg-gray-700">
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
      <span className="flex p-2 transition duration-75 bg-gray-800 rounded-lg hover:bg-gray-700">
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
      <span className="flex p-2 transition duration-75 bg-gray-800 rounded-lg hover:bg-gray-700">
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
  )
}

export default function Draw({ session }) {
  const imageCount = session.data.session.images.length
  const [activeIndex, { inc, dec, reset }] = useIncrement({
    maxValue: imageCount,
    minValue: 0,
    step: 1,
  })

  return (
    <div>
      <Head>
        <title>{session.data.session.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen text-white bg-gray-100">
        {activeIndex < session.data.session.images.length ? (
          <div className="w-full h-full">
            <AnimatePresence>
              {session.data.session.images.map((image, idx) => {
                const time = new Date()
                time.setSeconds(time.getSeconds() + image.time * 60)
                if (activeIndex === idx) {
                  return (
                    <div key={idx} className="w-full h-full">
                      <motion.div
                        key={`${idx}-img`}
                        className="w-full h-full"
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                      >
                        <Image
                          publicId={image.public_id}
                          className="object-contain w-full h-full mx-auto"
                        >
                          <Transformation quality="auto" fetchFormat="auto" />
                        </Image>
                      </motion.div>
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
                                <div className="ml-3 text-sm font-medium text-gray-400">
                                  Drawing{' '}
                                  <span className="text-white">
                                    {activeIndex + 1}
                                  </span>{' '}
                                  of{' '}
                                  <span className="text-white">
                                    {imageCount}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                return
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-200" />
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                ​
              </span>
              <div
                className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                    {/* Heroicon name: check */}
                    <svg
                      className="w-6 h-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-headline"
                    >
                      Session Complete
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Great work! You can wrap up this session, or restart to
                        keep drawing.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <Link href="/">
                    <a className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                      Finish
                    </a>
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Restart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id
    const session = await getSessionById(id)
    return {
      props: { session },
    }
  } catch (error) {
    console.error(error)
    context.res.statusCode = 302
    context.res.setHeader('Location', `/`)
    return { props: {} }
  }
}
