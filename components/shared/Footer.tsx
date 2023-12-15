import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper flex-between flex flex-col sm:flex-row gap-4 p-4">
        <Image
          src="/assets/images/logo.svg"
          width={128}
          height={32}
          alt="events app logo"
          className="cusror-pointer"
        />
        <p>2023 Evently. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
