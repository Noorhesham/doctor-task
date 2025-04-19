import React from "react";

const Container = ({
  className,
  children,
  CustomePadding,
}: {
  className?: string;
  children: React.ReactNode;
  CustomePadding?: string;
}) => {
  return (
    <div
      className={`${className || ""}  border border-input rounded-2xl shadow-sm ${
        CustomePadding || "md:py-5 px-3 py-1.5 md:px-8"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
