import React from 'react'
import {BsPencil,BsFillTrashFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
const FoodItem = ({product}) => {
  return (
    <div className='w-full h-30 px-4 text-white bg-slate-600 py-2 my-4'>
        <h3 className='text-white'>{product.title} {product.price}$</h3>            
            <div className='flex  p-2  justify-start'>
                {product.ingrendients.map((item,index)=>{
                    return <li className='mx-4' key={index}>{item}</li>
                })}
            </div>
            <div className='flex gap-5 text-white py-4'>
               <Link to={`update/${product._id}`}> <button className='w-10 h-10 flex justify-center items-center hover:bg-stone-500 rounded-md bg-stone-700'><BsPencil size={18} /></button> </Link>
                <button className='w-10 h-10 flex justify-center items-center hover:bg-stone-500 rounded-md bg-stone-700'><BsFillTrashFill size={18} /></button>
            </div>            
    </div>
  )
}

export default FoodItem