"use client";
import React, { useEffect, useState, useRef } from "react";
import NavLink from "./NavLink";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleFocusOut = (e: FocusEvent) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(e.relatedTarget as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [isOpen]);

  useEffect(() => {
    const navContainer = navRef.current;
    const staggerItems = navContainer?.querySelectorAll(".stagger-item");
    const staggerArray = staggerItems ? Array.from(staggerItems) : [];

    if (!navContainer) return;

    if (isOpen) {
      setShouldRender(true);
    }

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsAnimating(true);

    timelineRef.current = gsap.timeline({
      defaults: { duration: 0.5, ease: "power2.inOut" },
      onComplete: () => {
        setIsAnimating(false);
        if (!isOpen) {
          setShouldRender(false);
        }
      },
    });

    if (isOpen) {
      timelineRef.current
        .fromTo(
          navContainer,
          {
            scale: 0,
            transformOrigin: "right top",
          },
          {
            scale: 1,
            transformOrigin: "right top",
          }
        )
        .fromTo(
          staggerArray,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
          },
          "-=0.2"
        );
    } else {
      timelineRef.current
        .to(staggerArray, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
        })
        .to(
          navContainer,
          {
            scale: 0,
            opacity: 0,
            transformOrigin: "right top",
          },
          "-=0.2"
        );
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isOpen]);

  return (
    <header className="flex w-full fixed top-0 left-0 z-50 justify-end items-center px-6 py-6 md:px-10 md:py-10 transition-all duration-300">
      <div className="relative z-50">
        <Button
          aria-label={isOpen ? "Close menu" : "Open menu"}
          variant="outline"
          className={`text-primary hover:text-black bg-black rounded-full p-2 w-14 h-14 transition-all duration-300 shadow-lg ${
            isOpen ? "bg-primary text-black" : "bg-black"
          }`}
          onClick={toggleMenu}
        >
          <span
            className={`material-icons transition-transform duration-500 ease-in-out ${isOpen ? "rotate-45 " : "delay-500"}`}
          >
            add
          </span>
        </Button>
      </div>
      {(isOpen || isAnimating || shouldRender) && (
        <div
          ref={navRef}
          className="absolute top-0 right-0 w-[calc(100%-1rem)] md:w-1/2  h-[calc(100svh-2rem)] bg-black/95 rounded-[3rem] m-2 md:m-4 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav className="w-full h-full flex flex-col items-start justify-start gap-8 px-4 py-8">
            <ul>
              <li>
                <NavLink
                  className="stagger-item"
                  aria-label="Start page"
                  href="/#start"
                  onClick={() => setIsOpen(false)}
                >
                  Start
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="stagger-item"
                  aria-label="Challenge"
                  href="/#challenge"
                  onClick={() => setIsOpen(false)}
                >
                  Challenge
                </NavLink>
              </li>
              <li>
                <NavLink
                  aria-label="Goals"
                  href="/#goal"
                  onClick={() => setIsOpen(false)}
                  className="stagger-item"
                >
                  Goals
                </NavLink>
              </li>
              <li>
                <NavLink
                  aria-label="Results"
                  href="/#result"
                  onClick={() => setIsOpen(false)}
                  className="stagger-item"
                >
                  Results
                </NavLink>
              </li>
              <li>
                <NavLink
                  aria-label="Leave a note"
                  href="/leave-note"
                  onClick={() => setIsOpen(false)}
                  className="stagger-item"
                >
                  Leave a note
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="stagger-item absolute flex flex-col gap-2 bottom-8 left-8 w-1/2">
            <p className="text-3xl md:text-5xl uppercase  font-semibold text-muted-foreground tracking-tight">
              Contact me
            </p>
            <a
              aria-label="Contact me through email"
              href="mailto:jonas@bergmar.com?subject=Let's%20Connect"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl md:text-5xl uppercase font-semibold text-primary cursor-pointer leading-none tracking-tight"
            >
              jonas@bergmar.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
