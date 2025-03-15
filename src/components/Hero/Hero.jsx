import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./Hero.scss";

// Import multiple images for the columns
import hero1 from "../../assets/images/taali/4.jpeg";
// You may need to replace these with actual images from your assets
import hero2 from "../../assets/images/layalaLenses/ll3.jpeg";
import hero3 from "../../assets/images/RmXFPmodelagency/11.jpeg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Split text for animation
    const titleText = new SplitType(".hero__title", {
      types: "chars",
      tagName: "span"
    });

    // Initialize main timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" }
    });

    // Initial setup
    gsap.set(".hero__background-overlay", { opacity: 1 });
    gsap.set(".hero__content", { opacity: 0 });
    gsap.set(".hero__column", { opacity: 0 });

    // Main animation sequence
    tl.to(".hero__background-overlay", {
      opacity: 0.5,
      duration: 1.6
    })
    .to(".hero__column", {
      opacity: 1,
      duration: 1,
      stagger: 0.2
    }, "-=1.2")
    .to(".hero__content", {
      opacity: 1,
      duration: 1
    }, "-=0.8")
    .fromTo(titleText.chars, {
      y: 100,
      opacity: 0,
      rotateX: -90
    }, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1,
      // stagger: 0.02
    }, "-=0.5")
    .fromTo(".hero__subtitle", {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1
    }, "-=0.8")
    .fromTo(".hero__tag", {
      x: -30,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1
    }, "-=0.8")
    .fromTo(".hero__scroll-indicator", {
      opacity: 0,
      y: 20,
      
    }, {
      opacity: 1,
      y: 0,
      duration: 1
    }, "-=0.5");

    // Scroll animation for background columns
    gsap.to(".hero__background-columns", {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      <div className="hero__container">
        <div className="hero__background">
          <div className="hero__background-overlay"></div>
          <div className="hero__background-columns">
            <div className="hero__column">
              <img src={hero1} alt="Background 1" className="hero__column-image" />
            </div>
            <div className="hero__column">
              <img src={hero2} alt="Background 2" className="hero__column-image" />
            </div>
            <div className="hero__column">
              <img src={hero3} alt="Background 3" className="hero__column-image" />
            </div>
          </div>
        </div>

        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title">RIHA MEHINDI</h1>
            <h2 className="hero__subtitle">Fashion Stylist | مصمم أزياء</h2>
            <div className="hero__tags">
              <span className="hero__tag">Based in UAE, Dubai</span>
              <span className="hero__tag">Personal Stylist</span>
              <span className="hero__tag">Fashion Consultant</span>
            </div>
          </div>
          <div className="hero__scroll-indicator">
            <span>Scroll to explore</span>
            <div className="hero__scroll-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
