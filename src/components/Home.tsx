import {Button, Card} from 'antd'
import {observer} from 'mobx-react-lite'
import React from 'react'
import {Redirect} from 'react-router-dom'
import {Context} from "../index"
import Spinner from './Spinner'

const {Meta} = Card

const Home: React.FC = () => {
  const {store} = React.useContext(Context)

  React.useEffect(() => {
    store.fetchUserData()
  }, [store])

  if (localStorage.getItem('token')) {
    store.setAuth(true)
  }

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    store.logout()
  }

  if (store.isLoading) {
    return <Spinner/>
  }

  if (!store.isAuth || !store.user) {
    return (
      <Redirect to="/login"/>
    )
  }

  return (
    <div style={
      {display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column'}
    }>
      <Card
        hoverable
        style={{width: 240}}
        cover={<img alt="avatar" src={store.user.avatar} style={{width: '240px', height: '240px'}}/>}
        title={`${store.user.id}: ${store.user.username}`}
      >
        <Meta title="О себе:" description={store.user.about || "------"}/>
      </Card>
      <Button onClick={handleLogout}
              danger
              type="default"
              htmlType="submit"
              style={{display: 'block', marginTop: '20px'}}>
        Logout
      </Button>
    </div>
  )
}

export default observer(Home)
