import React from "react";

function VideoContent() {
  return (
    <div
      className="w-full"
      style={{ paddingBottom: "10%", paddingLeft: "20%", objectFit: "cover" }}
    >
      {" "}
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/fjJOgb-E41w?si=7JDR_bYskKZLtQlH"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default VideoContent;
