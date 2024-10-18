import { useRef, useState ,useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [food,setFood]=useState([])
  const[search,setSearch]=useState('')
  const prevRef=useRef(null)
  const nevigate=useNavigate();

  const logout=()=>{
    nevigate('/')
  }

  useEffect(()=>{
    fetch('http://localhost:3032/data').then((res)=>res.json()).then((json)=>{
      setFood(json);
    })
  },[])
  const data = [
    {
      id: 1,
      name: "Pizza",
      image: "/images/Pizza.png"
    },
    {
      id: 2,
      name: "Burger",
      image: "/images/Burger.jpg"
    },
    {
      id: 3,
      name: "Chinese",
      image: "/images/Chinese.jpg"
    },
    {
      id: 4,
      name: "Biryani",
      image: "/images/Biryani.jpg"
    },
    {
      id: 5,
      name: "Dosa",
      image: "/images/Dosa.jpg"
    },
    {
      id: 6,
      name: "Somosa",
      image: "/images/Samosa.jpg"
    },
    {
      id: 7,
      name: "Kachori",
      image: "/images/Kachori.jpg"
    }




  ]
  return (
    <div>
      <div className='headers'>
        <div className='container'>
        <img className='mb-5 ms-4 mt-4' src="/images/logo.avif" alt="logo" width={'auto'}  height={'95px'}/>
        <button className='btn float-end mt-4 btn-primary' onClick={logout} >Log out</button>
        </div>
         
      </div>
      <br />
      <div className='carousal'>
        <div className='container'>
          <button style={{border:'none',background:'none',position:"absolute",top:"220px",left:"1px"}}
          onClick={()=>{
            prevRef.current.scrollBy({
              left:-200,
              behavior:"smooth"
            })
          }
           

          }
          >
            <img src="/images/left-arrow.png" alt="letf" />
          </button>
          <div  ref={prevRef} style={{display: 'flex',overflow:'hidden'}}>
            {
            data.map((x)=>(
              <div key={x.id}>
                <div className='card me-3'style={{width:"10rem"}}>
                  <img src= {x.image} alt="food-item" height="185px"/>
                </div>
              </div>
            ))
            }
          </div>
          <button style={{border:'none',background:'none',position:"absolute",top:"220px",left:"1150px"}}
          onClick={()=>{
            prevRef.current.scrollBy({
              left:200,
              behavior:"smooth"
            })
          }
           

          }
          
          >
            <img src="/images/right-arrow.png" alt="letf" />
          </button>
        </div>
      </div>

      <form >
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className='form-control mx-auto w-50 mt-5 mb-5' placeholder='Search your Fev Resturent..'/>
      </form>
      <br />

      <div className='food_data'>
        <div className='container'>
          <h1 className='text-danger'>Hungry ! grab your fev food from our top Resturent</h1>
          <Row>
           {
            food.filter((x)=>{
              if(search==""){
                return true
              }else{
                return x.title.toLowerCase().includes(search.toLowerCase())
              }
            }).map((a)=>(
              <Col>
               <div key={a.id}>
                <div className='card m-4 'style={{width:"13rem"}}>
                  <img className='card-img-top' src= {a.images} alt="food-item" height="130px"/>
                  <div className='card-body'>
                    <p>Returent : {a.title}</p>
                    <p>Rating : {a.ratings}</p>
                    <p>Area : {a.area}</p>
                  </div>
                </div>
                
              </div>
              </Col>
             
            ))
            }
          </Row>
        

        </div>
      </div>
     
    </div>
  )
}

export default Dashboard
