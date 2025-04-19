import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const SheetCustom = ({
  btn,
  content,
  header,
  side,
}: {
  btn: React.ReactNode;
  content: React.ReactNode;
  header?: string;
  side?: "top" | "right" | "bottom" | "left";
}) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{btn}</SheetTrigger>
        <SheetContent
          side={side || "bottom"}
          className={` ${side === "bottom" ? "h-[80vh] " : "h-[100vh] "} overflow-y-auto`}
        >
          <SheetHeader>
            <SheetTitle className="text-left flex justify-between items-center">
              <span>{header}</span>
            </SheetTitle>
          </SheetHeader>
          <div className="py-4  px-5 space-y-6">{content}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetCustom;
