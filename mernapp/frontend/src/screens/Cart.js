import React from 'react'
import { useCart,useDispatchCart } from '../components/ContextReducer';
import trash from '../delete.svg'



export default function Cart() {
  let index = 0;
let data = useCart();
console.log(data);
let dispatch = useDispatchCart();
if(data.length ===0){
    return (
    <div>
        <div className='text-primary m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
    </div>
    )
}

const handleCheckOut = async(e)=>{
  e.preventDefault();

  let userEmail = localStorage.getItem("userEmail");
  console.log(userEmail);
  const response = await fetch("https://gofood-backend-api.vercel.app/api/orderData",{
    method: 'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      order_data : data,
      email:userEmail,
      order_date : new Date().toDateString()
    })
  });
    
  // const json = await response.json()
  // console.log(json);
  
  // console.log("Order Response:" ,response);
  if(response.status===200){
    dispatch({type:"DROP"})
  }
}
   let totalPrice = data.reduce((total,food)=>total+food.price,0)
  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className="table table-hover text-white table-dark">
  <thead className=" text-success fs-4">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Option</th>
      <th scope="col">Amount</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {data.map((food,index)=>(
    <tr  >
      <th scope="row">{index+1}</th>
      <td>{food.name}</td>
      <td>{food.qty}</td>
      <td>{food.size}</td>
      <td>{food.price}</td>
      <td ><button type="button" className="btn p-0"><img src={trash} alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
    </tr>
   ))}
  </tbody>
</table>
    <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
    <div>
        <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out</button>
  
    </div>
        </div>
    </div>
  )
}
