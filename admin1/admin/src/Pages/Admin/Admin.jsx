import React from 'react'
import "./Admin.css"
import Slidebar from '../../Components/Slidebar/Slidebar';
import {Routes,Route} from "react-router-dom"
import Addproduct from '../../Components/Addproduct/Addproduct';
import Listproduct from '../../Components/Listproduct/Listproduct';
const Admin = () => {
  return (
    <div className='Admin'>
      <Slidebar />
      <Routes>
        <Route path='/addproduct' element={<Addproduct />}></Route>
        <Route path='/listproduct' element={<Listproduct />}></Route>
      </Routes>
    </div>
  )
}

export default Admin;
