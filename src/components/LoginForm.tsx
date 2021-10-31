import React from 'react'
import {Alert, Button, Checkbox, Divider, Form, Input, Space} from 'antd'
import {Link, useHistory} from 'react-router-dom'
import {Context} from "../index"
import {observer} from "mobx-react-lite"


const LoginForm: React.FC = () => {
  const history = useHistory()
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const {store} = React.useContext(Context)

  return (
    <div style={
      {display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}
    }>
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true}}
        style={{width: "550px", height: "400px"}}
      >
        <Divider>Авторизация</Divider>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {required: true, message: 'Please input your username!'}
          ]}
        >
          <Input
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{required: true, message: 'Please input your password!'}]}
        >
          <Input.Password
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </Form.Item>

        {store.error && <Alert message={store.error} type="error" showIcon/>}

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Space size={'large'}>
            <Button type="primary"
                    htmlType="submit"
                    onClick={() => store.login(username, password, history)}
            >
              Sign in
            </Button>
            <Button>
              <Link to="/register">
                Register
              </Link>
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default observer(LoginForm)
