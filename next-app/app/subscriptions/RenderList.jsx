"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { ANIMATE, MAX_WIDTH } from "@/components/constants";
import { NewspaperFill, XmarkBinFill } from "@/components/ios";
import { useStore } from "@/store";
import { Spinner } from "@/components/loaders";

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

export const RenderList = ({ protocols, total, lastUpdated }) => {
	const { user, protocolFilter, setProtocolFilter } = useStore();

	const [search, setSearch] = useState("");

	const filteredProtocols = protocols.filter((protocol) => {
		const isMatch = protocol.name
			.toLowerCase()
			.startsWith(search.toLowerCase());
		const isSubscribed = user.subscriptions.includes(protocol.id);

		return isMatch && isSubscribed;
	});

	const [pageLoading, setPageLoading] = useState(false);

	if (pageLoading === true) {
		return <Spinner classes={clsx("w-5 h-5 border-isBlueLight")} />;
	} else {
		return (
			<React.Fragment>
				<div
					className={clsx(
						"flex flex-row items-center space-x-1 w-full px-2 pb-2",
						ANIMATE,
						MAX_WIDTH
					)}
				>
					<NewspaperFill
						classes={clsx("w-9 h-9 fill-isLabelLightPrimary")}
					/>
					<div className="text-2xl text-isLabelLightPrimary font-600">
						Subscriptions
					</div>
				</div>

				<hr className="w-full mt-1 mb-1 rounded-full bg-isSeparatorLight" />

				<div
					className={clsx(
						"w-full overflow-y-scroll grow !mb-0 flex flex-col",
						ANIMATE,
						MAX_WIDTH
					)}
				>
					{filteredProtocols.map((protocol, idx) => {
						const char =
							idx === 0 ||
							protocols[idx - 1].name[0].toLowerCase() !==
								protocols[idx].name[0].toLowerCase()
								? protocols[idx].name[0]
								: null;

						const key = protocol.id;
						const name = protocol.name;

						return (
							<div key={key} className="contents">
								{char !== null ? (
									<React.Fragment>
										<div
											className={clsx(
												"px-3 pt-4 pb-1 text-sm uppercase text-isLabelLightSecondary font-600",
												search !== "" ? "hidden" : ""
											)}
										>
											{search?.length > 0
												? search[0]
												: char}
										</div>
										<div
											className={clsx(
												"w-full px-3",
												search !== "" ? "hidden" : ""
											)}
										>
											<hr className="w-full rounded-full bg-isSeparatorLight" />
										</div>
									</React.Fragment>
								) : (
									<></>
								)}

								<div className="flex flex-row items-center justify-between w-full group">
									<Link
										onClick={() => {
											setPageLoading(true);
										}}
										href={`/proposals?protocol=${key}&username=${user.id}&chatid=${user.chatid}`}
										className="flex flex-col items-center justify-between w-full group-hover:bg-isSeparatorLight"
									>
										<div
											className={clsx(
												"grow pt-2 leading-none px-3 w-full text-base"
											)}
										>
											{capitalizeFirstLetter(name).trim()}
										</div>

										<div className="flex flex-row items-center w-full px-3 pt-1 pb-2">
											{protocol.new !== "0" && (
												<div
													className={clsx(
														"px-1 mr-1 text-xs py-[0.05rem] rounded-md text-isWhite font-500 tabular-nums bg-isBlueLight"
													)}
												>
													{protocol.new} new
												</div>
											)}

											<div
												className={clsx(
													"px-1 mr-1 text-xs py-[0.05rem] rounded-md text-isWhite font-500 tabular-nums",
													protocol.active === "0"
														? "bg-isRedLight"
														: "bg-isOrangeLight"
												)}
											>
												{protocol.active} active
											</div>
										</div>
									</Link>

									<div className="h-full p-[0.65rem] group-hover:bg-isSeparatorLight">
										<button
											className={clsx(
												"flex flex-row items-center h-full px-2 space-x-1 text-sm rounded-lg place-content-center bg-isRedLight text-isWhite font-500 hover:bg-isRedLightEmphasis",
												ANIMATE
											)}
										>
											<XmarkBinFill
												classes={clsx(
													"w-6 h-6 fill-isWhite"
												)}
											/>
											<div className="">Unsubscribe</div>
										</button>
									</div>

									{/* <div className="flex flex-col items-center h-full group-hover:bg-isSeparatorLight place-content-center">
										<button
											className={clsx(
												"px-1 mr-2 text-xs py-[0.1rem] rounded-md text-isWhite font-500 tabular-nums bg-isSystemDarkTertiary flex flex-row items-center space-x-1 hover:bg-isRedLight",
												ANIMATE
											)}
										>
											<div className="">Unsubscribe</div>

											<XmarkBinFill
												classes={clsx(
													"w-4 h-4 fill-isWhite"
												)}
											/>
										</button>
									</div> */}
								</div>

								<div className="w-full px-3">
									<hr className="w-full rounded-full bg-isSeparatorLight" />
								</div>
							</div>
						);
					})}

					{filteredProtocols.length === 0 && (
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
									No subscriptions found
								</div>
								<div className="text-sm text-center text-isLabelLightSecondary font-500">
									Try subscribing some protocols to start
									receiving proposal alerts.
								</div>
							</div>
						</React.Fragment>
					)}
				</div>

				<hr className="w-full mb-2 -mt-[1px] rounded-full bg-isSeparatorLight" />

				<div
					className={clsx(
						"place-content-center flex flex-row items-center space-x-1 text-xs font-500 w-full px-2",
						MAX_WIDTH
					)}
				>
					<div className="px-[0.3rem] py-[0.1rem] rounded-md bg-isPurpleLight text-isWhite">
						{protocols.length} Protocols
					</div>
					<div className="px-[0.3rem] py-[0.1rem] rounded-md bg-isIndigoLight text-isWhite">
						{total} Proposals
					</div>
				</div>

				{/* <div
					className={clsx(
						"flex flex-row justify-between mt-2 text-xs font-500 w-full px-2",
						MAX_WIDTH
					)}
				>
					<div className="flex flex-row space-x-1">
						<div className="px-[0.3rem] py-[0.1rem] rounded-md bg-isOrangeLight text-isWhite">
							{protocols.length} Protocols
						</div>
						<div className="px-[0.3rem] py-[0.1rem] rounded-md bg-isBlueLight text-isWhite">
							{total} Proposals
						</div>
					</div>
					<div className="px-[0.3rem] rounded-md bg-isSystemLightSecondary text-isLabelLightSecondary flex flex-row items-center space-x-1">
						<ClockArrow2Circlepath
							classes={clsx("w-5 h-5 fill-isLabelLightSecondary")}
						/>
						<div>{lastUpdated}</div>
					</div>
				</div> */}
			</React.Fragment>
		);
	}
};
