import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:8000' })

export const fetchFoods = () => API.get('/foods')
export const fetchFood = (id) => API.get(`/foods/${id}`)
export const fetchFoodsBySearch =(searchQuery) => API.get(`/foods/search?searchQuery=${searchQuery}`)
export const createFood = (newFood) => API.post('/foods/upload',newFood)
export const updateFood = (id,updatedFood) => API.patch(`/foods/${id}`,updatedFood)
export const deleteFood = (id) => API.delete(`/foods/${id}`)

export const getOrders = () => API.get('/orders')
export const deleteOrder = (id) => API.delete(`/orders/${id}`)
