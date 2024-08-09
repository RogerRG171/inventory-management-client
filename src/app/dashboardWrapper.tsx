'use client'
import React from 'react'
import Navbar from '@/app/(components)/Navbar'
import Sidebar from '@/app/(components)/Sidebar'
import StoreProvider, { useAppSelector } from './redux'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  )

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)
  return (
    <div
      className={`${isDarkMode ? 'dark' : 'light'} flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`${isDarkMode ? 'dark' : 'light'} flex flex-col w-full h-full py-7 p-9 bg-gray-50 ${isSideBarCollapsed ? 'md:pl-24' : 'md:pl-72'}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  )
}
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper
