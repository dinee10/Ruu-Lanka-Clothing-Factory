import { ProductOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Typography } from 'antd'
import React from 'react'
import SummaryCard from '../SummaryCard/SummaryCard'


function PageContent() {
    return (
        <div className='PageContent'>
            <Space size={30} direction='vertical'>
                <Typography.Title level={4}>Dashboard Overview</Typography.Title>
                <Space size={50} direction='horizontal'>
                    <SummaryCard icon={<ProductOutlined style={{ color: "green", fontSize: 40 }} />} title={"Products"} value={"100"} />
                    <SummaryCard icon={<ShoppingCartOutlined style={{ color: "lightblue", fontSize: 40 }} />} title={"Orders"} value={"2323"} />
                    <SummaryCard icon={<UserOutlined style={{ color: "red", fontSize: 40 }} />} title={"Employee"} value={"454"} />
                    <SummaryCard icon={<UserOutlined style={{ color: "purple", fontSize: 40 }} />} title={"Supplier"} value={"5656"} />
                </Space>
            </Space>
        </div>
    )
}



export default PageContent