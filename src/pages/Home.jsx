import React,{useState,useEffect} from 'react'
import { fetchFoods, fetchFoodsBySearch } from '../api'
import FoodItem from '../components/FoodItem'
import Sidebar from '../components/Sidebar'

const Home = () => {
    const [data, setData] = useState([])
    const [term,setTerm] = useState('')
    const [alert, setAlert] = useState({ res: "", err: "" })

    const fetchProducts = async () =>{
        try {
            const {data} = await fetchFoods()
            setData(data)
        } catch (error) {
        }
    }

    const fetchProduct = async () =>{
        try {
            const {data} = await fetchFoodsBySearch(term)
            setData(data)
        } catch (error) {
            
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    useEffect(() =>{
        if(term){
            fetchProduct()
        }else{
            fetchProducts()
        }
    },[term])

  return (
    <div className='flex'>
        <div className='flex w-80 h-screen'>
            <Sidebar />
        </div>
        <div className=' bg-teal-200 flex flex-col justify-center items-center h-screen w-full '>            
                <div className='w-3/4 ml-44 '>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Search' className='w-3/4 h-10' onChange={(e) =>setTerm(e.target.value)}/>
                    </form>
                </div>
                <div className='bg-slate-50 mt-8 w-11/12 p-4 no-scrollbar overflow-y-auto h-5/6'>
                    {data.length? data.map((product) =>{
                        return <FoodItem product={product} />                        
                    }):<></>
                    }
                </div>            
        </div>        
    </div>
  )
}

export default Home