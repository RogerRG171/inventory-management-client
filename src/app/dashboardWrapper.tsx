import React from 'react'
import Navbar from './(components)/Navbar'
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`dark flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      Sidebar
      <main
        className={`dark flex flex-col w-full h-full py-7 p-9 bg-gray-50 md:pl-24`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardWrapper
