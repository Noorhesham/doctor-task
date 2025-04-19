import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import MaxWidthWrapper from "./MaxWidthWrapper";

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
        <SheetContent side={side || "bottom"} className="h-[80vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-left flex justify-between items-center">
              <span>{header}</span>
            </SheetTitle>
          </SheetHeader>
          <MaxWidthWrapper className="py-4 space-y-6">{content}</MaxWidthWrapper>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetCustom;
