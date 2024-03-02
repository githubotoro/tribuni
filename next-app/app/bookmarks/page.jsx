import { MAX_WIDTH } from "@/components/constants";
import clsx from "clsx";

export default function Page() {
  return (
    <div className={clsx("w-full p-4 h-full pb-24", MAX_WIDTH)}>
      <div className="w-full flex flex-row space-x-3 text-4xl font-700 h-full bg-isSystemLightSecondary rounded-2xl items-center place-content-center">
        <div className="text-isLabelLightSecondary">Coming</div>{" "}
        <div className="text-isBlack">Soon</div>
      </div>
    </div>
  );
}
