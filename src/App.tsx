import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "./components/Home"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import 'antd/dist/antd.css'
import { observer } from 'mobx-react-lite'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/login">
          <LoginForm/>
        </Route>
        <Route path="/register">
          <RegisterForm/>
        </Route>
      </Switch>
    </Router>
  )
}

export default observer(App)
