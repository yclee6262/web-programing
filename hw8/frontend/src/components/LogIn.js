import React from 'react'
import { Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useChat } from '../containers/hooks/useChat'

export default function LogIn({ name, setName, onLogin }) {
    return (
        <Input.Search
            size='large'
            style={{ width: 300, margin: 50 }}
            prefix={<UserOutlined />}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
                setName(e.target.value)
            }}
            enterButton="Sign In"
            onSearch={(name) => {
                onLogin(name)
            }}
        ></Input.Search>
    )
}
