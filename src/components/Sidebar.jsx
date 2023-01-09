import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='bg-emerald-800  w-full p-6'>
        <div className='mt-44 flex flex-col gap-10  items-center list-none'>
            <Link to={'/'} className='sidebar-link'> <li>Home</li> </Link>
            <Link to={'/dashboard'} className='sidebar-link'> <li>Dashboard</li> </Link>
            <Link to={'/upload'} className='sidebar-link'> <li>Upload Form</li> </Link>
            <Link to={'/orders'} className='sidebar-link'> <li>Orders</li> </Link>
        </div>
    </div>
  )
}

export default Sidebar