import clsx from "clsx";
import { ANIMATE, MAX_WIDTH } from "@/components/constants";

export const Title = ({ text }) => {
  return (
    <div
      className={clsx(
        "w-full text-4xl text-isLabelLightPrimary font-700 pl-4 pt-3",
        ANIMATE,
        MAX_WIDTH
      )}
    >
      {text}
    </div>
  );
};
