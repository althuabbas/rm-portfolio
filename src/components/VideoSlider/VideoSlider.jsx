import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./VideoSlider.scss";

// Sample video data - replace with your actual data

const VideoSlider = ({videoData}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(Array(videoData?.length || 0).fill(false));
  const [expandedDescriptions, setExpandedDescriptions] = useState(Array(videoData?.length || 0).fill(false));
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const videoRefs = useRef([]);
  const progressIntervalRef = useRef(null);
  const horizontalSliderRef = useRef(null);
  const progressDuration = 10000; // 10 seconds per video
  const progressStep = 10; // Update progress every 10ms

  // Check device size
  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsDesktop(window.innerWidth >= 1200);
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);

    return () => {
      window.removeEventListener("resize", checkDeviceSize);
    };
  }, []);

  // Handle video progress for mobile
  useEffect(() => {
    if (isMobile && isPlaying) {
      // Reset progress when changing videos
      setProgress(0);

      // Clear any existing interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      // Start new progress interval
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressIntervalRef.current);
            // Move to next video when progress completes
            handleNext();
            return 0;
          }
          return prev + (progressStep / progressDuration) * 100;
        });
      }, progressStep);

      // Play the current video
      if (videoRefs.current[currentIndex]) {
        videoRefs.current[currentIndex].play();
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentIndex, isMobile, isPlaying]);

  // Pause/play videos based on current index
  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if ((index === currentIndex && isPlaying) || 
            (isDesktop && index === hoveredIndex)) {
          videoRef.play().catch(e => console.log("Play error:", e));
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

  // Update horizontal slider position
  useEffect(() => {
    if (isDesktop && horizontalSliderRef.current) {
      const slideWidth = 100 / 4; // 4 videos per view
      horizontalSliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }
  }, [currentIndex, isDesktop]);

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

  const handleDotClick = (index, e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(index);
  };

  const togglePlayPause = (e) => {
    if (e) e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    setIsMuted((prev) => !prev);
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
    const visibleCount = Math.min(totalItems, 4); // Show 4 videos at a time
    const indices = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % totalItems;
      indices.push(index);
    }
    
    return indices;
  };

  return (
    <div className="video-slider-container">
      {isMobile ? (
        // Mobile view - Instagram-like story slider
        <div className="mobile-slider">
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
                <div className="thumbnail-container" style={{ display: !videoLoaded[index] ? 'block' : 'none' }}>
                  <img 
                    src={video.thumbnail} 
                    alt={`Thumbnail for ${video.title}`} 
                    className="video-thumbnail" 
                  />
                  <div className="play-icon">▶</div>
                </div>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={togglePlayPause}
                  onLoadedData={() => handleVideoLoad(index)}
                  style={{ display: videoLoaded[index] ? 'block' : 'none' }}
                />
                <div className="video-info">
                  <div className="video-header">
                    <div className="profile-image">
                      <img 
                        src={video.profileImage || video.thumbnail} 
                        alt="Profile" 
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
                        {expandedDescriptions[index] ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>
                </div>
                <button 
                  className="mute-btn" 
                  onClick={toggleMute}
                >
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
      ) : isDesktop ? (
        // Desktop view - Horizontal slider with 4 videos
        <div className="horizontal-slider">
          <div 
            className="slider-track" 
            ref={horizontalSliderRef}
          >
            {videoData?.map((video, index) => (
              <div 
                key={video.id} 
                className={`slider-item ${index === currentIndex ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="thumbnail-container" style={{ display: !videoLoaded[index] ? 'block' : 'none' }}>
                  <img 
                    src={video.thumbnail} 
                    alt={`Thumbnail for ${video.title}`} 
                    className="video-thumbnail" 
                  />
                  <div className="play-icon">▶</div>
                </div>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  loop
                  muted={isMuted}
                  playsInline
                  onLoadedData={() => handleVideoLoad(index)}
                  style={{ display: videoLoaded[index] ? 'block' : 'none' }}
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
                        aria-label={expandedDescriptions[index] ? "Show less text" : "Show more text"}
                      >
                        {expandedDescriptions[index] ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>
                </div>
                <button 
                  className="mute-btn" 
                  onClick={toggleMute}
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>
              </div>
            ))}
          </div>
          
          <div className="slider-nav">
            <button className="nav-btn prev" onClick={handlePrev}>
              <span>←</span>
            </button>
            <button className="nav-btn next" onClick={handleNext}>
              <span>→</span>
            </button>
          </div>
          
          <div className="slider-pagination">
            {videoData?.map((_, index) => (
              <div 
                key={index} 
                className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={(e) => handleDotClick(index, e)}
              ></div>
            ))}
          </div>
          
          <div className="visible-indicator">
            {getVisibleIndices().map((index) => (
              <span key={index} className="visible-item">{index + 1}</span>
            ))}
          </div>
        </div>
      ) : (
        // Tablet view - Dynamic grid
        <div className="video-grid">
          {videoData?.map((video, index) => (
            <div 
              key={video.id} 
              className="grid-item"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="thumbnail-container" style={{ display: !videoLoaded[index] ? 'block' : 'none' }}>
                <img 
                  src={video.thumbnail} 
                  alt={`Thumbnail for ${video.title}`} 
                  className="video-thumbnail" 
                />
                <div className="play-icon">▶</div>
              </div>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.src}
                loop
                muted={isMuted}
                playsInline
                onLoadedData={() => handleVideoLoad(index)}
                style={{ display: videoLoaded[index] ? 'block' : 'none' }}
                onClick={() => {
                  if (videoRefs.current[index].paused) {
                    videoRefs.current[index].play();
                  } else {
                    videoRefs.current[index].pause();
                  }
                }}
              />
              <div className="video-info">
                <div className="video-header">
                  <div className="profile-image">
                    <img 
                      src={video.profileImage || video.thumbnail} 
                      alt="Profile" 
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
                      {expandedDescriptions[index] ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>
              <button 
                className="mute-btn" 
                onClick={toggleMute}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
            </div>
          ))}
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
      description: PropTypes.string
    })
  ).isRequired
};

// Default props
VideoSlider.defaultProps = {
  videoData: []
};

export default VideoSlider;
