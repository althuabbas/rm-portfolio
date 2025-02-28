import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Inspiration.scss";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Inspiration = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const revealContainersRef = useRef([]);

  // Add card to refs array
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Add reveal container to refs array
  const addToRevealContainersRef = (el) => {
    if (el && !revealContainersRef.current.includes(el)) {
      revealContainersRef.current.push(el);
    }
  };

  useEffect(() => {
    // Define rotations for cards
    const rotations = [-12, 10, -5, 5, -5, -2];

    // Set initial positions for cards
    cardsRef.current.forEach((card, index) => {
      gsap.set(card, {
        y: window.innerHeight,
        rotate: rotations[index],
      });
    });

    // Create scroll trigger for cards animation
    const cardsTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 2}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalCards = cardsRef.current.length;
        const progressPerCard = 1 / totalCards;

        cardsRef.current.forEach((card, index) => {
          const cardStart = index * progressPerCard;
          let cardProgress = (progress - cardStart) / progressPerCard;
          cardProgress = Math.min(Math.max(cardProgress, 0), 1);

          let yPos = window.innerHeight * (1 - cardProgress);
          let xPos = 0;

          if (cardProgress === 1 && index < totalCards - 1) {
            const remainingProgress =
              (progress - (cardStart + progressPerCard)) /
              (1 - (cardStart + progressPerCard));
            if (remainingProgress > 0) {
              const distanceMultiplier = 1 - index * 0.15;
              xPos =
                -window.innerWidth *
                0.3 *
                distanceMultiplier *
                remainingProgress;
              yPos =
                -window.innerHeight *
                0.3 *
                distanceMultiplier *
                remainingProgress;
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

    // Set up reveal animations
    revealContainersRef.current.forEach((container) => {
      const image = container.querySelector(".reveal__img");

      gsap.set(container, {
        autoAlpha: 1,
        xPercent: -100,
      });

      gsap.set(image, {
        xPercent: 100,
        scale: 1.3,
        visibility: "visible",
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top center",
          toggleActions: "restart none none reset",
          onEnter: () => {
            const tl = gsap.timeline();

            tl.to(container, {
              xPercent: 0,
              duration: 1.5,
              ease: "power2.out",
            });

            tl.to(
              image,
              {
                xPercent: 0,
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
              },
              "-=1.5"
            );
          },
        },
      });
    });

    // Lagsmoothing setting
    gsap.ticker.lagSmoothing(0);

    // Cleanup function to kill ScrollTrigger instances
    return () => {
      cardsTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="sticky-cards inspire" ref={sectionRef}>
      {/* Cards */}
      {[1, 2, 3, 4, 5, 6].map((num, index) => (
        <div className="card" key={`card-${num}`} ref={addToCardsRef}>
          <div className="card-img">
            <img src={`/src/assets/images/mode-${num}.jpeg`} alt="" />
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
        <h2 className="about-title ">
          Fashion{" "}
          <strong className="title-highlight">
            inspiration
            <span className="title-highlight-span"></span>
          </strong>{" "}
        </h2>

        <p className="about-description">
          My inspiration comes from the world around me—art, culture, and the
          raw beauty of everyday life. I’m drawn to the stories behind fashion,
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
