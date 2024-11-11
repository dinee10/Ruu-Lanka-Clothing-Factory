import { Card, Space, Statistic } from 'antd'
import React from 'react'

function SummaryCard({ title, value, icon }) {
  return (
    <Card style={{backgroundColor:"ghostwhite"}}>
            <Space direction='horizontal'>
                {icon}
                <Statistic title={title} value={value} />
            </Space>
    </Card>
  )
}

export default SummaryCard