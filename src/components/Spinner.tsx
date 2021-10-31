import React from 'react'
import {Spin} from 'antd'


const Spinner = () => {
  return (
    <div style={
      {height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center'}
    }>
        <Spin size="large"/>
    </div>
  )
}

export default Spinner
