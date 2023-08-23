import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type HomeNavProps = {
  /**
   * The optional css styling passed in
   */
  className?: string;
};
// composable home nav
const HomeNav = ({ children, className }: PropsWithChildren<HomeNavProps>) => {
  return (
    <nav
      className={cn(
        "flex items-center gap-24 justify-evenly md:gap-28",
        className && className
      )}
    >
      {children}
    </nav>
  );
};

export default HomeNav;
