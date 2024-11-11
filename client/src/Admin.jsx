import React from 'react'
import { Space } from 'antd'
import './App.css'
import Header from "./Components/Header/Header"
import SideMenu from './Components/SideMenu/SideMenu'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'


function Admin() {
  return (
      <div className='App'>
          <Header />
          <Space className="SideMenuAndPageContent">
              <SideMenu />
              <Outlet />
          </Space>
          <Footer />
      </div>
  )
}

export default Admin