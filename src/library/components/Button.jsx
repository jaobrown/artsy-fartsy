import React from 'react'

const Button = ({ color, className, children, ...props }) => {
  switch (color) {
    case 'primary':
      return (
        <button
          {...props}
          className={`inline-flex items-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
        >
          {children}
        </button>
      )
    case 'secondary':
      return (
        <button
          {...props}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
        >
          {children}
        </button>
      )
    default:
      return (
        <button {...props} className={className}>
          {children}
        </button>
      )
  }
}

export { Button }
