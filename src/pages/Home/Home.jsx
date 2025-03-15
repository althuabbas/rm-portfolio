import Hero from "../../components/Hero/Hero";
import "./Home.scss";
import { moodBoard, moodBoardAssist } from "../../assets/client-images";
import WorkedWith from "../../components/WorkedWith/WorkedWith";
import Artist from "../../components/Artist/Artist";
import Inspiration from "../../components/Inspiration/Inspiration";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import CommercialShoot from "../../components/CommercialShoot/CommercialShoot";
import Footer from "../../components/Footer/Footer";
import ProductStyling from "../../components/ProductStyling/ProductStyling";
import CustomCursor from "../../components/InteractiveCursor/InteractiveCursor";

// advance shoot
import ad1 from "../../assets/images/advanced-shoot/as1.webp";
import ad2 from "../../assets/images/advanced-shoot/as2.webp";
import ad3 from "../../assets/images/advanced-shoot/as3.webp";
import LouisVuitton from "../../components/LouisVuitton/LouisVuitton";
import VideoSlider from "../../components/VideoSlider/VideoSlider";

// Import video assets
import video1 from "../../assets/videos/ss1.mp4";
import video2 from "../../assets/videos/ss2.mp4";
import thumbnail1 from "../../assets/thumbnail/ss-thumbnail-1.png";
import thumbnail2 from "../../assets/thumbnail/ss-thumbnail-2.png";
import thumbnail11 from "../../assets/thumbnail/ss-thumbnail-11.png";
import ssLogo from "../../assets/thumbnail/ssLogo.jpg";

const Home = () => {
  const lenisRef = useRef(null);

  const videoData = [
    {
      id: 1,
      src: video1,
      thumbnail: thumbnail1,
      title:
        "Bringing beauty and style together for @sunsilk's tik tok Ramadan show",
      description:
        "Honored to create looks that celebrate confidence, culture, and the essence of the season. #StyledByMe #SunsilkRamadan",
      profileImage: ssLogo,
    },
    {
      id: 2,
      src: video2,
      thumbnail: thumbnail2,
      title:
        "Bringing beauty and style together for @sunsilk's tik tok Ramadan show",
      description:
        "Honored to create looks that celebrate confidence, culture, and the essence of the season. #StyledByMe #SunsilkRamadan",
      profileImage: ssLogo,
    },
    {
      id: 3,
      src: video1,
      thumbnail: thumbnail11,
      title:
        "Bringing beauty and style together for @sunsilk's tik tok Ramadan show",
      description:
        "Honored to create looks that celebrate confidence, culture, and the essence of the season. #StyledByMe #SunsilkRamadan",
      profileImage: ssLogo,
    },
    {
      id: 4,
      src: video2,
      thumbnail: thumbnail1,
      title:
        "Bringing beauty and style together for @sunsilk's tik tok Ramadan show",
      description:
        "Honored to create looks that celebrate confidence, culture, and the essence of the season. #StyledByMe #SunsilkRamadan",
      profileImage: ssLogo,
    },
  ];

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    // Create Lenis instance
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Connect Lenis to ScrollTrigger
    lenisRef.current.on("scroll", ScrollTrigger.update);

    // Connect Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenisRef.current.raf(time * 1000);
    });

    // GSAP lag smoothing
    gsap.ticker.lagSmoothing(0);

    // Optional: add a scroll-to-top when component mounts
    window.scrollTo(0, 0);

    // Clean up
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        gsap.ticker.remove(lenisRef.current.raf);
      }
    };
  }, []);

  // Horizontal Scroll
  const scrollContainerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollWrapper = scrollWrapperRef.current;

    if (!scrollContainer || !moodBoardAssist?.length) return;

    // Calculate dimensions
    const containerWidth = scrollWrapper.offsetWidth;
    const itemWidth = containerWidth / 3; // Show exactly 3 images in the frame

    // Set width for each image
    const images = scrollContainer.querySelectorAll(".mood_board_image");
    images.forEach((img) => {
      gsap.set(img, { width: itemWidth });
    });

    // Clone images for infinite scroll effect
    const totalWidth = itemWidth * moodBoardAssist.length;

    // Set the container width to fit all images
    gsap.set(scrollContainer, {
      width: totalWidth * 2,
      x: 0,
    });

    // Clone the images for infinite scroll
    moodBoardAssist.forEach((_, index) => {
      const clone = images[index].cloneNode(true);
      scrollContainer.appendChild(clone);

      // Add same event listeners to clones
      clone.addEventListener("mouseenter", pauseAnimation);
      clone.addEventListener("mouseleave", resumeAnimation);
    });

    // Setup animation
    animationRef.current = gsap.to(scrollContainer, {
      x: -totalWidth,
      duration: 80, // Adjust speed
      ease: "none",
      repeat: -1,
      paused: false,
    });

    // Hover handlers
    function pauseAnimation() {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    }

    function resumeAnimation() {
      if (animationRef.current) {
        animationRef.current.play();
      }
    }

    // Add hover event listeners to original images
    images.forEach((img) => {
      img.addEventListener("mouseenter", pauseAnimation);
      img.addEventListener("mouseleave", resumeAnimation);
    });

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      const allImages = scrollContainer.querySelectorAll("img");
      allImages.forEach((img) => {
        img.removeEventListener("mouseenter", pauseAnimation);
        img.removeEventListener("mouseleave", resumeAnimation);
      });
    };
  }, [moodBoardAssist]);

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* <Link to="/client/fp-model-agency">Go to fp-model-agency's Details</Link>
      <Link to="/client/sweet-lady">Go to sweet-lady's Details</Link> */}

      {/* Know about artist section */}
      <section className="artist wrapper">
        <Artist />
      </section>

      {/* Fashion Inspiration */}

      <section>
        <Inspiration />
      </section>

      {/* Louis Vuitton */}
      <section style={{ marginTop: "0" }}>
        <LouisVuitton />
      </section>

      {/* Commercial Shoot */}
      <section className="spacing">
        <CommercialShoot />
      </section>

      <section className="spacing">
        <ProductStyling />
      </section>

      {/* Mood Board */}
      <section className="mood_board spacing">
        <div className="wrapper">
          <div className="about-subtitle">
            Riha Mehindi X Kristina Fidelskaya
          </div>
          <div className="mood_board__text_area">
            {/* <h2 className="mood_board__header header_text">Editorial Styling</h2> */}
            <h2 className="about-title">
              Editorial{" "}
              <strong className="title-highlight">
                Styling
                <span className="title-highlight-span"></span>
              </strong>{" "}
            </h2>
            <div className="mood_board__info">
              <ul className="mood_board__list">
                <li>
                  Creative director:
                  <span className="mood_board__list_title">
                    {" "}
                    Seher Khan
                  </span>{" "}
                </li>
                <li>
                  Photographer:
                  <span className="mood_board__list_title">Jef Anog</span>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mood_board__grid_images">
          {moodBoard?.map((image, index) => (
            <img src={image?.value} alt="" key={index} />
          ))}
        </div>
      </section>

      <section className="spacing">
        <CustomCursor
          hoverSelectors={[".mood_board_image"]}
          text="Hover To Hold"
        />
        <div className="mood_board_assist">
          <div className="wrapper">
            <div className="about-subtitle">Riha Mehindi X Designers & us</div>
            <div className="mood_board__text_area">
              <h4 className="about-title">
                fad talents With/{" "}
                <strong className="title-highlight">
                  Designers & us
                  <span className="title-highlight-span"></span>
                </strong>{" "}
              </h4>

              <div className="mood_board__info">
                <ul className="mood_board__list">
                  <li>
                    Creative director:
                    <span className="mood_board__list_title">
                      {" "}
                      Seher Khan
                    </span>{" "}
                  </li>
                  <li>
                    Photographer:
                    <span className="mood_board__list_title">
                      Jef Anog
                    </span>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mood_board_assist__spacing">
            <div
              className="mood_board_assist__container"
              ref={scrollWrapperRef}
            >
              <div
                className="mood_board_assist__scroll"
                ref={scrollContainerRef}
              >
                {moodBoardAssist?.map((image, index) => (
                  <div key={index} className="mood_board_image_wrapper">
                    <img
                      src={image?.value}
                      alt=""
                      className="mood_board_image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="spacing">
        <div className="advanced_shoot wrapper">
          <div className="mood_board__text_area">
            {/* <h2 className="advanced_shoot__header header_text">
              Advanced Editorial Shoot
            </h2> */}
            <h2 className="about-title">
              Advanced{" "}
              <strong className="title-highlight">
                Editorial Shoot
                <span className="title-highlight-span"></span>
              </strong>{" "}
            </h2>
            <div className="mood_board__info">
              <ul className="mood_board__list">
                <li>
                  Creative Director:
                  <span className="mood_board__list_title">
                    Jojo Dantespadua
                  </span>
                </li>
                <li>
                  Photographer:
                  <span className="mood_board__list_title">CS toledo</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="advanced_shoot__grid_images">
            <img src={ad1} alt="" className="ad1" />
            <img src={ad2} alt="" className="ad2" />
            <img src={ad3} alt="" className="ad3" />
          </div>
        </div>
      </section>

      {/* sunsilk add */}
      <section>
        <VideoSlider videoData={videoData} />
      </section>

      <section className="worked_with_container" style={{ marginTop: "0" }}>
        <WorkedWith />
      </section>

      <Footer />
    </>
  );
};

export default Home;
