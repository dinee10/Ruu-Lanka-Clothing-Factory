import React from 'react'
import { Button, Image, Space, Typography } from 'antd'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'


function Header() {
    const navigate = useNavigate()
  return (
      <div>
          <div className='header'>
              <Image width={60} src={logo}></Image>
              <Typography.Title level={2} style={{color: 'white'}}>Admin Dashboard</Typography.Title>
              <Button type={'primary'} onClick={() => navigate('/')}>Logout</Button>
          </div>
      </div>
  )
}

export default Header