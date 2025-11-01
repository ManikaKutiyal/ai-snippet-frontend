import React from 'react';

function VideoBackground() {
  return (
    <div className="video-background">
      <video autoPlay loop muted playsInline>
        {/* This path works because the video is in the 'public' folder */}
        <source src="/bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoBackground;
