import Image from "next/image";
import React from "react";
import SslLogo from "../images/sslcommerz.jpeg";

const SslCommerzLogo = () => {
  return (
    <div className="relative w-[200px] h-full">
      <Image
        src={SslLogo}
        alt="Web Logo"
        fill={true}
        loading="eager"
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
      />
    </div>
  );
};

export default SslCommerzLogo;
