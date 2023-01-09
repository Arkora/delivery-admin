import React,{useState,useEffect,useRef} from 'react'
import moment from 'moment/moment'
import {BsArrowDownCircleFill} from 'react-icons/bs'
import {deleteOrder} from '../api/index'
import Alert from './Alert'

const OrderItem = ({order}) => {
  const [expand, setExpand] = useState(false)
  const [alert, setAlert] = useState({ res: "", err: "" })
  const divRef = useRef(null)

  const handleDelete = async () =>{
    try {
      const {data} = await deleteOrder(order._id)
      setAlert({...alert,res:data})
    } catch (error) {
      setAlert({...alert,err:error.response.data})
    }
  }

  useEffect(()=>{
    if(expand){
      divRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[expand])
  return (
    <div className={expand?'w-full h-[98%]  text-white bg-slate-600 my-4 ':'w-full h-16 pt-2  text-white bg-slate-600 my-4'}>
      <div className='w-full h-16 pt-2 grid grid-cols-2 px-2 text-white bg-slate-600 '>
          <div className='flex justify-start text-white'>
              <h3>{moment(order.date).fromNow()}</h3>
          </div>
          <div className='flex justify-end'>
              <div className={expand? 'w-10 h-10 flex items-center justify-center bg-stone-900 rounded-full rotate-180':'w-10 h-10 flex items-center justify-center bg-stone-900 rounded-full'} onClick={() =>setExpand(!expand)}>
                  <BsArrowDownCircleFill size={20} />
              </div>
          </div>
      </div>
          <div className={expand?'p-4 ':'hidden'} ref={divRef}>
              <div className='overflow-y-auto h-72'>
                <h4>Items {order.products.length}x</h4>
                {order.products.map((item)=>{
                  return <div className='grid grid-cols-2 bg-slate-900 h-20 p-2 my-1 '>
                              <div>
                                <h5>{item.title}</h5>
                                <div className='flex'>
                                  {item.ingrendients.map((ing)=>{
                                    return <li className='mx-3'>{ing}</li>
                                  })}
                                </div>
                              </div>
                              <div className='flex justify-end'>
                                  <h5>Quantity: {item.quantity}x</h5>
                              </div>
                            </div>       
                })}
              </div>
              <div className='grid grid-cols-3 mt-10'>
                  <div>
                    <p>{order.message}</p>
                  </div>
                  <div className='flex justify-center'>
                    <h4>Total: {order.total}$</h4>
                  </div>
                  <div className='flex justify-end'>
                    <button className='w-full h-10 bg-green-500 text-2xl font-semibold hover:bg-green-700' onClick={handleDelete}>Deliver</button>
                    <Alert alert={alert} setAlert={setAlert} />
                  </div>
              </div>
          </div>      
    </div>
  )
}

export default OrderItem