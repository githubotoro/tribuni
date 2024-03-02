import clsx from "clsx";
import { MAX_WIDTH, ANIMATE } from "@/components/constants";

export const Tabs = ({ list, setter, active, classes }) => {
  return (
    <div className={clsx("w-full max-w-md px-4", classes)}>
      <div
        className={clsx(
          "w-full p-[0.16rem] rounded-xl bg-isFillLightTertiary text-sm  grid grid-cols-3 gap-[0.16rem] text-isLabelLightPrimary font-500",
          MAX_WIDTH
        )}
      >
        {list.map((tag, index) => (
          <button
            key={index}
            onClick={() => {
              setter(tag);
            }}
            className={clsx(
              "w-full text-center capitalize rounded-lg py-1",
              ANIMATE,
              active === tag ? "bg-isWhite" : ""
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
