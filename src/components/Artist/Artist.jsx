import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Artist.scss";

import ArtistImg from '../../assets/images/artist/rm5.jpeg'

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Artist = () => {
  // Create refs for elements we need to animate
  const cursorRef = useRef(null);
  const imageOverlayRef = useRef(null);
  const aboutImageRef = useRef(null);
  const aboutContentRef = useRef(null);
  const titleHighlightRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statNumbersRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Custom cursor
    const cursor = cursorRef.current;

    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
      });
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Image reveal animation with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Start animation when the top of the section hits 80% from the top of viewport
        toggleActions: "play none none none", // Play animation once when scrolled into view
      }
    });

    tl.to(imageOverlayRef.current, {
      scaleY: 0,
      duration: 1.2,
      ease: "power4.out",
    })
      .to(
        aboutImageRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
        },
        "-=0.9"
      )
      .to(
        aboutContentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=1.2"
      )
      .to(
        titleHighlightRef.current,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .to(
        statsContainerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );

    // Stats counter animation with ScrollTrigger
    statNumbersRef.current.forEach((stat) => {
      if (!stat) return; // Skip if ref not assigned

      const value = parseInt(stat.getAttribute("data-value"));

      gsap.to(stat, {
        innerText: value,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 90%", // Start when the top of the element hits 90% from the top of viewport
        }
      });
    });

    // Cleanup function to remove event listeners and kill ScrollTriggers
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Empty dependency array means this runs once on mount

  // Image hover effect handlers
  const handleImageEnter = () => {
    gsap.to(aboutImageRef.current, {
      scale: 1.05,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(cursorRef.current, {
      scale: 2.5,
      duration: 0.3,
    });
  };

  const handleImageLeave = () => {
    gsap.to(aboutImageRef.current, {
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.3,
    });
  };

  // Add stats number to refs array
  const addToStatNumbersRef = (el, index) => {
    if (el) {
      statNumbersRef.current[index] = el;
    }
  };

  return (
    <>
      <div ref={cursorRef} className="cursor-follower"></div>
      <section ref={sectionRef} className="artist">
        <div className="about-container">
          <div
            className="about-image-container"
            onMouseEnter={handleImageEnter}
            onMouseLeave={handleImageLeave}
          >
            <div ref={imageOverlayRef} className="image-overlay"></div>
            <img
              ref={aboutImageRef}
              src={ArtistImg}
              alt="Fashion Stylist Portrait"
              className="about-image"
            />
          </div>
          <div ref={aboutContentRef} className="about-content">
            <div className="about-subtitle">THE CREATIVE VISION</div>
            <h2 className="about-title">
              Elevating{" "}
              <strong className="title-highlight">
                personal style
                <span
                  ref={titleHighlightRef}
                  className="title-highlight-span"
                ></span>
              </strong>{" "}
              beyond the ordinary
            </h2>
            <p className="about-description">
              welcome to my creative world! I'm Riha Mehindi, a fashion stylist
              with a passion for blending luxury and innovation. From editorial
              shoots to commercial projects, I thrive on crafting looks that
              tell stories.My journey in fashion has been all about pushing
              boundaries and embracing bold ideas. Let's dive into a world where
              style meets creativity, and every detail speaks volumes.
            </p>
            <p className="about-description">
              My portfolio spans celebrity styling, editorial production, and
              personal wardrobe transformation—each project reflecting my
              commitment to intentional, impactful styling that adapts
              seamlessly between high-concept visuals and everyday elegance.
            </p>
            <div ref={statsContainerRef} className="stats-container">
              <div className="stat-item">
                <div
                  ref={(el) => addToStatNumbersRef(el, 0)}
                  data-value="10"
                  className="stat-number"
                >
                  0
                </div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-item">
                <div
                  ref={(el) => addToStatNumbersRef(el, 1)}
                  data-value="135"
                  className="stat-number"
                >
                  0
                </div>
                <div className="stat-label">Editorial Projects</div>
              </div>
              <div className="stat-item">
                <div
                  ref={(el) => addToStatNumbersRef(el, 2)}
                  data-value="85"
                  className="stat-number"
                >
                  0
                </div>
                <div className="stat-label">Celebrity Clients</div>
              </div>
            </div>
            <div className="about-signature">Riha Mehindi</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Artist;