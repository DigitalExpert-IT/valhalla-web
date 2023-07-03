import { useEffect, useState } from "react";

export const useScreen = () => {
  const [isMobileScreen, setMobileScreen] = useState<boolean>(false);

  const handleScreenResize = (val: any) => {
    if (val?.target?.screen.width <= 480) {
      setMobileScreen(true);
    } else setMobileScreen(false);
  };

  useEffect(() => {
    window.screen.width <= 450 && setMobileScreen(true);
    window.addEventListener("resize", handleScreenResize);

    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  return { isMobileScreen };
};
