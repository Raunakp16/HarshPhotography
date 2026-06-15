import React from "react";
import "./About.css";
import reel from "../../assets/videos/reel.mp4";
import { InstagramIcon } from "lucide-react";
const About = () => {
  return (
    <div className="aboutpage">
      <div className="aboutcontainer">
        <div className="visual">
          <video autoPlay loop muted playsInline>
            <source src={reel} type="video/mp4" />
          </video>
        </div>
        <div className="myinfo">
          <p>
            Harsh Photography is led by two passionate photographers who share
            not only the same name, but the same vision — to capture moments
            that feel real, timeless, and full of emotion. With a deep love for
            storytelling through images, we focus on turning ordinary moments
            into extraordinary memories.
          </p> <br />
          <p>
            From portraits and events to creative shoots and candid frames, our
            style blends authenticity with artistic detail. We believe
            photography is not just about taking pictures — it’s about
            preserving feelings, expressions, and stories that last forever.
          </p> <br />
          <p>
            Our style blends creativity with timeless elegance. We combine
            modern techniques with a classic touch to ensure that every image
            feels both artistic and everlasting. For us, photography is more
            than a profession — it’s a way to preserve memories that you can
            relive for a lifetime.
          </p> <br />
          <p>
            At Harsh Photography, we value connection. We work closely with our
            clients to understand their vision and bring it to life through our
            lens. When you choose us, you’re not just booking photographers —
            you’re choosing storytellers dedicated to capturing your moments
            with heart and precision.
          </p>
        
            <div className="icon">
              <InstagramIcon size={30} />

            </div>
        
        </div>
      </div>
    </div>
  );
};

export default About;
