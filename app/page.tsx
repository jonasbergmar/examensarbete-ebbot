import React from "react";
import Hero from "./components/Hero";
import TheJourney from "./components/TheJourney";
const page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Hero />
      <TheJourney />
    </div>
  );
};

export default page;
