import React from "react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col md:flex-row gap-8 items-end justify-between p-8">
      <Logo className="w-40 h-fit text-foreground" />
      <p>the Apartment x Jonas Bergmar {currentYear}.</p>
    </footer>
  );
};

export default Footer;
