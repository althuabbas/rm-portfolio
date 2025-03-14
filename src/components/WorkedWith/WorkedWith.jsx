import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./WorkedWith.scss";
import { useNavigate } from "react-router-dom";

// preview image
import rmXfp from "../../assets/images/RmXFPmodelagency/09.jpeg";
import sweet from "../../assets/images/sweetLady/01.jpeg";
import soFear from "../../assets/images/so-fear-clock/m-1.jpg";
import bridel from "../../assets/images/bridel/1.jpeg";
import inFrame from "../../assets/images/inframe-dubai/1.jpeg";
import bij from "../../assets/images/bijouq-italy/1.jpeg";
import romaizan from "../../assets/images/al-romaizan/1.jpeg";
import taali from "../../assets/images/taali/1.jpeg";
import lcWaikiki from "../../assets/images/lcWaikiki/lcw1.jpeg";
import layalaLenses from "../../assets/images/layalaLenses/ll1.jpeg";

const WorkedWith = () => {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(null);
  const previewRef = useRef(null);
  const preview1Ref = useRef(null);
  const preview2Ref = useRef(null);
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Image sources
  const imageSources = [
    rmXfp,
    sweet,
    soFear,
    bridel,
    inFrame,
    bij,
    romaizan,
    taali,
    lcWaikiki,
    layalaLenses,
  ];

  const menuItems = [
    {
      info: "outfits",
      name: "Riha Mehindi X taali",
      tag: "Stylist",
    },
    {
      info: "Stylist",
      name: "Riha Mehindi X Sweet lady",
      tag: "Event",
    },
    {
      info: "outfits",
      name: "Riha Mehindi X So fear clock ",
      tag: "Creative Concept",
    },
    {
      info: "outfits",
      name: "Riha Mehindi X Bridel",
      tag: "Art Direction",
    },
    {
      info: "outfits",
      name: "Riha Mehindi X infame dubai",
      tag: "Direction",
    },
    {
      info: "jewelry",
      name: "Riha Mehindi X bijouq italy",
      tag: "Stylist",
    },
    {
      info: "jewelry",
      name: "Riha Mehindi X al romaizan",
      tag: "Stylist",
    },
    {
      info: "outfits",
      name: "Riha Mehindi X FP model agency",
      tag: "Creative Design",
    },
    {
      info: "outfits",
      name: "Riha Mehindi X layala lenses",
      tag: "Creative Design",
    },
    {
      info: "outfits",
      name: "Riha Mehindi X lc waikiki",
      tag: "Creative Design",
    },
  ];

  // Detect mobile devices and screen size changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Modified appendImages function with responsiveness
  const appendImages = (src) => {
    if (!src) {
      console.error("Image source is undefined or empty");
      return;
    }

    const preview1 = preview1Ref.current;
    const preview2 = preview2Ref.current;

    if (!preview1 || !preview2) {
      console.error("Preview refs are not properly initialized");
      return;
    }

    try {
      const img1 = document.createElement("img");
      const img2 = document.createElement("img");

      // Add error handling for images
      img1.onerror = () => console.error(`Failed to load image: ${src}`);
      img2.onerror = () => console.error(`Failed to load image: ${src}`);

      img1.src = src;
      img1.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
      img1.style.opacity = "1";

      img2.src = src;
      img2.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
      img2.style.opacity = "1";

      preview1.appendChild(img1);
      preview2.appendChild(img2);

      // Make sure there are no pre-existing GSAP animations interfering
      gsap.killTweensOf([img1, img2]);

      gsap.to([img1, img2], {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "power3.out",
        onComplete: function () {
          removeExtraImages(preview1);
          removeExtraImages(preview2);
        },
      });
    } catch (error) {
      console.error("Error in appendImages:", error);
    }
  };

  const removeExtraImages = (container) => {
    while (container && container.children.length > 10) {
      container.removeChild(container.firstChild);
    }
  };

  const mouseOverAnimation = (elem) => {
    gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
      top: "-100%",
      duration: 0.3,
    });
    gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
      top: "0%",
      duration: 0.3,
    });
  };

  const mouseOutAnimation = (elem) => {
    gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
      top: "0%",
      duration: 0.3,
    });
    gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
      top: "100%",
      duration: 0.3,
    });
  };

  // Handle touch events for mobile
  const handleTouchStart = (index, e) => {
    e.preventDefault();

    // Reset previous active item if exists
    if (activeIndex !== null && activeIndex !== index) {
      const prevItems = document.querySelectorAll(".menu-item");
      if (prevItems[activeIndex]) {
        mouseOutAnimation(prevItems[activeIndex]);
      }
    }

    // Toggle current item
    if (activeIndex === index) {
      setActiveIndex(null);
      mouseOutAnimation(e.currentTarget);

      gsap.to(".preview-img img", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "power3.out",
      });
    } else {
      setActiveIndex(index);
      mouseOverAnimation(e.currentTarget);
      appendImages(imageSources[index]);
    }
  };

  const handleMouseOver = (index, e) => {
    if (isMobile) return; // Skip on mobile

    setActiveIndex(index);
    const item = e.currentTarget;
    mouseOverAnimation(item);

    if (imageSources[index]) {
      appendImages(imageSources[index]);
    } else {
      console.error(`No image source at index ${index}`);
    }
  };

  const handleMouseOut = (e) => {
    if (isMobile) return; // Skip on mobile

    setActiveIndex(null);
    const item = e.currentTarget;
    mouseOutAnimation(item);
  };

  const handleMenuMouseOut = () => {
    if (isMobile) return; // Skip on mobile

    gsap.to(".preview-img img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      ease: "power3.out",
    });
  };

  // Mouse movement effect
  useEffect(() => {
    // Only apply mouse movement on non-mobile
    if (isMobile) {
      if (previewRef.current) {
        // Center preview in mobile view
        gsap.set(previewRef.current, {
          x: window.innerWidth / 2 - 112.5, // Half of 225px width
          y: 100,
          duration: 0,
        });
      }
      return;
    }

    const handleMouseMove = (e) => {
      if (previewRef.current) {
        // Adjust positions based on screen size
        const offsetX = window.innerWidth < 1200 ? 150 : 300;

        gsap.to(previewRef.current, {
          x:
            e.clientX + offsetX > window.innerWidth
              ? e.clientX - 225
              : e.clientX + offsetX,
          y: e.clientY,
          duration: 1,
          ease: "power3.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  // Preload images
  useEffect(() => {
    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className={`container ${isMobile ? "mobile" : ""}`}>
      <div className="preview" ref={previewRef}>
        <div className="preview-img preview-img-1" ref={preview1Ref}></div>
        <div className="preview-img preview-img-2" ref={preview2Ref}></div>
      </div>

      <div className="menu" ref={menuRef} onMouseOut={handleMenuMouseOut}>
        {menuItems.map((item, index) => (
          <div
            className={`menu-item ${
              activeIndex === index && isMobile ? "active" : ""
            }`}
            key={index}
            onMouseOver={(e) => handleMouseOver(index, e)}
            onMouseOut={handleMouseOut}
            onTouchStart={(e) => handleTouchStart(index, e)}
            // onClick={() =>
            //   (window.location.href = `/rm-portfolio#/client/${item.name
            //     .toLowerCase()
            //     .replace(/\s+/g, "-")}`)
            // }
            onClick={() =>
              navigate(
                `/client/${item.name.toLowerCase().replace(/\s+/g, "-")}`
              )
            }
          >
            <div className="info">
              <p>{item.info}</p>
              <p>{item.info}</p>
            </div>
            <div className="name">
              <p>{item.name}</p>
              <p>{item.name}</p>
            </div>
            <div className="tag">
              <p>{item.tag}</p>
              <p>{item.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkedWith;
