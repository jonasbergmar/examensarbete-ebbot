import React from "react";
import Logo from "./Logo";
import Pill from "./Pill";

const Hero = () => {
  return (
    <div
      id="start"
      className=" relative flex flex-col md:flex-row p-4 md:p-8 gap-8 w-full h-auto lg:h-screen"
    >
      <div className="blob"></div>
      <div className=" relative backdrop-blur-lg p-4 md:p-8 bg-card rounded-[2.5rem] flex flex-col items-start gap-6 justify-between  overflow-clip w-full">
        <h1 className=" text-3xl md:text-5xl text-[#48965D]  leading-[0.95] font-semibold tracking-tight">
          <span className="text-foreground text-3xl md:text-5xl">
            Visual Identity &
          </span>{" "}
          <br />
          <span className="text-[#48965D] text-3xl md:text-5xl">
            Web redesign
          </span>{" "}
          <br />
          for ebbot.com
        </h1>
        <div className=" flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <Pill label="UI/UX Design" icon="design_services" />
            <Pill label="Visual Identity" icon="palette" />
            <Pill label="Webflow Development" icon="code" />
          </div>
          <p className=" text-muted-foreground text-lg leading-snug tracking-tight font-medium max-w-xl">
            Ebbot AI is a SaaS company that helps businesses automate their
            customer service through EbootGPT, AI agents, EbbotAPI & livechat.
            To help them achieve their goal in aligning there visual identity
            better with their growing company, we got the opportunity to
            redesign the website to be more consistent and modern aswell as
            giving the brand a new visual identity.
          </p>
        </div>
        <Logo className="w-full h-fit text-foreground" />
      </div>
    </div>
  );
};

export default Hero;
