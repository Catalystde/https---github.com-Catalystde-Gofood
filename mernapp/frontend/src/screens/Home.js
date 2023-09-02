import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Corousel from "../components/Corousel"


export default function Home() {
const [foodCat, setFoodCat] = useState([]);
const [search, setSearch] = useState('')
const [foodItem, setFoodItem] = useState([]);
const loadData = async ()=>{
  let response =  await fetch("https://gofood-backend-api.vercel.app/api/foodData",{
    method: "POST",
    headers:{
      'Content-Type':'application/json'
    }
  });
  response = await response.json();

  setFoodItem(response[0]);
  setFoodCat(response[1]);
}

useEffect(()=>{
  loadData()
},[])








  return (
    <div className="home">
     <div><Navbar /></div> 
      <div>
         <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{objectFit:"contain !important"}}
      >
        <div className="carousel-inner" id="corousel">
          <div className="carousel-caption" style={{zIndex:"10"}}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/300×300/?burger"
              className="d-block vw-100 vh-100"
              alt="..."
              style={{filter:"brightness(30%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300×300/?cake"
              className="d-block vw-100 vh-100"
              alt="..."
              style={{filter:"brightness(30%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300×300/?pizza"
              className="d-block vw-100 vh-100"
              alt="..."
              style={{filter:"brightness(30%)"}}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>





      <div className="container">
        {
        foodCat !==[]
        ? foodCat.map((cat)=>{
        return (
        <div className="row mb-3">
        <div key={cat._id} className="fs-3 m-3" style={{color:"white"}}>
          {cat.CategoryName}
        </div>
        <hr/>
        {foodItem !==[]
        ? 
        foodItem.filter((item)=>(item.CategoryName===cat.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems=>{
            return (
              <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                  <Card foodItem = {filterItems}
                  options = {filterItems.options[0]}
                  
                  ></Card>
              </div>
            )
        }) : ""
        }
        
        </div>)
        }):""
      }
      </div>
      <Footer />
    </div>
  );
}
