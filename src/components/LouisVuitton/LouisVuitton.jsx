import "./LouisVuitton.scss";
import { useEffect, useState } from "react";

// Import images
import lv1 from "../../assets/images/LV/lv-1.jpeg";
import lv2 from "../../assets/images/LV/lv-2.jpeg";
import lv3 from "../../assets/images/LV/lv-3.jpeg";
import lv4 from "../../assets/images/LV/lv-4.jpeg";
import lv5 from "../../assets/images/LV/lv-5.jpeg";
import lvLogo from "../../assets/images/LV/lv-logo.png";
import villa88Logo from "../../assets/images/LV/Villa88-Logo-gold.png";
import { InstagramLogo } from "@phosphor-icons/react";

const LouisVuitton = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    // Generate logo elements with a precise arranged pattern
    const generateLogos = () => {
      const newLogos = [];
      const isMobile = window.innerWidth < 768;

      // Create a more structured, arranged pattern
      if (isMobile) {
        // Mobile pattern - 3x3 grid
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            // Center position for each cell in the grid
            const left = col * 33.33 + 16.67; // Evenly spaced columns
            const top = row * 33.33 + 16.67; // Evenly spaced rows

            // Alternate between LV and Villa88 logos in a checkerboard pattern
            const isVilla = (row + col) % 2 === 0;

            // Size based on position - center is largest
            const isCenter = row === 1 && col === 1;
            const size = isCenter ? 80 : 60;

            // Minimal animation properties for a more structured look
            const delay = (row + col) * 0.5; // Sequential delays
            const duration = 50 + row * col; // Varied but predictable durations
            const opacity = isCenter ? 0.7 : 0.5;

            newLogos.push({
              id: row * 3 + col,
              src: isVilla ? villa88Logo : lvLogo,
              style: {
                width: `${size}px`,
                height: `${size}px`,
                left: `calc(${left}% - ${size / 2}px)`,
                top: `calc(${top}% - ${size / 2}px)`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                opacity,
              },
            });
          }
        }
      } else {
        // Desktop pattern - diamond/rhombus arrangement

        // Central logo
        newLogos.push({
          id: 0,
          src: villa88Logo,
          style: {
            width: "120px",
            height: "120px",
            left: "calc(50% - 60px)",
            top: "calc(50% - 60px)",
            animationDelay: "0s",
            animationDuration: "60s",
            opacity: 0.8,
          },
        });

        // Inner diamond - 4 logos
        const innerRadius = 25; // % from center
        const innerPositions = [
          { left: 50, top: 50 - innerRadius }, // Top
          { left: 50 + innerRadius, top: 50 }, // Right
          { left: 50, top: 50 + innerRadius }, // Bottom
          { left: 50 - innerRadius, top: 50 }, // Left
        ];

        innerPositions.forEach((pos, i) => {
          newLogos.push({
            id: i + 1,
            src: lvLogo,
            style: {
              width: "90px",
              height: "90px",
              left: `calc(${pos.left}% - 45px)`,
              top: `calc(${pos.top}% - 45px)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "55s",
              opacity: 0.7,
            },
          });
        });

        // Middle diamond - 4 logos at diagonals
        const middleRadius = 35; // % from center
        const middlePositions = [
          { left: 50 + middleRadius * 0.7, top: 50 - middleRadius * 0.7 }, // Top-right
          { left: 50 + middleRadius * 0.7, top: 50 + middleRadius * 0.7 }, // Bottom-right
          { left: 50 - middleRadius * 0.7, top: 50 + middleRadius * 0.7 }, // Bottom-left
          { left: 50 - middleRadius * 0.7, top: 50 - middleRadius * 0.7 }, // Top-left
        ];

        middlePositions.forEach((pos, i) => {
          newLogos.push({
            id: i + 5,
            src: i % 2 === 0 ? villa88Logo : lvLogo,
            style: {
              width: "75px",
              height: "75px",
              left: `calc(${pos.left}% - 37.5px)`,
              top: `calc(${pos.top}% - 37.5px)`,
              animationDelay: `${i * 0.5 + 2}s`,
              animationDuration: "50s",
              opacity: 0.6,
            },
          });
        });

        // Outer diamond - 4 logos
        const outerRadius = 45; // % from center
        const outerPositions = [
          { left: 50, top: 50 - outerRadius }, // Top
          { left: 50 + outerRadius, top: 50 }, // Right
          { left: 50, top: 50 + outerRadius }, // Bottom
          { left: 50 - outerRadius, top: 50 }, // Left
        ];

        outerPositions.forEach((pos, i) => {
          newLogos.push({
            id: i + 9,
            src: lvLogo,
            style: {
              width: "80px",
              height: "80px",
              left: `calc(${pos.left}% - 40px)`,
              top: `calc(${pos.top}% - 40px)`,
              animationDelay: `${i * 0.5 + 4}s`,
              animationDuration: "45s",
              opacity: 0.65,
            },
          });
        });

        // Corner logos
        const cornerPositions = [
          { left: 10, top: 10 },
          { left: 90, top: 10 },
          { left: 90, top: 90 },
          { left: 10, top: 90 },
        ];

        cornerPositions.forEach((pos, i) => {
          newLogos.push({
            id: i + 13,
            src: i % 2 === 0 ? villa88Logo : lvLogo,
            style: {
              width: "70px",
              height: "70px",
              left: `calc(${pos.left}% - 35px)`,
              top: `calc(${pos.top}% - 35px)`,
              animationDelay: `${i * 0.5 + 6}s`,
              animationDuration: "40s",
              opacity: 0.6,
            },
          });
        });
      }

      setLogos(newLogos);
    };

    generateLogos();

    // Regenerate on window resize
    const handleResize = () => {
      generateLogos();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
        
      <h2 className="about-title louis-vuitton-title">
        Louis Vuitton{"  "} X {"  "}
        <strong className="title-highlight">
          Villa88 Magazine
          <span className="title-highlight-span"></span>
        </strong>{" "}
      </h2>

      <div className="louis-vuitton-background">
        <div className="top-gradient"></div>
        <div className="bottom-gradient"></div>

        {/* Logo pattern elements */}
        <div className="logo-pattern">
          {logos.map((logo) => (
            <img
              key={logo.id}
              src={logo.src}
              alt="Logo"
              className="floating-logo"
              style={logo.style}
            />
          ))}
        </div>

        <div className="louis-vuitton-container">
          {/* <h2 className="about-title louis-vuitton-title">
          Louis Vuitton{"  "} X {"  "}
          <strong className="title-highlight">
            Villa88 Magazine
            <span className="title-highlight-span"></span>
          </strong>{" "}
        </h2> */}

          <div className="louis-vuitton-grid">
            <div className="grid-item">
              <img src={lv1} alt="Louis Vuitton" />
            </div>
            <div className="grid-item">
              <img src={lv2} alt="Louis Vuitton" />
            </div>
            <div className="grid-item">
              <img src={lv3} alt="Louis Vuitton" />
            </div>
            <div className="grid-item">
              <img src={lv4} alt="Louis Vuitton" />
            </div>
            <div className="grid-item">
              <img src={lv5} alt="Louis Vuitton" />
            </div>
          </div>

          <div className="louis-vuitton-description">
            <p>
              Timeless elegance meets Ramadan grace Honoured to style for
              @louisvuitton&apos;s Ramadan collection with @villa88magazine. A
              fusion of tradition and luxury, captured in every detail.
              #LouisVuitton #RamadanElegance
            </p>
          </div>

          <div className="louis-vuitton-credits">
            <ul>
              <li>
                <div className="louis-vuitton-credits-item">
                  <span>Mehmet Erzincan</span>
                  <a
                    href="https://instagram.com/merzincan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-icon"
                    aria-label="Mehmet Erzincan Instagram"
                  >
                    <InstagramLogo size={20} weight="regular" />
                  </a>
                </div>
                <span className="louis-vuitton-credits-title">
                  Photographer
                </span>
              </li>
              <li>
                <div className="louis-vuitton-credits-item">
                  <span>Polina Shabelnikova</span>
                  <a
                    href="https://instagram.com/shabelnikova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-icon"
                    aria-label="Polina Shabelnikova Instagram"
                  >
                    <InstagramLogo size={20} weight="regular" />
                  </a>
                </div>
                <span className="louis-vuitton-credits-title">Stylist</span>
              </li>
              <li>
                <div className="louis-vuitton-credits-item">
                  <span>Riha Mehindi</span>
                  <a
                    href="https://instagram.com/riha_mehindi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-icon"
                    aria-label="Riha Mehindi Instagram"
                  >
                    <InstagramLogo size={20} weight="regular" />
                  </a>
                </div>
                <span className="louis-vuitton-credits-title">
                  Assistant Stylist
                </span>
              </li>
              <li>
                <div className="louis-vuitton-credits-item">
                  <span>Safiyah Cassim</span>
                  <a
                    href="https://instagram.com/safiyahcassim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-icon"
                    aria-label="Safiyah Cassim Instagram"
                  >
                    <InstagramLogo size={20} weight="regular" />
                  </a>
                </div>
                <span className="louis-vuitton-credits-title">
                  Hair and Makeup
                </span>
              </li>
              <li>
                <div className="louis-vuitton-credits-item">
                  <span>Beya Bou-Harb</span>
                  <a
                    href="https://instagram.com/beyabouharb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-icon"
                    aria-label="Beya Bou-Harb Instagram"
                  >
                    <InstagramLogo size={20} weight="regular" />
                  </a>
                </div>
                <span className="louis-vuitton-credits-title">
                  Creative Producer
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LouisVuitton;
