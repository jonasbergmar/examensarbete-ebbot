"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const theJourney = [
  {
    id: "challenge",
    title: "The challenge",
    largeDescription:
      "Ebbot had outgrown its old identity. Once known for chatbot solutions, the company had evolved into a serious AI platform, but the website didn’t reflect that.",
    description:
      "It was visually outdated, dark in tone, and difficult to manage internally. The content was too technical, accessibility fell short of WCAG 2.2, and the tone didn’t speak to decision-makers who needed clarity, not complexity.",
    icon: "check_circle",
    image: "/ebbotold.png",
  },
  {
    id: "goal",
    title: "The goal",
    largeDescription:
      "The mission was to reimagine Ebbot’s digital presence to better reflect who they are today, a human-first AI platform.",
    description:
      "That meant building a flexible, accessible, and brand-true website. The design had to stand out visually, the language needed to be clearer and less jargon-heavy, and the backend had to empower the Ebbot team to update and grow the site independently.",
    icon: "check_circle",
    image: "/goal.png",
  },
  {
    id: "result",
    title: "The result",
    largeDescription:
      "The new ebbot.com is brighter, clearer, and fully modular. It reflects Ebbot’s tech strength without losing human warmth.",
    description:
      "It was built in Webflow using CMS and page slots, giving the internal team complete control of content and layout. The collaboration was close, the client was thrilled, and the new site now supports both product storytelling and long-term scalability.",
    icon: "check_circle",
    image: "/result.png",
  },
];

const revealSection = () => {
  gsap.registerPlugin(ScrollTrigger);

  const sections = document.querySelectorAll(".reveal_section");
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};

const TheJourney = () => {
  useEffect(() => {
    revealSection();
  }, []);
  return (
    <div className=" relative flex flex-col md:flex-row p-4 md:p-8 gap-8 w-full h-auto ">
      <div className=" relative flex flex-col items-center justify-center gap-8 w-full h-full">
        <h2 className=" text-foreground px-4 md:px-8 lg:px-10 text-3xl md:text-5xl lg:text-7xl font-medium max-w-3xl text-center">
          The challenge, goal and result
        </h2>
        <div className="flex flex-col gap-20">
          {theJourney.map((item) => (
            <div
              id={item.id}
              key={item.id}
              className="reveal_section bg-card p-4 md:p-8 lg:p-10 rounded-[2.5rem] flex flex-col  gap-8 justify-between items-start"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-[1.5rem]"
              />
              <div className="flex flex-col justify-between items-start lg:flex-row gap-4 w-full">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium flex items-center gap-2">
                  <span className="material-icons">{item.icon}</span>
                  {item.title}
                </h3>
                <div className="flex flex-col gap-4">
                  <p className=" max-w-xl text-2xl md:text-3xl lg:text-4xl font-medium text-foreground">
                    {item.largeDescription}
                  </p>
                  <p className=" max-w-xl text-base md:text-lg lg:text-xl font-medium text-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheJourney;
