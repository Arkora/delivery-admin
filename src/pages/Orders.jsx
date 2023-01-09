import React,{useState,useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import { getOrders } from '../api'
import OrderItem from '../components/OrderItem'
const Orders = () => {
const [data, setData] = useState([])

const fetchOrders = async () =>{
    try {
        const {data} = await getOrders()
        setData(data)
    } catch (error) {
        
    }
}

useEffect(()=>{
    fetchOrders()
},[])

  return (
    <div className='flex'>
        <div className='flex w-80 h-screen'>
            <Sidebar />
        </div>
        <div className=' bg-teal-200 flex flex-col justify-center items-center h-screen w-full '>            
        <div className='bg-slate-50 mt-8 w-11/12 p-4 no-scrollbar overflow-y-auto h-5/6'>
                    {data.length? data.map((order) =>{
                        return <OrderItem order={order} />                        
                    }):<></>
                    }
                </div> 
        </div>        
    </div>
  )
}

export default Orders