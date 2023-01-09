import React from 'react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className='flex'>
        <div className='flex w-80 h-screen'>
            <Sidebar />
        </div>
        <div className=' bg-teal-200 flex flex-col justify-center items-center h-screen w-full '>            
                          
        </div>        
    </div>
  )
}

export default Dashboard