import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { ANIMATE } from "@/components/constants";
import { useStore } from "@/store";
import { BookmarkFill, CheckmarkBubbleFill } from "@/components/ios";

import { Bookmark } from "./Bookmark";
import { BASE_USER } from "@/components/constants";
import { Hr } from "@/components/ui/page";

export const ExpandProposal = ({ proposalMap, protocol }) => {
  const { activeProposal, user, setUser } = useStore();

  const startDiff =
    Math.floor(Date.now() / 1000) - proposalMap[activeProposal].starttime;
  const diff =
    proposalMap[activeProposal].endtime - Math.floor(Date.now() / 1000);

  const utcTimestamps = {
    starttime: proposalMap[activeProposal].starttime * 1000,
    endtime: proposalMap[activeProposal].endtime * 1000,
  };

  const localDates = {
    startDate: new Date(utcTimestamps.starttime),
    endDate: new Date(utcTimestamps.endtime),
  };

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localTimes = {
    start: localDates.startDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: userTimeZone,
    }),
    end: localDates.endDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: userTimeZone,
    }),
  };

  let totalVotes = 0;
  let percents = 0;

  const isBookmarked = user.bookmarks.includes(activeProposal);

  if (
    proposalMap[activeProposal].results &&
    proposalMap[activeProposal].results.length !== 0
  ) {
    totalVotes = proposalMap[activeProposal].results.reduce(
      (acc, result) => acc + parseFloat(result.total),
      0
    );

    percents = proposalMap[activeProposal].results.map((result, idx) => {
      return (parseFloat(result.total) / totalVotes) * 100;
    });
  }

  const colors = [
    "rgb(0, 199, 190)",
    "rgb(50, 173, 230)",
    "rgb(0, 122, 255)",
    "rgb(88, 86, 214)",
    "rgb(175, 82, 222)",
    "rgb(255, 45, 85)",
    "rgb(162, 132, 94)",
  ];

  function formatTimestamp(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date(timestamp);

    const differenceInMilliseconds = targetDate - currentDate;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = Math.floor(differenceInHours / 24);
    const differenceInMonths = Math.floor(differenceInDays / 30);
    const differenceInYears = Math.floor(differenceInDays / 365);

    if (differenceInYears > 0) {
      return {
        value: differenceInYears,
        unit: "years",
        tense: differenceInMilliseconds >= 0 ? "left" : "ago",
      };
    } else if (differenceInMonths > 0) {
      return {
        value: differenceInMonths,
        unit: "months",
        tense: differenceInMilliseconds >= 0 ? "left" : "ago",
      };
    } else if (differenceInDays > 0) {
      return {
        value: differenceInDays,
        unit: "days",
        tense: differenceInMilliseconds >= 0 ? "left" : "ago",
      };
    } else {
      return {
        value: "0",
        unit: "days",
        tense: "left",
      };
    }
  }

  const { value, unit, tense } = formatTimestamp(
    proposalMap[activeProposal].endtime * 1000
  );

  return (
    <React.Fragment>
      <div id="" className="w-full px-3 pt-1 pb-2 rounded-xl">
        <div className="z-10 flex flex-row items-center justify-between w-full space-x-1 text-sm font-500 place-content-end">
          <button
            className={clsx(
              "flex flex-row items-center font-500 px-3 py-1 leading-tight rounded-lg bg-isBlueLight text-isLabelDarkPrimary !-ml-1",
              ANIMATE
            )}
          >
            {protocol}
          </button>
          <div></div>

          <button
            onClick={async () => {
              const existingBookmarks = user.bookmarks;
              let newUser = BASE_USER;
              if (existingBookmarks.includes(activeProposal)) {
                // If proposal is already in bookmarks, remove it
                newUser = {
                  ...user,
                  bookmarks: existingBookmarks.filter(
                    (item) => item !== activeProposal
                  ),
                };
              } else {
                // If proposal is not in bookmarks, add it
                newUser = {
                  ...user,
                  bookmarks: [...existingBookmarks, activeProposal],
                };
              }

              setUser(newUser);

              await Bookmark({
                username: user.id,
                proposal: activeProposal,
              });
            }}
            className={clsx(
              "flex flex-row items-center px-3  py-1 leading-tight rounded-lg text-isLabelDarkPrimary !-mr-1",
              ANIMATE,
              isBookmarked ? "bg-isGreenLight" : "bg-isOrangeLight"
            )}
          >
            <div className="font-500">
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </div>
            {isBookmarked ? (
              <CheckmarkBubbleFill
                classes={clsx(
                  "h-5 w-5 ml-[0.2rem] -mr-1 fill-isLabelDarkPrimary"
                )}
              />
            ) : (
              <BookmarkFill
                classes={clsx("h-5 w-5 -mr-1 fill-isLabelDarkPrimary")}
              />
            )}
          </button>
        </div>

        <div className="py-2 mt-2 text-xl tracking-tight leading-tight text-left text-isLabelLightPrimary font-600">
          {proposalMap[activeProposal].title.replace(/"/g, "")}
        </div>

        {/* <div className="flex flex-row items-center w-full pb-2 mt-1 space-x-1 text-xs font-500">
          <div
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
          )}
        </div> */}

        <hr className="mb-5 rounded-full bg-isSeparatorLight mt-2" />

        {/* <div className="flex flex-row items-center space-x-1 text-base font-500 place-content-end">
					<div className="flex flex-row items-center px-2 py-[0.1rem] leading-tight rounded-lg bg-isBlueLight text-isLabelDarkPrimary">
						<div className="">Bookmark for later</div>
						<BookmarkFill
							classes={clsx("h-6 w-6 fill-isLabelDarkPrimary")}
						/>
					</div>
				</div> */}

        {/* <div className="w-full px-2 py-1 mt-2 -space-y-1 text-sm leading-tight rounded-xl bg-isSystemLightSecondary font-400 text-isLabelLightSecondary">
          <div className="flex flex-row items-center w-full space-x-1">
            <QuoteBubbleFill
              classes={clsx("w-5 h-6 fill-isBlueLight shrink-0")}
            />
            <div className="w-full truncate grow text-ellipsis">
              Proposed by&nbsp;
              {proposalMap[activeProposal].proposer}
            </div>
          </div>

          <div className="flex flex-row items-center space-x-1">
            <ClockFill classes={clsx("w-5 h-6 fill-isOrangeLight")} />
            <div className="">
              Proposed&nbsp;
              {timeFromNow(proposalMap[activeProposal].starttime)}
            </div>
            &nbsp;at {localTimes.start}
          </div>

          <div className="flex flex-row items-center space-x-1">
            <HourglassTophalfFill classes={clsx("w-5 h-6 fill-isRedLight")} />
            <div>
              {timeFromNow(proposalMap[activeProposal].endtime).includes("ago")
                ? "Ended"
                : "Ends"}
              &nbsp;
              {timeFromNow(proposalMap[activeProposal].endtime)}
              &nbsp;at {localTimes.end}
            </div>
          </div>
        </div> */}

        <div className="w-full flex flex-row items-center space-x-4 h-12">
          <div className="w-5/12 flex justify-evenly flex-row items-center place-content-center bg-isWhite text-isLabelLightPrimary rounded-xl h-full">
            <div className="w-fit flex flex-col items-end place-content-center text-3xl shrink-0 font-700 text-isSystemDarkTertiary">
              {value}
            </div>
            <div className="flex flex-col items-start w-fit text-isLabelLightSecondary leading-tight font-500">
              <div>{unit}</div>
              <div>{tense}</div>
            </div>
          </div>

          {proposalMap[activeProposal].url &&
            proposalMap[activeProposal].url !== null &&
            proposalMap[activeProposal].url !== "undefined" && (
              <a
                href={proposalMap[activeProposal].url}
                rel="noopener noreferrer"
                target="_blank"
                className="w-7/12 flex flex-col items-center place-content-center bg-isBlueLight text-lg font-600 text-isWhite rounded-xl h-full"
              >
                Vote Now
              </a>
            )}
        </div>

        {/* {proposalMap[activeProposal].url &&
          proposalMap[activeProposal].url !== null &&
          proposalMap[activeProposal].url !== "undefined" && (
            <div className="w-full px-3 !mt-3 pb-3">
              <a
                href={proposalMap[activeProposal].url}
                rel="noopener noreferrer"
                target="_blank"
                className={clsx(
                  "flex flex-row items-center place-content-center space-x-1 w-full px-2 py-1 text-center rounded-lg bg-isBlueLight text-isWhite font-500 hover:bg-isBlueLightEmphasis text-base",
                  ANIMATE
                )}
              >
                <HandTapFill classes={clsx("w-6 h-6 fill-isWhite")} />

                <div>Vote Now!</div>
              </a>
            </div>
          )} */}

        {proposalMap[activeProposal].results &&
          proposalMap[activeProposal].results.length !== 0 && (
            <div className="w-full h-fit mt-5">
              <div className="flex flex-col items-center w-full bg-isWhite p-4 rounded-xl">
                <div className="w-full">
                  <div className="flex flex-col items-center w-full text-xs capitalize rounded-lg bg-isWhite text-isLabelLightSecondary font-400">
                    {proposalMap[activeProposal].choices.map((choice, idx) => {
                      const totalVotes = parseFloat(
                        proposalMap[activeProposal].results[idx].total
                      );
                      const percent = percents[idx].toFixed(2);
                      // Format total votes
                      const formattedVotes = new Intl.NumberFormat("en", {
                        notation: "compact",
                        compactDisplay: "short",
                        maximumFractionDigits: 1,
                      }).format(totalVotes);

                      const colorIndex = idx % colors.length;
                      return (
                        <React.Fragment key={idx}>
                          {idx !== 0 && <div className="mb-3" />}

                          <div className="w-full space-x-2">
                            <div className="relative h-3 bg-isSystemLightSecondary rounded-2xl overflow-hidden">
                              <div
                                className="absolute top-0 h-3 rounded-2xl"
                                style={{
                                  width: `${percent}%`,
                                  backgroundColor: colors[colorIndex],
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-between w-full mt-1">
                            <div className="flex flex-row items-center">
                              <div className="truncate text-ellipsis max-w-[7rem]">
                                {choice}
                              </div>{" "}
                              <div>, {percent}%</div>
                            </div>
                            <div className="ml-auto">
                              {formattedVotes} votes
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        <Hr classes={clsx("!mt-5")} />

        <div className="uppercase text-isLabelLightSecondary !mt-2 text-base font-500">
          Proposal Summary
        </div>

        <div className="!mt-2 rounded-xl p-4 text-sm text-isLabelLightPrimary bg-isWhite leading-tight relative font-400 break-words remove-all">
          {/* <Markdown remarkPlugins={[remarkGfm]}> */}
          {/* {proposalMap[activeProposal].summary.slice(0, 600)}
          {proposalMap[activeProposal].summary.length >= 501 && "..."} */}
          {proposalMap[activeProposal].summary}
          {/* </Markdown> */}
        </div>

        {/* <hr className="my-2 bg-isSeparatorLight" />
							-- <b>Stats</b> (Coming Soon) */}
        {/* <article className="prose break-all lg:prose-xl">
								-- {proposalMap[activeProposal].content}
							</article> */}
      </div>
    </React.Fragment>
  );
};
