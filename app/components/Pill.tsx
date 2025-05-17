import React from "react";
type PillProps = {
  label: string;
  icon: string;
};

const Pill = ({ label, icon }: PillProps) => {
  return (
    <div className=" rounded-full px-2 py-1 text-sm  text-foreground border border-border flex items-center gap-1">
      <span className="material-icons text-lg text-foreground">{icon}</span>
      {label}
    </div>
  );
};

export default Pill;
