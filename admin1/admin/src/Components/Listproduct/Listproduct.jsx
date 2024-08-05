import React, { useEffect, useState } from 'react'
import cross_icon from "../../assets/cross_icon.png"
import "./Listproduct.css";
const Listproduct = () => {

  const [allproducts,setAllproduct]=useState([]);

  const fetchInfo=async()=>{
    await fetch("http://localhost:4000/allproducts").then((res)=>res.json()).then((data)=>{setAllproduct(data)})
  }
  const removeProduct=async(id)=>{
    await fetch("http://localhost:4000/deleteproduct",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }
  useEffect(()=>{
    fetchInfo();
  },[]);
  console.log(allproducts)
  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old_price</p>
        <p>New_price</p>
        <p>Category</p>
        <p>Remove</p>
        
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <>
          <div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>{product.old_price}</p>
              <p>{product.new_price} </p>
              <p>{product.category} </p>
              <img className="listproduct-removeproduct" onClick={()=>{removeProduct(product.id)}} src={cross_icon} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default Listproduct
