import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/src/locomotive-scroll.scss";
import gsap from "gsap";
import "./ClientDetails.scss";
import {
  alRomaizan,
  bijouqItaly,
  bridal,
  FPModelAgency,
  inFrame,
  soFearClock,
  sweetLady,
  taali,
  layalaLenses,
  lcWaikiki,
} from "../../assets/client-images";

// Import image data for different clients

const ClientDetails = () => {
  const { name } = useParams(); // Get the route parameter
  const [images, setImages] = useState([]); // State to hold the images

  const galleryContainerRef = useRef(null);
  const imgModalRef = useRef(null);
  const imgViewContainerRef = useRef(null);
  const modalNameRef = useRef(null);
  const tlRef = useRef(null);

  // Set images based on the route parameter
  useEffect(() => {
    switch (name) {
      case "riha-mehindi-x-fp-model-agency":
        setImages(FPModelAgency);
        break;
      case "riha-mehindi-x-sweet-lady":
        setImages(sweetLady);
        break;
      case "riha-mehindi-x-bridel":
        setImages(bridal);
        break;
      case "riha-mehindi-x-so-fear-clock-":
        setImages(soFearClock);
        break;
      case "riha-mehindi-x-infame-dubai":
        setImages(inFrame);
        break;
      case "riha-mehindi-x-bijouq-italy":
        setImages(bijouqItaly);
        break;
      case "riha-mehindi-x-al-romaizan":
        setImages(alRomaizan);
        break;
      case "riha-mehindi-x-taali":
        setImages(taali);
        break;
      case "riha-mehindi-x-layala-lenses":
        setImages(layalaLenses);
        break;
      case "riha-mehindi-x-lc-waikiki":
        setImages(lcWaikiki);
        break;
      default:
        setImages([]); // Default to an empty array
    }
  }, [name]);

  // Initialize GSAP timeline and modal reveal animation
  const revealModal = () => {
    const tl = gsap.timeline({ paused: true });

    tl.to(".img-modal", 0.75, {
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut",
      pointerEvents: "auto",
    });

    tl.to(".gallery, .container", 0.01, {
      pointerEvents: "none",
    });

    tl.to(".img-modal .img", 0.75, {
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut",
    });

    tl.to(
      ".modal-item p",
      1,
      {
        top: 0,
        ease: "power4.inOut",
        stagger: {
          amount: 0.2,
        },
      },
      "<"
    ).reverse();

    tlRef.current = tl;
  };

  // Handle image click
  const handleImageClick = (imgSrc, imgName) => {
    if (imgViewContainerRef.current && modalNameRef.current) {
      imgViewContainerRef.current.innerHTML = `<img src="${imgSrc}" alt="" />`;
      modalNameRef.current.textContent = imgName;
      tlRef.current.reversed(!tlRef.current.reversed());
    }
  };

  // Handle close button click
  const handleCloseClick = () => {
    tlRef.current.reversed(!tlRef.current.reversed());
  };

  // Initialize gallery and modal
  useEffect(() => {
    const galleryContainer = galleryContainerRef.current;
    const imgModal = imgModalRef.current;

    if (galleryContainer && images.length > 0) {
      galleryContainer.innerHTML = ""; // Clear existing content

      images.forEach((image, index) => {
        const item = document.createElement("div");
        item.classList.add("item");

        const itemImg = document.createElement("div");
        itemImg.classList.add("item-img");

        const imgTag = document.createElement("img");
        imgTag.src = image.value; // Use the value from the image data
        itemImg.appendChild(imgTag);

        const itemName = document.createElement("div");
        itemName.classList.add("item-name");
        itemName.innerHTML = `<p>${
          image.label || `Image ${String(index + 1).padStart(2, "0")}`
        }</p>`;
        itemName.setAttribute("data-img", image.value.replace(".jpeg", ""));

        item.appendChild(itemImg);
        item.appendChild(itemName);

        item.addEventListener("click", () => {
          handleImageClick(
            image.value,
            image.label || `Image ${String(index + 1).padStart(2, "0")}`
          );
        });

        galleryContainer.appendChild(item);
      });
    }

    const closeBtn = imgModal?.querySelector(".close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", handleCloseClick);
    }

    revealModal();

    // Cleanup event listeners
    return () => {
      if (closeBtn) {
        closeBtn.removeEventListener("click", handleCloseClick);
      }
    };
  }, [images]); // Re-run this effect when `images` changes

  // Initialize Locomotive Scroll
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      multiplier: 0.75,
      scrollFromAnywhere: true,
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div className="container" data-scroll-container>
      <h1 data-scroll-section></h1>
      <div
        className="gallery"
        data-scroll-section
        ref={galleryContainerRef}
      ></div>

      <div className="img-modal" ref={imgModalRef}>
        <div className="img-name modal-item">
          <p ref={modalNameRef}>img name</p>
          <div className="modal-item-revealer"></div>
        </div>
        <div className="close-btn modal-item">
          <p>close</p>
          <div className="modal-item-revealer"></div>
        </div>
        <div className="img" ref={imgViewContainerRef}></div>
      </div>
    </div>
  );
};

export default ClientDetails;
