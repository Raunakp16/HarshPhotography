'use client';
import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";
import Card from "../Components/Cards/Card";
import About from "../Components/Aboutus/About";
import weddingimg from "../assets/Images/cover_photo.webp";
import girl from "../assets/Images/verticalimg.jpg"
import Cardinfo from "../Components/Cards/Cardinfo";
import ClientForm from "./ClientForm";
import Swipercard from "../Components/swiper/Swipercard";
import {ReactLenis} from 'lenis/react';
import Footerbar from "../Components/Footer/Footerbar";



const Home = () => {
  const carddetails = [
    {
      id: 1,
      title: "Potriats",

      description:
        "Capturing timeless wedding moments with cinematic storytelling and elegant compositions.",
      image: girl,
    },
    {
      id: 2,
      title: "Pre-Wedding",

      description:
        "Capturing timeless wedding moments with cinematic storytelling and elegant compositions.",
      image: weddingimg,
    },
    {
      id: 3,
      title: "Wedding",

      description:
        "Capturing timeless wedding moments with cinematic storytelling and elegant compositions.",
      image: weddingimg,
    },
     {
      id: 4,
      title: "Babyshower",

      description:
        "Capturing timeless wedding moments with cinematic storytelling and elegant compositions.",
      image: weddingimg,
    },
     
  ];
  console.log("Card details");
  return (
    
    <div>
      <ReactLenis root>
      <Navbar />
      <Hero />
      <Cardinfo/>
      <div className="cards-container">
      {carddetails.map(function (elem) {
        return (
         
            <Card image={elem.image} title={elem.title}  key={elem.id} />
           
          
         
        );
      })}
      </div>
      <About/>
      <ClientForm/>
      <Swipercard/>
      <Footerbar/>
       </ReactLenis>
    </div>
   
  );
};

export default Home;
