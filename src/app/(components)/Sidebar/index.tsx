'use client'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSideBarCollapsed } from '@/state'
import { Menu } from 'lucide-react'
import React from 'react'

const Sidebar = () => {
  // redux
  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  )

  // functions
  const toggleSidebar = () => {
    dispatch(setIsSideBarCollapsed(!isSidebarCollapsed))
  }

  // class
  const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'}
  bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40
  `
  return (
    <div className={sidebarClassNames}>
      {/* Top */}
      <div className="flex gap-3 justify-around md:justify-normal items-center pt-8">
        <div>Logo</div>
        <h1 className="font-extra-bold text-2xl">Roger</h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
      {/* Links */}
      <div className="flex-grow mt-8 ">{/* Links here */}</div>

      {/* Footer */}
      <div>
        <p className="text-center text-xs text-gray-500">&copy; 2024 Roger</p>
      </div>
    </div>
  )
}

export default Sidebar
