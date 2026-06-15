import React, { useEffect, useState } from 'react'
import "./Footerbar.css"

const Footerbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const swiperSection = document.querySelector('.swiper-container');

    if (!swiperSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(swiperSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`footer-container ${isVisible ? 'footer-container--visible' : ''}`}>
        <div className="gui">

        </div>
        <div className="gui2"></div>
        <div className="bottomlogo">
          <h1>HARSH PHOTOGRAPHY</h1>
        </div>
        <div className="logs">
          <p> &copy; 2026 Harsh Photography. All rights reserved.</p> &nbsp;<br />

          <p class="developer-credit">
  Website designed & developed by Raunak 
  </p>
        </div>
        

    </div>
  )
}

export default Footerbar
