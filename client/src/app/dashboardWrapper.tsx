'use client'

import React, { useEffect } from 'react'
import Navbar from './(components)/Navbar';
import Sidebar from './(components)/Sidebar';
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({children} : {children : React.ReactNode}) => {
  const isSideBarCollapsed : boolean = useAppSelector((state) => {
    return state.global.isSidebarCollapsed
  })
  const isDarkMode : boolean = useAppSelector((state)=>{
    return state.global.isDarkModeOn
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  
    // Force a repaint to apply dark mode
    document.documentElement.style.display = 'none';
    document.documentElement.style.display = '';
  }, [isDarkMode]);  

  return (
    <div className='fixed inset-0 flex bg-gray-50 text-gray-900'>
      <Sidebar />
      <div className={`flex flex-1 flex-col ${isSideBarCollapsed ? '' : 'md:pl-64'}`}>
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

const DashboardWrapper = ({children} : {children : React.ReactNode}) => {
    return (
      <StoreProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </StoreProvider>
    )
}

export default DashboardWrapper;