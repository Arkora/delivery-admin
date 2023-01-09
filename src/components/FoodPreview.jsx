import React from 'react'

const FoodPreview = ({food,setFood}) => {

    const handleDelete = (item) =>{
        setFood({...food, ingrendients: food.ingrendients.filter((ing) => ing !==item)})
    }   

  return (
    <div className={food?'bg-emerald-900 text-white w-3/4 p-2 mt-2 h-56':'hidden'}>
        <h3>{food.title} <span className='text-base text-yellow-400'> {food.category} </span></h3>
        <div className='grid grid-cols-3'>
            <div className='w-full h-full'>
                <img src={food.img} className='w-40 h-40' />
            </div>
            <div className='flex justify-center'>  
                <div>
                    {food.ingrendients.map((item,index)=>{
                        return <div className='grid grid-cols-2'>
                                    <div className='flex justify-start'>
                                        <li>{item}</li>
                                    </div>
                                    <div className='flex justify-end'>
                                        <button className='w-5 h-5 font-semibold bg-slate-500' onClick={()=> handleDelete(item)}> -</button>
                                    </div>
                               </div>
                    })}
                </div>
            </div>
            <div className='flex justify-end'>
                <h3>Price: {food.price}$</h3>
            </div>
        </div>
    </div>
  )
}

export default FoodPreview