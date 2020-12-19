import React from 'react'

import { Container } from './Container'

const Main = ({ children }) => {
  return (
    <main className="min-h-screen px-4 py-5 bg-gray-100 sm:p-6">
      <Container>{children}</Container>
    </main>
  )
}

export { Main }
