"use client";

import { ANIMATE, MAX_WIDTH } from "@/components/constants";
import { useStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const Navigator = () => {
  const params = useSearchParams();
  const username = params.get("username");
  const chatid = params.get("chatid");

  const { activeProposal, setActiveProposal } = useStore();

  return (
    <div
      className={clsx(
        "flex flex-col items-start w-full group",
        ANIMATE,
        MAX_WIDTH
      )}
    >
      {activeProposal === null ? (
        <Link
          href={`/protocols?username=${username}&chatid=${chatid}`}
          className={clsx("flex flex-row items-center space-x-0", ANIMATE)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={clsx(
              "w-6 h-6 fill-isBlueLight stroke-isBlueLight",
              ANIMATE
            )}
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>

          <div className={clsx("text-sm text-isBlueLight font-500", ANIMATE)}>
            Protocols
          </div>
        </Link>
      ) : (
        <button
          onClick={() => {
            setActiveProposal(null);
          }}
          className={clsx("flex flex-row items-center space-x-0", ANIMATE)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={clsx(
              "w-6 h-6 fill-isBlueLight stroke-isBlueLight",
              ANIMATE
            )}
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>

          <div className={clsx("text-sm text-isBlueLight font-500", ANIMATE)}>
            Back
          </div>
        </button>
      )}
    </div>
  );
};
