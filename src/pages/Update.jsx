import React,{useState,useEffect,useRef} from 'react'
import Sidebar from '../components/Sidebar'
import FoodPreview from '../components/FoodPreview'
import { useParams } from 'react-router-dom'
import { fetchFood,updateFood } from '../api'
import Alert from '../components/Alert'

const Update = () => {
    const params = useParams()
    const [food, setFood] = useState({})
    const [alert, setAlert] = useState({ res: "", err: "" })
    const [isLoaded, setIsLoaded] = useState(false)
    const [formErrors, setFormErrors] = useState({}) 
    const [isSubmit, setIsSubmit] = useState(false)
    const inputRef = useRef(null)



  const addIng = () =>{
   
    if(inputRef.current.value === ''){        
      return   
    }else{
      food.ingrendients.push(inputRef.current.value)      
      inputRef.current.value = ''
    }
    
  }

  const validate = (values) =>{
    const errors= {};
    
    if(!values.title){
      errors.title = "Title is required!"
    }
    if(!values.price){
      errors.price = "Price is required!"
    }
    if(!values.img){
      errors.img = "Image is required!"
    }
    if(!values.category){
      errors.category = "Category is required!"
    }
    if(values.ingrendients.length === 0){
      errors.ingrendients = "Add Ingrendients"
    }    
   
    return errors
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setFormErrors(validate(food))    
    if(Object.entries(formErrors).length === 0 && isSubmit){
      try {
        const {data} = await updateFood(params.id,food)
        setAlert({...alert,res:data})                
      } catch (error) {
        setAlert({...alert,err:error.response.data})
      }
    }
  }

  const handleUpdate = (e) =>{
    setIsSubmit(true)
    handleSubmit(e)
  }

    const fetchData = async () =>{
        try {
            const {data} = await fetchFood(params.id)
            setFood(data)
            setIsLoaded(true)
        } catch (error) {
            setAlert({...alert,err:error.response.data})
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
    

  return (
    <div className='flex '>
        <div className='flex w-80 h-screen'>
            <Sidebar />
        </div>
        <div className=' bg-teal-200 flex flex-col  overflow-y-scroll no-scrollbar items-center h-screen w-full '>            
          <div className='w-96  mt-2 pl-14   bg-slate-800'>
            <form onSubmit={handleSubmit}>
              <input className='w-5/6 h-10 my-2 rounded-sm p-2' type="text"  placeholder='Title' onChange={(e)=>setFood({...food,title:e.target.value})} />
              <p className='text-red-400'>{formErrors.title}</p>
              <input className='w-5/6 h-10 my-2 rounded-sm p-2' type="text"  placeholder='Price' onChange={(e)=>setFood({...food,price:e.target.value})} />
              <p className='text-red-400'>{formErrors.price}</p>
              <input className='w-5/6 h-10 my-2 rounded-sm p-2' type="text"  placeholder='Image' onChange={(e)=>setFood({...food,img:e.target.value})}/>
              <p className='text-red-400'>{formErrors.img}</p>
              <input className='w-5/6 h-10 my-2 rounded-sm p-2' type="text"  ref={inputRef} placeholder='Ingrendient'/>
              <p className='text-red-400'>{formErrors.ingrendients}</p>
              <button className='w-5/6 h-10 my-2 rounded-sm p-2 bg-emerald-500' onClick={addIng}>ADD INGRENDIENT</button>
              <select className='w-5/6 h-10 my-2 rounded-sm p-2' onChange={(e) => setFood({...food, category: e.target.value})} name='' id="">
                <option value="">Select Category</option>
                <option value="meat">Meat</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="coffee">Coffee</option>
              </select>
              <p className='text-red-400'>{formErrors.category}</p>
            </form>
              <button className='w-5/6 h-10 my-2 rounded-sm p-2 bg-green-500' onClick={handleUpdate}>UPDATE</button>
          </div>
          <div className={Object.entries(alert).length? 'mt-10' : 'hidden'}>
              <Alert alert={alert} setAlert={setAlert} />
          </div>
          {isLoaded?    
               <FoodPreview food={food} setFood={setFood} />             
          : <></>                   
          }
        </div>        
    </div>
  )
}

export default Update