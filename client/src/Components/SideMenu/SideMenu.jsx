import { Menu } from 'antd'
import React from 'react'
import '@ant-design/icons'
import { DashboardOutlined, DashOutlined, DeliveredProcedureOutlined, FileWordOutlined, ProductOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

function SideMenu() {

    const navigate = useNavigate();

  return (
      <div className='SideMenu'>
          <Menu
              onClick={(item) => { navigate(item.key) }}
              items={[
                  {
                      label: "Dashboard",
                      icon: <DashboardOutlined />,
                      key: '/admin'
                  },
                  {
                      label: "User Account",
                      icon: <UserOutlined />,
                      key: '/admin/user'
                  },
                  {
                      label: "Supplier",
                      icon: <UserOutlined />,
                      key: '/admin/supplier'
                  },
                  {
                      label: "Inventory",
                      icon: <ShopOutlined />,
                      key: '/admin/inventory'
                  },
                  {
                      label: "Employee",
                      icon: <UserOutlined />,
                      key: '/admin/employee'
                  },
                  {
                      label: "Product",
                      icon: <ProductOutlined />,
                      key: '/admin/list'
                  },
                  {
                      label: "Order",
                      icon: <ShoppingCartOutlined />,
                      key: '/admin/order'
                  },
                  {
                      label: "Delivery",
                      icon: <DeliveredProcedureOutlined />,
                      key: '/admin/delivery'
                  },
                  {
                      label: "Feedback",
                      icon: <FileWordOutlined />,
                      key: '/admin/feedback'
                  },
              ]}>

          </Menu>
      </div>
  )
}

export default SideMenu