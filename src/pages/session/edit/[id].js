import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone'

import SessionForm from '@/features/sessions/Forms/SessionForm'
import { Button } from '@/components'

import { getSessionById } from '@/vendors/fauna'

export default function Edit({ session }) {
  console.log('Edit -> session', session)
  const inputs = session.data.session.images
  const title = session.data.session.title
  const [images, setImages] = React.useState(inputs)

  // Upload (called on file drop)
  const upload = async (files) => {
    const url = `https://api.cloudinary.com/v1_1/koda-studio/image/upload`
    const formData = new FormData()
    await files.map((file) => {
      formData.append('file', file)
      formData.append('upload_preset', 'unsigned')

      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setImages((images) => [
            ...images,
            {
              public_id: data.public_id,
              url: data.url,
              signature: data.signature,
            },
          ])
        })
    })
  }

  // Drop zone setup
  const onDrop = React.useCallback((acceptedFiles) => {
    upload(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="min-h-screen px-4 py-5 bg-gray-100 sm:p-6">
      <Head>
        <title>Edit {title}</title>
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
              <Link href="/">
                <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancel
                </a>
              </Link>

              {images.length > 0 && (
                <Button
                  color="primary"
                  type="submit"
                  form="update-session-form"
                >
                  Save and return
                </Button>
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
                  Add Photos
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Upload the photos that you would like to draw.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form>
                  <div {...getRootProps()}>
                    <label className="block text-sm font-medium leading-5 text-gray-700">
                      Photo Uploads
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
                            </span>{' '}
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
            <SessionForm
              sessionId={session.id}
              inputs={images}
              editMode
              title={title}
              id="update-session-form"
            />
          </div>
        </main>
      </div>
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
