import clsx from "clsx";
import { Spinner } from "@/components/loaders";

export default function Loading() {
  return (
    <div className="flex flex-col items-center p-4">
      <Spinner classes={clsx("w-5 h-5 border-isBlueLight")} />
    </div>
  );
}
