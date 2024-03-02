import clsx from "clsx";
import { MAX_WIDTH, ANIMATE } from "@/components/constants";

export const Filters = ({ list, setter, active, classes }) => {
  return (
    <div className={clsx("w-full flex flex-row items-center", classes)}>
      {list.map((tag, index) => (
        <button
          key={index}
          onClick={() => {
            setter(tag);
          }}
          className={clsx(
            "ml-8 w-fit text-center capitalize rounded-lg py-1 text-sm font-500",
            ANIMATE,
            active === tag
              ? "text-isLabelLightPrimary underline underline-offset-4 decoration-wi decoration-isBlueLight"
              : "text-isLabelLightSecondary"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
