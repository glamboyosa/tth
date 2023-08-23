import { cn } from "@/lib/utils";

type SpacerProps = {
  /**
   * The optional css styling passed in
   */
  className?: string;
};

const Spacer = ({ className }: SpacerProps) => {
  return (
    <div
      className={cn(
        "flex h-12 items-center justify-center mb-20",
        className && className
      )}
    ></div>
  );
};

export default Spacer;
