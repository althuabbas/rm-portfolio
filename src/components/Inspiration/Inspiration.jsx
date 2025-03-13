import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Inspiration.scss";

import ins1 from '../../assets/images/inspire/mode-1.jpeg'
import ins2 from '../../assets/images/inspire/mode-2.jpeg'
import ins3 from '../../assets/images/inspire/mode-3.jpeg'
import ins4 from '../../assets/images/inspire/mode-4.jpeg'
import ins5 from '../../assets/images/inspire/mode-5.jpeg'
import ins6 from '../../assets/images/inspire/mode-6.jpeg'

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Inspiration = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Add card to refs array
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Define rotations for cards - adjust for different screen sizes
    const rotations = windowSize.width < 768 
      ? [-8, 8, -3, 3, -3, -1] // Less rotation on smaller screens
      : [-12, 10, -5, 5, -5, -2];

    // Clear previous animations when window size changes
    cardsRef.current.forEach((card) => {
      gsap.killTweensOf(card);
    });

    // Set initial positions for cards
    cardsRef.current.forEach((card, index) => {
      gsap.set(card, {
        y: windowSize.height,
        rotate: rotations[index],
      });
    });

    // Create scroll trigger for cards animation
    const cardsTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${windowSize.height * (windowSize.width < 768 ? 1.5 : 2)}px`, // Shorter scroll on mobile
      pin: true,
      pinSpacing: true,
      scrub: windowSize.width < 768 ? 0.5 : 1, // Faster scrub on mobile
      onUpdate: (self) => {
        const progress = self.progress;
        const totalCards = cardsRef.current.length;
        const progressPerCard = 1 / totalCards;

        cardsRef.current.forEach((card, index) => {
          const cardStart = index * progressPerCard;
          let cardProgress = (progress - cardStart) / progressPerCard;
          cardProgress = Math.min(Math.max(cardProgress, 0), 1);

          let yPos = windowSize.height * (1 - cardProgress);
          let xPos = 0;

          if (cardProgress === 1 && index < totalCards - 1) {
            const remainingProgress =
              (progress - (cardStart + progressPerCard)) /
              (1 - (cardStart + progressPerCard));
            if (remainingProgress > 0) {
              // Adjust movement based on screen size
              const distanceMultiplier = 1 - index * (windowSize.width < 768 ? 0.1 : 0.15);
              const xMultiplier = windowSize.width < 768 ? 0.2 : 0.3;
              const yMultiplier = windowSize.width < 768 ? 0.2 : 0.3;
              
              xPos = -windowSize.width * xMultiplier * distanceMultiplier * remainingProgress;
              yPos = -windowSize.height * yMultiplier * distanceMultiplier * remainingProgress;
            }
          }

          gsap.to(card, {
            y: yPos,
            x: xPos,
            duration: 0,
            ease: "none",
          });
        });
      },
    });

    // Lagsmoothing setting
    gsap.ticker.lagSmoothing(0);

    // Cleanup function to kill ScrollTrigger instances
    return () => {
      cardsTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [windowSize]); // Re-run when window size changes

  // Create an array of imported images
  const insImages = [ins1, ins2, ins3, ins4, ins5, ins6];

  return (
    <section className="sticky-cards inspire" ref={sectionRef}>
      {/* Cards */}
      {[1, 2, 3, 4, 5, 6].map((num, index) => (
        <div className="card" key={`card-${num}`} ref={addToCardsRef}>
          <div className="card-img">
            <img src={insImages[index]} alt={`Inspiration ${num}`} />
          </div>
          <div className="card-content">
            <p>
              {index === 0
                ? "X01-842"
                : index === 1
                ? "V9-372K"
                : index === 2
                ? "Z84-Q17"
                : index === 3
                ? "L56-904"
                : index === 4
                ? "A23-7P1"
                : "T98-462"}
            </p>
          </div>
        </div>
      ))}

      <div className="inspiration_info wrapper">
        <div className="about-subtitle">THE CREATIVE VISION</div>
        <h2 className="about-title">
          Fashion{" "}
          <strong className="title-highlight">
            inspiration
            <span className="title-highlight-span"></span>
          </strong>{" "}
        </h2>

        <p className="about-description">
          My inspiration comes from the world around me—art, culture, and the
          raw beauty of everyday life. I&apos;m drawn to the stories behind fashion,
          the way it can transform and empower. Iconic designers like Alexander
          McQueen and Iris Van Herpen have always sparked my creativity with
          their ability to merge artistry and innovation. But beyond the runway,
          I find inspiration in nature, architecture, and even street style,
          where I see endless possibilities for unique expression. Each look I
          create is influenced by this blend of influences, aiming to inspire
          others in the same way.
        </p>
      </div>
    </section>
  );
};

export default Inspiration;