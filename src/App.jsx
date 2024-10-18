import { useEffect, useState } from 'react'

import './App.css'
import {  useNavigate } from 'react-router-dom';



function App() {
  const[email, setEmail]=useState('');
  const[password,setPassword]=useState('')
  const[prevE,setPrevE]=useState('')
  const navigate=useNavigate()
  const[isvisible,setIsVisible]=useState(false);
  const[newE,setNewE]=useState('');
  const[newP,setNewP]=useState('');

  const newData={
    email:newE,
    password:newP
  }


 
  const[data,setData]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:3031/data').then((res)=>res.json()).then((json)=>{
      setData(json);
    })
  },[])
 
  const showPage=()=>{
    setIsVisible(true);
  }
  const offPage=()=>{
    setIsVisible(false)
  }
  
  const ErrorShow=()=>{
    let isValid=true;
    if(!email && !password){
      setPrevE('Enter Your Email And Password')
      
      isValid =false;
    }
    else{
      setPrevE('')
    }
    return isValid;
  }
  const onSumit=(e)=>{
    e.preventDefault();
    if(ErrorShow()){
      const user=data.find((x)=>x.email===email && x.password===password)
      if(user){
        alert('Login successful')
        navigate('/dashboard')
       

      }
      else{
        alert('invalid input')
      }
    }
   
    
    
  }
  const saveData=(e)=>{
    e.preventDefault();
    
      fetch('http://localhost:3031/data',{
        method:"POST",
        headers: {
           "Content-type": "application/json"
       },
       body: JSON.stringify(newData),
  
      })

    
    
    
  }

  
  

  return (

    <>
    <div className='first-page'>
      <div className='row'>
        <div className='col col-lg-6 '>
          <img className='mb-5 ms-4 mt-4' src="/images/logo.avif" alt="logo" width={'auto'}  height={'95px'}/>
          <button className='btn float-end mt-4 btn-primary' onClick={showPage}>Sing in</button>
          {
          isvisible && (
            <div className='popUp' style={{display:isvisible? 'block':'none'}}>
               <button className='btn btn-primary float-end' onClick={offPage}>Close</button>
              <h1>Sign In Page</h1>
             
              <form onSubmit={saveData}>
                <div className='row'>
                  <div className='col-lg-8 mb-3 '>
                    <input value={newE} onChange={(e)=>setNewE(e.target.value)} type="email" className='form-control' placeholder='Enter Your Email' />
                    
                  </div>
                  <div className='col-lg-8 mb-3'>
                    <input value={newP} onChange={(e)=>setNewP(e.target.value)} type="password" className='form-control' placeholder='Enter Your Password' />
                   
                  </div>
                  
                </div>
                <button className='btn btn-primary mt-3'>Submit</button>
              </form>
            </div>
            
          )
          }
          <h3 className='md-5  ms-4 mt-4 fw-bold' style={{fontSize:"2.5rem"}}>Skip boring food and indulge in flavoursome Wraps, Meals and Bowls!</h3>
          <form onSubmit={onSumit}>
            <div className='row ms-4 mt-4'>
              <div className='col-lg-8 mt-4'>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className='form-control' placeholder='Enter Email' />
                <p className='ms-3 mt-3'>{prevE}</p>
              </div>
              <div className='col-lg-8 mt-4'>
              <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className='form-control' placeholder='Enter Password' />
              <p className='ms-3 mt-3'>{prevE}</p>
              </div>
              <button className='btn btn-primary mt-3' type='submit'>Log In</button>
            </div>

          </form>
        </div>
        <div className='col col-lg-6'>
          <div className='backgrond-fouss'></div>
        
        </div>
      </div>
    </div>
    
      
    </>
  )
}

export default App
