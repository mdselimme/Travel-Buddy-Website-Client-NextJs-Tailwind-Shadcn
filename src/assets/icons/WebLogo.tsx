import Image from "next/image";
import React from "react";
import webLogo from "../images/travel-buddy-logo.webp";

const WebLogo = () => {
  return <Image src={webLogo} alt="Web Logo" width={200} height={60} />;
};

export default WebLogo;
