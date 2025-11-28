import { Component } from 'react'
import { Outlet } from 'react-router-dom'


export default class AuthLayout extends Component {
  render() {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-blue-950 to-blue-600">
    
        <Outlet />
      </div>
    )
  }
}
