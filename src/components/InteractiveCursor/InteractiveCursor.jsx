import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import "./InteractiveCursor.scss";

const CustomCursor = ({ 
  hoverSelectors = [], 
  text = "View more",
  linkAttribute = "data-link" ,
  redirectLink
  // Add a prop to specify which attribute contains the URL
}) => {
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);

  // Custom cursor movement
  const moveCursor = useCallback((e) => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  // Handle element hover
  const handleElementHover = useCallback((isHovering) => {
    if (cursorRef.current && cursorTextRef.current) {
      if (isHovering) {
        gsap.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorTextRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      } else {
        gsap.to(cursorRef.current, {
          scale: 0.1,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorTextRef.current, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  }, []);

  // Handle element click to redirect
  const handleElementClick = useCallback((e) => {
    // const link = e.currentTarget.getAttribute(linkAttribute);
    if (redirectLink) {
      window.location.href = redirectLink;
      // window.location.href = link;
      // Alternatively for React Router: history.push(link)
    }
  }, [redirectLink]);

  useEffect(() => {
    // Add mousemove event listener for cursor
    window.addEventListener("mousemove", moveCursor);

    // Initialize custom cursor scale
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { scale: 0.1, opacity: 0 });
    }

    // Add hover and click effects to all specified selectors
    const elementsToTrack = [];

    hoverSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => handleElementHover(true));
        el.addEventListener("mouseleave", () => handleElementHover(false));
        el.addEventListener("click", handleElementClick);
        elementsToTrack.push(el);
      });
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      elementsToTrack.forEach((el) => {
        el.removeEventListener("mouseenter", () => handleElementHover(true));
        el.removeEventListener("mouseleave", () => handleElementHover(false));
        el.removeEventListener("click", handleElementClick);
      });
    };
  }, [moveCursor, handleElementHover, handleElementClick, hoverSelectors]);

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <div className="cursor-text" ref={cursorTextRef}>
        {text}
      </div>
    </div>
  );
};

export default CustomCursor;