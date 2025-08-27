"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const FacebookPixel: React.FC<{ pixelID: string }> = ({ pixelID }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(pixelID);
        ReactPixel.pageView();
      });
  }, [pathname, searchParams]);

  return null;
};

export default FacebookPixel;
