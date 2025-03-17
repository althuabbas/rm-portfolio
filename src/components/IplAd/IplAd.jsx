import { useRef, useEffect } from "react";
import "./IplAd.scss";

import iplAd from "../../assets/videos/IPL/IPL_ad.mp4";

const IplAd = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const frameIdRef = useRef(null);
  const throttleRef = useRef(false);
  
  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      // Sample fewer pixels for performance
      const sampleSize = 10; // Only sample every 10 pixels
      
      const updateAmbient = () => {
        if (video.paused || video.ended || throttleRef.current) return;
        
        // Throttle updates to reduce CPU usage
        throttleRef.current = true;
        setTimeout(() => {
          throttleRef.current = false;
        }, 200); // Only update every 200ms
        
        // Use smaller canvas size for performance
        const scaleFactor = 0.1; // Reduce canvas to 10% of video size
        canvas.width = video.videoWidth * scaleFactor;
        canvas.height = video.videoHeight * scaleFactor;
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        try {
          // Extract colors from the edges for the ambient effect
          // Sample only from edge pixels to improve performance
          const topEdgeData = ctx.getImageData(0, 0, canvas.width, 1).data;
          const bottomEdgeData = ctx.getImageData(0, canvas.height - 1, canvas.width, 1).data;
          
          // Sample only a few pixels for color extraction
          let topR = 0, topG = 0, topB = 0;
          let bottomR = 0, bottomG = 0, bottomB = 0;
          let count = 0;
          
          for (let i = 0; i < topEdgeData.length; i += 4 * sampleSize) {
            topR += topEdgeData[i];
            topG += topEdgeData[i+1];
            topB += topEdgeData[i+2];
            
            bottomR += bottomEdgeData[i];
            bottomG += bottomEdgeData[i+1];
            bottomB += bottomEdgeData[i+2];
            
            count++;
          }
          
          // Average the sampled colors
          topR = Math.floor(topR/count);
          topG = Math.floor(topG/count);
          topB = Math.floor(topB/count);
          
          bottomR = Math.floor(bottomR/count);
          bottomG = Math.floor(bottomG/count);
          bottomB = Math.floor(bottomB/count);
          
          // Update CSS variables for ambient glow
          document.documentElement.style.setProperty('--ambient-color-top', `rgba(${topR}, ${topG}, ${topB}, 0.4)`);
          document.documentElement.style.setProperty('--ambient-color-bottom', `rgba(${bottomR}, ${bottomG}, ${bottomB}, 0.4)`);
        } catch (error) {
          console.log('Error updating ambient colors:', error);
        }
        
        frameIdRef.current = requestAnimationFrame(updateAmbient);
      };
      
      const startAmbient = () => {
        if (!frameIdRef.current) {
          frameIdRef.current = requestAnimationFrame(updateAmbient);
        }
      };
      
      // Handle visibility changes to pause processing when tab is hidden
      const handleVisibilityChange = () => {
        if (document.hidden && frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
          frameIdRef.current = null;
        } else if (!document.hidden && !frameIdRef.current) {
          startAmbient();
        }
      };
      
      video.addEventListener('play', startAmbient);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      if (!video.paused) {
        startAmbient();
      }
      
      return () => {
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
        }
        video.removeEventListener('play', startAmbient);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.documentElement.style.removeProperty('--ambient-color-top');
        document.documentElement.style.removeProperty('--ambient-color-bottom');
      };
    }
  }, []);

  return (
    <div className="ipl_ad_container">
      <div>
        <div className="louis-vuitton-subtitle">ipl promo shoot</div>
        <h2 className="about-title louis-vuitton-title">
          rihamehindi{"  "} X {"  "}
          <strong className="title-highlight">
            ipl
            <span className="title-highlight-span"></span>
          </strong>{" "}
        </h2>
      </div>
      <div className="ipl_ad ambient-mode">
        <video 
          ref={videoRef}
          src={iplAd} 
          autoPlay 
          muted 
          loop 
          className="ipl_ad_video" 
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default IplAd;
