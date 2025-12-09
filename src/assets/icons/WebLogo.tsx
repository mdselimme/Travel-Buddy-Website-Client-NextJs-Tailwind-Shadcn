import Image from "next/image";
import React from "react";
import webLogo from "../images/travel-buddy-logo.webp";

const WebLogo = () => {
  return (
    <div className="relative w-[200px] h-[60px]">
      <Image
        src={webLogo}
        alt="Web Logo"
        fill={true}
        loading="eager"
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
      />
    </div>
  );
};

export default WebLogo;
