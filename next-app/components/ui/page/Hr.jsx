import { MAX_WIDTH } from "@/components/constants";
import clsx from "clsx";

export const Hr = ({ classes }) => {
  return (
    <div className={clsx("w-full", MAX_WIDTH, classes)}>
      <hr className={clsx("w-full rounded-full bg-isSeparatorLight")} />
    </div>
  );
};
