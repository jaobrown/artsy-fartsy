import React from 'react'

const PageHeader = ({ title, children }) => {
  return (
    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <h1 className="text-lg font-medium leading-6 text-gray-900">{title}</h1>
      {/* Actions start */}
      <div className="mt-3 sm:mt-0 sm:ml-4">{children}</div>
      {/* Actions end */}
    </div>
  )
}

PageHeader.Actions = ({ children }) => {
  return <div className="mt-3 sm:mt-0 sm:ml-4">{children}</div>
}

export { PageHeader }
