import { DotsSix } from "@phosphor-icons/react";
import "./Header.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const timelineRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize GSAP timeline
    timelineRef.current = gsap.timeline({ paused: true });

    if (menuRef.current) {
      const links = menuRef.current.querySelectorAll("li");

      timelineRef.current
        .to(menuRef.current, {
          duration: 1,
          opacity: 1,
          height: "60vh",
          ease: "expo.inOut",
        })
        .from(
          links,
          {
            duration: 1,
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: "expo.inOut",
          },
          "-=0.5"
        );

      timelineRef.current.reverse();
    }

    // Scroll handler
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (headerRef.current) {
        if (currentScrollY < lastScrollY || currentScrollY < 50) {
          headerRef.current.classList.remove("header__hidden");
        } else {
          headerRef.current.classList.add("header__hidden");
        }
      }

      setLastScrollY(currentScrollY);
    };

    // Wheel handler for menu reset
    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        timelineRef.current?.reverse();
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [lastScrollY]);

  const handleHamburgerClick = () => {
    if (timelineRef.current) {
      timelineRef.current.reversed(!timelineRef.current.reversed());
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="wrapper header__wrapper">
        <div></div>
        <a href="/" className="header__logo">
          {" "}
          RM.
        </a>
        <DotsSix
          size={32}
          className="header__menu"
          onClick={handleHamburgerClick}
        />
      </div>

      <ul ref={menuRef}>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Products</a>
        </li>
        <li>
          <a href="#">Blogs</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
