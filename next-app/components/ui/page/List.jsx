import React from "react";
import { ANIMATE, MAX_WIDTH } from "@/components/constants";
import Link from "next/link";
import { useStore } from "@/store";
import clsx from "clsx";
import { Hr, Tag } from ".";

export function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export function separateDAO(inputString) {
  const matches = inputString.match(/\bDAO\b/g);

  if (matches) {
    const result = matches.join(" ");
    const leftover = inputString.split(/\bDAO\b/);
    return (leftover.length > 1 ? leftover[1].trim() + " " : "") + result;
  } else {
    return inputString;
  }
}

export const List = ({ arr, showIndex, search, setPageLoading }) => {
  const { user } = useStore();

  return (
    <div
      className={clsx(
        "w-full overflow-y-scroll hide-scrollbar grow mt-2 !mb-0 flex flex-col",
        ANIMATE,
        MAX_WIDTH
      )}
    >
      {arr.map((ele, idx) => {
        const char =
          idx === 0 ||
          arr[idx - 1].name[0].toLowerCase() !== arr[idx].name[0].toLowerCase()
            ? arr[idx].name[0]
            : null;

        const key = ele.id;
        const name = ele.name;

        return (
          <div id={key} key={key} className="contents">
            {showIndex === true && char !== null && (
              <React.Fragment>
                <div
                  className={clsx(
                    "px-3 pt-4 pb-1 text-base uppercase text-isLabelLightSecondary font-400",
                    search !== "" ? "hidden" : ""
                  )}
                >
                  {search?.length > 0 ? search[0] : char}
                </div>

                <Hr classes={clsx("!px-3")} />
              </React.Fragment>
            )}

            <Link
              onClick={() => {
                setPageLoading(true);
              }}
              href={`/proposals?protocol=${key}&username=${user.id}&chatid=${user.chatid}`}
              className="flex flex-row items-center justify-between w-full hover:bg-isSeparatorLight"
            >
              <div className={clsx("grow py-3 leading-none px-3 text-base")}>
                {capitalizeFirstLetter(name).trim()}
              </div>

              {ele.active !== "0" && (
                <Tag
                  text={`${ele.active} active`}
                  bg={clsx("bg-isBlueLight")}
                />
              )}

              {ele.new !== "0" && (
                <Tag text={`${ele.new} new`} bg={clsx("bg-isGreenLight")} />
              )}
            </Link>

            <Hr classes={clsx("!px-3")} />
          </div>
        );
      })}

      {/* {arr.length === 0 && (
        <React.Fragment>
          <div className="flex flex-col items-center w-full h-full px-3 py-5 text-center grow place-content-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 fill-isLabelLightSecondary"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>

            <div className="text-xl text-center break-all text-isSystemDarkTertiary font-700">
              {protocolFilter === "subscribed" && search === ""
                ? `No subscriptions found`
                : `No Results for "{search}"`}
            </div>
            <div className="text-sm text-center text-isLabelLightSecondary font-500">
              {protocolFilter === "subscribed" && search === ""
                ? `Try subscribing some protocols to start receiving proposal alerts. `
                : `Check the spelling or try a new search.`}
            </div>
          </div>
        </React.Fragment>
      )} */}
    </div>
  );
};
