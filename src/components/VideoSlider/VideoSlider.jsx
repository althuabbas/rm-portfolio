import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./VideoSlider.scss";

// Sample video data - replace with your actual data

const VideoSlider = ({ videoData, subTitle, firstTitle, secondTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(
    Array(videoData?.length || 0).fill(false)
  );
  const [expandedDescriptions, setExpandedDescriptions] = useState(
    Array(videoData?.length || 0).fill(false)
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [videoDurations, setVideoDurations] = useState(
    Array(videoData?.length || 0).fill(0)
  );
  const videoRefs = useRef([]);
  const horizontalSliderRef = useRef(null);
  // Touch swipe tracking refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderContainerRef = useRef(null);

  // Check device size
  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsDesktop(window.innerWidth >= 768); // Changed from 1200 to include tablets
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);

    return () => {
      window.removeEventListener("resize", checkDeviceSize);
    };
  }, []);

  // Handle video progress and duration for mobile
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];

    if (isMobile && isPlaying && currentVideo) {
      // Reset progress when changing videos
      setProgress(0);

      const handleTimeUpdate = () => {
        const currentTime = currentVideo.currentTime;
        const duration = videoDurations[currentIndex];
        const progressPercentage = (currentTime / duration) * 100;

        setProgress(progressPercentage);

        // Move to next video when current one ends
        if (currentTime >= duration) {
          handleNext();
        }
      };

      // Add timeupdate event listener
      currentVideo.addEventListener("timeupdate", handleTimeUpdate);

      // Play the current video
      currentVideo.play().catch(e => {
        console.log("Mobile play error:", e);
        // Try playing again on user interaction
        document.addEventListener('touchstart', function playOnTouch() {
          currentVideo.play().catch(err => console.log("Touch play error:", err));
          document.removeEventListener('touchstart', playOnTouch);
        }, { once: true });
      });

      return () => {
        if (currentVideo) {
          currentVideo.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }
  }, [currentIndex, isMobile, isPlaying, videoDurations]);

  // Handle video duration updates
  const handleLoadedMetadata = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      const duration = video.duration;
      setVideoDurations((prev) => {
        const newDurations = [...prev];
        newDurations[index] = duration;
        return newDurations;
      });
    }
  };

  // Pause/play videos based on current index
  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (
          (index === currentIndex && isPlaying) ||
          (isDesktop && index === hoveredIndex)
        ) {
          videoRef.play().catch((e) => console.log("Play error:", e));
        } else {
          videoRef.pause();
        }
      }
    });
  }, [currentIndex, isPlaying, hoveredIndex, isDesktop]);

  // Update mute status for all videos
  useEffect(() => {
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        videoRef.muted = isMuted;
      }
    });
  }, [isMuted]);

  // Update horizontal slider position based on actual video count
  useEffect(() => {
    if (isDesktop && horizontalSliderRef.current && videoData && videoData.length > 0) {
      const totalItems = videoData.length;
      
      // Calculate slide width based on actual number of videos
      let slideWidth;
      if (totalItems >= 4) {
        slideWidth = 100 / 4;
      } else {
        slideWidth = 100 / totalItems;
      }
      
      // Calculate the transform value
      let transformValue;
      
      // If we're at the end of the videos (for 4+ videos), loop back to start
      if (totalItems > 4 && currentIndex >= totalItems - 3) {
        // Start showing the first videos again as we approach the end
        transformValue = (totalItems - 4) * slideWidth;
      } else {
        transformValue = currentIndex * slideWidth;
      }
      
      horizontalSliderRef.current.style.transform = `translateX(-${transformValue}%)`;
    }
  }, [currentIndex, isDesktop, videoData]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (!videoData || videoData.length <= 1) return;

    setCurrentIndex((prev) => (prev === 0 ? videoData.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (!videoData || videoData.length <= 1) return;

    setCurrentIndex((prev) => (prev === videoData.length - 1 ? 0 : prev + 1));
  };

  // Only used in pagination, uncomment if pagination is enabled
  // const handleDotClick = (index, e) => {
  //   if (e) e.stopPropagation();
  //   setCurrentIndex(index);
  // };

  const togglePlayPause = (e) => {
    if (e) e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  // Enhanced for better touch interaction on tablet
  const toggleMute = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsMuted((prev) => !prev);
  };

  // Add touch-friendly content interaction
  const handleItemClick = (index, e) => {
    if (e) e.stopPropagation();
    
    // On tablet touch, set as current
    if (!isMobile && window.innerWidth < 1200) {
      setCurrentIndex(index);
    }
  };

  const toggleDescription = (index, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const newExpandedDescriptions = [...expandedDescriptions];
    newExpandedDescriptions[index] = !newExpandedDescriptions[index];
    setExpandedDescriptions(newExpandedDescriptions);
  };

  const handleVideoLoad = (index) => {
    const newLoaded = [...videoLoaded];
    newLoaded[index] = true;
    setVideoLoaded(newLoaded);
  };

  const handleMouseEnter = (index) => {
    if (isDesktop) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setHoveredIndex(null);
    }
  };

  // Function to truncate description
  const truncateDescription = (text, maxLength = 60) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Get visible indices for horizontal slider
  const getVisibleIndices = () => {
    if (!videoData || videoData.length === 0) return [];

    const totalItems = videoData.length;
    // Only show as many videos as are available, up to 4
    const visibleCount = Math.min(totalItems, 4);
    const indices = [];

    // If we're near the end, start showing from the beginning again
    let startIdx = currentIndex;
    if (totalItems > 4 && currentIndex >= totalItems - 3) {
      startIdx = totalItems - 4;
    }

    for (let i = 0; i < visibleCount; i++) {
      let index = (startIdx + i) % totalItems;
      indices.push(index);
    }

    return indices;
  };

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDiff = touchStartX.current - touchEndX.current;
    // Minimum swipe distance to register as a swipe (px)
    const minSwipeDistance = 50;
    
    if (Math.abs(swipeDiff) > minSwipeDistance) {
      if (swipeDiff > 0) {
        // Swiped left, go next
        handleNext();
      } else {
        // Swiped right, go prev
        handlePrev();
      }
    }
    
    // Reset touch values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="video-slider-container" ref={sliderContainerRef}>
      <div>
        <div className="louis-vuitton-subtitle">{subTitle}</div>
        <h2 className="about-title louis-vuitton-title">
          {firstTitle}{"  "} X {"  "}
          <strong className="title-highlight">
            {secondTitle}
            <span className="title-highlight-span"></span>
          </strong>{" "}
        </h2>
      </div>
      {isMobile ? (
        // Mobile view - Instagram-like story slider
        <div 
          className="mobile-slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="progress-container">
            {videoData?.map((_, index) => (
              <div
                key={index}
                className={`progress-bar ${
                  index === currentIndex ? "active" : ""
                } ${index < currentIndex ? "completed" : ""}`}
              >
                <div
                  className="progress-fill"
                  style={{
                    width:
                      index === currentIndex
                        ? `${progress}%`
                        : index < currentIndex
                        ? "100%"
                        : "0%",
                  }}
                ></div>
              </div>
            ))}
          </div>

          <div className="video-container">
            {videoData?.map((video, index) => (
              <div
                key={video.id}
                className={`video-slide ${
                  index === currentIndex ? "active" : ""
                }`}
              >
                <div
                  className="thumbnail-container"
                  style={{ display: !videoLoaded[index] ? "block" : "none" }}
                >
                  <img
                    src={video.thumbnail}
                    alt={`Thumbnail for ${video.title}`}
                    className="video-thumbnail"
                    loading="lazy"
                  />
                  <div className="play-icon">▶</div>
                </div>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  loop={false}
                  muted={isMuted}
                  playsInline
                  onClick={togglePlayPause}
                  onLoadedData={() => handleVideoLoad(index)}
                  onLoadedMetadata={() => handleLoadedMetadata(index)}
                  onEnded={() => {
                    // When a video ends in mobile view, go to the next one
                    if (isMobile) handleNext();
                  }}
                  style={{ display: videoLoaded[index] ? "block" : "none" }}
                />
                <div className="video-info">
                  <div className="video-header">
                    <div className="profile-image">
                      <img
                        src={video.profileImage || video.thumbnail}
                        alt="Profile"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="video-title">{video.title}</h3>
                  </div>
                  <div className="description-container">
                    <p>
                      {expandedDescriptions[index]
                        ? video.description
                        : truncateDescription(video.description)}
                    </p>
                    {video.description && video.description.length > 60 && (
                      <button
                        className="read-more-btn"
                        onClick={(e) => toggleDescription(index, e)}
                      >
                        {expandedDescriptions[index]
                          ? "Show less"
                          : "Read more"}
                      </button>
                    )}
                  </div>
                </div>
                <button className="mute-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute video" : "Mute video"}>
                  {isMuted ? "🔇" : "🔊"}
                </button>
              </div>
            ))}
          </div>

          <div className="navigation-controls">
            <button className="nav-btn prev" onClick={handlePrev}>
              <span>←</span>
            </button>
            <button className="nav-btn play-pause" onClick={togglePlayPause}>
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button className="nav-btn next" onClick={handleNext}>
              <span>→</span>
            </button>
          </div>
        </div>
      ) : (
        // Desktop and Tablet view - Horizontal slider
        <div 
          className="horizontal-slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={`slider-track ${
              videoData && videoData.length > 0 
                ? videoData.length === 1 
                  ? 'videos-1' 
                  : videoData.length === 2 
                    ? 'videos-2' 
                    : videoData.length === 3 
                      ? 'videos-3' 
                      : 'videos-4-plus'
                : ''
            }`} 
            ref={horizontalSliderRef}
          >
            {videoData && videoData.length > 0 ? (
              videoData.map((video, index) => (
                <div
                  key={video.id}
                  className={`slider-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => handleItemClick(index, e)}
                >
                  <div
                    className="thumbnail-container"
                    style={{ display: !videoLoaded[index] ? "block" : "none" }}
                  >
                    {video.thumbnail && (
                      <img
                        src={video.thumbnail}
                        alt={`Thumbnail for ${video.title}`}
                        className="video-thumbnail"
                        loading="lazy"
                      />
                    )}
                    <div className="play-icon">▶</div>
                  </div>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.src}
                    loop
                    muted={isMuted}
                    playsInline
                    onLoadedData={() => handleVideoLoad(index)}
                    onLoadedMetadata={() => handleLoadedMetadata(index)}
                    style={{ display: videoLoaded[index] ? "block" : "none" }}
                    onClick={() => {
                      if (videoRefs.current[index].paused) {
                        videoRefs.current[index].play();
                      } else {
                        videoRefs.current[index].pause();
                      }
                    }}
                  />
                  <div className="video-overlay"></div>
                  <div className="video-info">
                    <div className="video-header">
                      <div className="profile-image">
                        <img
                          src={video.profileImage || video.thumbnail}
                          alt="Profile"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="video-title">{video.title}</h3>
                    </div>
                    <div className="description-container">
                      <p>
                        {expandedDescriptions[index]
                          ? video.description
                          : truncateDescription(video.description, 100)}
                      </p>
                      {video.description && video.description.length > 100 && (
                        <button
                          className="read-more-btn"
                          onClick={(e) => toggleDescription(index, e)}
                          aria-label={
                            expandedDescriptions[index]
                              ? "Show less text"
                              : "Show more text"
                          }
                        >
                          {expandedDescriptions[index]
                            ? "Show less"
                            : "Read more"}
                        </button>
                      )}
                    </div>
                  </div>
                  <button 
                    className="mute-btn" 
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? "🔇" : "🔊"}
                  </button>
                </div>
              ))
            ) : (
              <div className="no-videos-message">No videos available</div>
            )}
          </div>

          {videoData && videoData.length > 0 && (
            <>
              {videoData.length > 4 && (
                <div className="slider-nav">
                  <button className="nav-btn prev" onClick={handlePrev}>
                    <span>←</span>
                  </button>
                  <button className="nav-btn next" onClick={handleNext}>
                    <span>→</span>
                  </button>
                </div>
              )}

              {/* <div className="slider-pagination">
                {videoData.map((_, index) => (
                  <div
                    key={index}
                    className={`pagination-dot ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={(e) => handleDotClick(index, e)}
                  ></div>
                ))}
              </div> */}
              
              <div className="visible-indicator">
                {getVisibleIndices().map((index) => (
                  <span key={index} className="visible-item">
                    {index + 1}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

VideoSlider.propTypes = {
  videoData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      src: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  subTitle: PropTypes.string,
  firstTitle: PropTypes.string,
  secondTitle: PropTypes.string
};

// Default props
VideoSlider.defaultProps = {
  videoData: [],
  subTitle: '',
  firstTitle: '',
  secondTitle: ''
};

export default VideoSlider;
