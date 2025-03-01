import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import SplitType from "split-type";
import "./Hero.scss";

import hero1 from "../../assets/images/al-romaizan/1.jpeg";
import hero2 from "../../assets/images/taali/17.jpeg";
import hero3 from "../../assets/images/inframe-dubai/2.jpeg";

gsap.registerPlugin(CustomEase, Flip);

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const Hero = () => {
  const textRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Create custom eases
    CustomEase.create(
      "hop",
      "M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1"
    );

    CustomEase.create(
      "hop2",
      "M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1"
    );

    // Split text
    const splitHeader = new SplitType(".hero__artist-title", {
      types: "lines",
    });

    splitHeader.lines?.forEach((line) => {
      const text = line.textContent;
      const wrapper = document.createElement("div");
      wrapper.className = "line";
      const span = document.createElement("span");
      span.textContent = text;
      wrapper.appendChild(span);
      line.parentNode?.replaceChild(wrapper, line);
    });

    // Initialize timelines
    const mainTl = gsap.timeline();
    const revealerTl = gsap.timeline();
    const scaleTl = gsap.timeline();

    // Revealer animation
    revealerTl
      .to(".r-1", {
        clipPath: "Polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.5,
        ease: "hop",
      })
      .to(
        ".r-2",
        {
          clipPath: "Polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "hop",
        },
        "<"
      );

    // Scale animation
    scaleTl.to(".hero__img:first-child", {
      scale: 1,
      duration: 2,
      ease: "power4.inOut",
    });

    const images = document.querySelectorAll(".hero__img:not(:first-child)");
    images.forEach((img) => {
      scaleTl.to(
        img,
        {
          opacity: 1,
          scale: 1,
          duration: 1.25,
          ease: "power3.out",
        },
        ">-0.5"
      );
    });

    // Main timeline
    mainTl
      .add(revealerTl)
      .add(scaleTl, "-=1.25")
      .add(() => {
        const mainImages = document.querySelectorAll(
          ".hero__img:not(.hero__main)"
        );
        mainImages.forEach((img) => img.remove());

        const state = Flip.getState(".hero__main");

        const imagesContainer = document.querySelector(".hero__images");
        imagesContainer?.classList.add("stacked-container");

        document.querySelectorAll(".hero__main").forEach((img, i) => {
          img.classList.add("stacked");
          img.style.order = i.toString();
          gsap.set(".hero__img.stacked", {
            clearProps: "transform, top, left",
          });
        });

        return Flip.from(state, {
          duration: 2,
          ease: "hop",
          absolute: true,
          stagger: {
            amount: -0.3,
          },
        });
      })
      .set(".hero__artist-tags", {
        y: 300,
      })
      .to(".hero__text-container", {
        y: 0,
        duration: 3,
        ease: "hop2",
        stagger: 0.1,
        delay: 1.25,
      })
      .to(".hero__artist-title ", {
        y: 0,
        duration: 2,
        ease: "hop2",
        stagger: 0.1,
        delay: -2.5,
      })
      .to(".header", {
        y: 0,
        duration: 3,
        ease: "hop",
        stagger: 0.1,
        delay: -4.5,
      })
      .to(".hero__artist-tags", {
        display: "flex",
        y: 0,
        duration: 3,
        ease: "hop2",
        stagger: 0.1,
        delay: 16,
      });

    // Text scramble effect
    if (textRef.current) {
      const phrases = ["RIHA MEHINDI", "FASHION STYLIST", "PERSONAL STYLIST"];
      const fx = new TextScramble(textRef.current);
      let counter = 0;
      let iterations = 0;
      const maxIterations = 6;

      const next = () => {
        if (iterations < maxIterations) {
          fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 2500);
          });
          counter = (counter + 1) % phrases.length;
          iterations++;
        } else {
          fx.setText(phrases[0]);
        }
      };

      next();
    }

    // Cleanup
    return () => {
      if (textRef.current) {
        cancelAnimationFrame(textRef.current.frameRequest);
      }
    };
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      <div className="hero__container">
        <div className="hero__revealers">
          <div className="hero__revealer r-1"></div>
          <div className="hero__revealer r-2"></div>
        </div>

        <div className="hero__images">
          <div className="hero__img hero__main">
            <h6 className="hero__img_name">Kendall Jenner</h6>
            <img src={hero1} alt="Kendall Jenner" />
          </div>
          <div className="hero__img hero__main">
            <h6 className="hero__img_center_name">Naomi Campbell</h6>
            <img src={hero2} alt="Naomi Campbell" />
          </div>
          <div className="hero__img hero__main">
            <h6 className="hero__img_name">Gigi Hadid</h6>
            <img
              src={hero3}
              alt="Gigi Hadid"
              id="heroImage"
            />
          </div>
        </div>

        <div className="hero__content">
          <div className="hero__text-container">
            <div className="text hero__artist-title" ref={textRef}></div>
            <div className="hero__artist-tags">
              <span className="hero__tag">based in uae, dubai</span>
              <span className="hero__tag">fashion stylist</span>
              <span className="hero__tag">Personal Stylist</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
