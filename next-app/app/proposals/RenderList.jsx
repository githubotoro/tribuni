"use client";

import React from "react";
import clsx from "clsx";
import { useState } from "react";
import { ANIMATE, MAX_WIDTH } from "@/components/constants";
import { useParams } from "next/navigation";
import { useStore } from "@/store";
import { ChevronForward, ExclamationmarkSquareFill } from "@/components/ios";
import { ExpandProposal } from "./ExpandProposal";
import { Tabs } from "@/components/ui/page";

function timeFromNow(timestamp) {
  const currentDate = new Date();
  const targetDate = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const timeDifference = targetDate - currentDate;

  const seconds = Math.abs(Math.floor(timeDifference / 1000));
  const minutes = Math.abs(Math.floor(seconds / 60));
  const hours = Math.abs(Math.floor(minutes / 60));
  const days = Math.abs(Math.floor(hours / 24));
  const weeks = Math.abs(Math.floor(days / 7));
  const months = Math.abs(Math.floor(days / 30));
  const years = Math.abs(Math.floor(days / 365));

  if (timeDifference < 0) {
    // Past timestamp
    if (years > 0) return `${years}y ago`;
    if (months > 0) return `${months}mo ago`;
    if (weeks > 0) return `${weeks}w ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}min ago`;

    return `${seconds}s ago`;
  } else {
    // Future timestamp
    if (years > 0) return `in ${years}y`;
    if (months > 0) return `in ${months}mo`;
    if (weeks > 0) return `in ${weeks}w`;
    if (days > 0) return `in ${days}d`;
    if (hours > 0) return `in ${hours}h`;
    if (minutes > 0) return `in ${minutes}min`;

    return `in ${seconds}s`;
  }
}

// Example usage:
// const futureTimestamp = 1698954087 + 3600; // Adding 1 hour to the previous example
// console.log(timeFromNow(futureTimestamp));

export const RenderList = ({ proposalMap, protocol }) => {
  const params = useParams();
  // const [activeProposal, setActiveProposal] = useState(null);

  const [filter, setFilter] = useState("all");

  const { activeProposal, setActiveProposal } = useStore();

  let proposals = Object.keys(proposalMap).map((key) => {
    return proposalMap[key];
  });

  proposals.sort((a, b) => b.endtime - a.endtime);

  const filteredProposals = proposals.filter((proposal) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDifference = proposal.endtime - currentTime;

    if (filter === "all") {
      return true; // Keep all proposals
    } else if (filter === "active") {
      return timeDifference > 0; // Keep proposals with endtime in the future
    } else if (filter === "closed") {
      return timeDifference < 0; // Keep proposals with endtime in the past
    }

    return false; // Default to false if 'filter' has an unrecognized value
  });

  return (
    <React.Fragment>
      {activeProposal === null && (
        <Tabs
          list={["all", "active", "closed"]}
          setter={setFilter}
          active={filter}
          classes={clsx("!pt-0 !px-0 !max-w-none mt-1")}
        />
      )}

      <div
        id="proposal-detail"
        className={clsx(
          "w-full overflow-y-auto grow !space-y-2 text-md hide-scrollbar rounded-xl mt-5 pb-20",
          ANIMATE,
          MAX_WIDTH,
          activeProposal !== null && "mt-3"
        )}
      >
        {activeProposal !== null && (
          <ExpandProposal proposalMap={proposalMap} protocol={protocol} />
        )}

        {activeProposal === null && (
          <React.Fragment>
            {filteredProposals.map((proposal) => {
              const startDiff =
                Math.floor(Date.now() / 1000) - proposal.starttime;
              const diff = proposal.endtime - Math.floor(Date.now() / 1000);

              return (
                <button
                  key={proposal.id}
                  onClick={() => {
                    setActiveProposal(proposal.id);

                    const proposalDetail =
                      document.getElementById("proposal-detail");

                    if (proposalDetail) {
                      proposalDetail.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="w-full hover:bg-isSystemLightTertiary bg-isWhite rounded-2xl !mt-0 p-4 flex flex-row"
                >
                  <div className="flex flex-col grow w-[calc(100%-3rem)]">
                    <div className="w-full flex flex-row items-center space-x-1 font-400 text-base">
                      <div className="tracking-tight rounded-md w-fit text-isLabelLightSecondary ">
                        {timeFromNow(proposal.starttime)}
                      </div>

                      {/* <div
                      className={clsx(
                        "shrink-0 w-fit px-1 text-isWhite text-center flex flex-col items-center place-content-center rounded-md",
                        diff < 0 ? "bg-isRedLight" : "bg-isGreenLight"
                      )}
                    >
                      {diff < 0 ? "closed " : "active "}
                    </div>

                    {startDiff > 0 && startDiff < 48 * 60 * 60 && (
                      <div
                        className={clsx(
                          "shrink-0 w-fit px-1 text-isWhite text-center flex flex-col items-center place-content-center rounded-md bg-isBlueLight"
                        )}
                      >
                        new
                      </div>
                    )}

                    {diff > 0 && diff < 24 * 60 * 60 && (
                      <div
                        className={clsx(
                          "shrink-0 w-fit px-1 text-isWhite text-center flex flex-col items-center place-content-center rounded-md bg-isOrangeLight"
                        )}
                      >
                        closing soon
                      </div>
                    )} */}
                    </div>

                    <div
                      className={clsx(
                        "w-full text-isLabelLightPrimary font-400 text-left truncate text-ellipsis text-base",
                        ANIMATE
                      )}
                    >
                      {proposal.title.replace(/"/g, "")}
                    </div>
                  </div>

                  <div className="shrink-0 ml-5 w-5 self-center">
                    <ChevronForward
                      classes={clsx("w-5 h-5 fill-isLabelLightSecondary")}
                    />
                  </div>
                </button>
              );
            })}

            {filteredProposals.length === 0 && (
              <React.Fragment>
                <div className="flex flex-col items-center mt-8 place-content-center">
                  <ExclamationmarkSquareFill
                    classes={clsx("h-16 w-16 fill-isGrayLight2")}
                  />
                  <div className="w-full text-lg text-center font-600 text-isLabelLightPrimary">
                    Didn't find any proposals.
                  </div>
                  <div className="text-sm text-isLabelLightSecondary font-500">
                    Check back later.
                  </div>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
