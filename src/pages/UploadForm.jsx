import React,{useState,useEffect,useRef} from 'react'
import FoodPreview from '../components/FoodPreview'
import Sidebar from '../components/Sidebar'
import { createFood } from '../api'
import Alert from '../components/Alert'

const UploadForm = () => {
  const [formData, setFormData] = useState({title:'',price:'',img:'',ingrendients:[]})   
  const [formErrors, setFormErrors] = useState({})
  const inputRef = useRef(null)
  const [isSubmit, setIsSubmit] = useState(false)
  const [alert, setAlert] = useState({ res: "", err: "" })


  const addIng = () =>{   
    if(inputRef.current.value === ''){        
      return   
    }else{
      formData.ingrendients.push(inputRef.current.value)      
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
  const handleSubmit = async (e) =>{
    e.preventDefault()
    setFormErrors(validate(formData))
    if(Object.entries(formErrors).length === 0 && isSubmit){
      try {
        const {data} = await createFood(formData)
        setAlert({...alert,res:data})               
      } catch (error) {
        setAlert({...alert,err:error.response.data})
      }
    }
  }

  const handleUpload = (e) =>{
    setIsSubmit(true)
    handleSubmit(e)
  }
  return (
    <div className='flex'>
        <div className='flex w-80 h-screen'>
            <Sidebar />
        </div>
        <div className=' bg-teal-200 flex flex-col  items-center overflow-y-scroll no-scrollbar h-screen w-full '>            
        <div className='w-96  mt-2 pl-14   bg-slate-800'>
            <form onSubmit={handleSubmit}>
              <input className='w-5/6 h-10 my-2 rounded-sm p-2' type="text"  placeholder='Title' onChange={(e)=>setFormData({...formData,title:e.target.value})} />
              <p className='text-red-400'>{formErrors.title}</p>
              <input className='w-5/6 h-10 my-2 rounded-sm p-2' type="text"  placeholder='Price' onChange={(e)=>setFormData({...formData,price:e.target.value})} />
              <p className='text-red-400'>{formErrors.price}</p>
              <input className='w-5/6 h-10 my-2 rounded-sm p-2' type="text"  placeholder='Image' onChange={(e)=>setFormData({...formData,img:e.target.value})}/>
              <p className='text-red-400'>{formErrors.img}</p>
              <input className='w-5/6 h-10 my-2 rounded-sm p-2' type="text"  placeholder='Ingrendient' ref={inputRef}  />
              <p className='text-red-400'>{formErrors.ingrendients}</p>
              <button className='w-5/6 h-10 my-2 rounded-sm p-2 bg-emerald-500' onClick={addIng}>ADD INGRENDIENT</button>
              <select className='w-5/6 h-10 my-2 rounded-sm p-2' onChange={(e) => setFormData({...formData, category: e.target.value})} name='' id="">
                <option value="">Select Category</option>
                <option value="meat">Meat</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="coffee">Coffee</option>
              </select>
              <p className='text-red-400'>{formErrors.category}</p>
            </form>
              <button className='w-5/6 h-10 my-2 rounded-sm p-2 bg-green-500' onClick={handleUpload}>UPLOAD</button>
          </div>       
            
              <Alert  alert={alert} setAlert={setAlert}/>
              <FoodPreview food={formData} setFood={setFormData} />          
            
          
        </div>        
    </div>
  )
}

export default UploadForm