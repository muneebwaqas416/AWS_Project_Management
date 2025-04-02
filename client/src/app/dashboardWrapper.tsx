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
    document.documentElement.offsetHeight; // Force reflow
    document.documentElement.style.display = '';
  }, [isDarkMode]);  
  return (
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
      <Sidebar></Sidebar>
    <main className={`flex w-full flex-col bg-gray-50 dark:bg-gray-bg ${isSideBarCollapsed ? '' : 'md:pl-64'}`}>
        <Navbar></Navbar>
        {children}
    </main>
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