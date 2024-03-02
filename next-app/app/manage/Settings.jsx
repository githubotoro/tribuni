"use client";

import { MAX_WIDTH } from "@/components/constants";
import { useStore } from "@/store";
import clsx from "clsx";
import React, { useState } from "react";
import { ANIMATE } from "@/components/constants";
import {
	AlarmFill,
	BellBadgeFill,
	GearshapeFill,
	PaperplaneFill,
	PersonFill,
	SquareTextSquareFill,
	TrayFill,
} from "@/components/ios";
import { CheckCircle } from "@/components/material-rounded/CheckCircle";

export const Settings = () => {
	const { user } = useStore();

	const freqs = [
		{
			key: "24h",
			name: "24 hrs",
		},
		{
			key: "48h",
			name: "48 hrs",
		},
		{
			key: "7d",
			name: "7 days",
		},
	];

	const [alertFreq, setAlertFreq] = useState(freqs[0]);

	return (
		<React.Fragment>
			<div className={clsx("w-full flex flex-col px-2", MAX_WIDTH)}>
				<div
					className={clsx(
						"flex flex-row items-center space-x-1 w-full",
						ANIMATE,
						MAX_WIDTH
					)}
				>
					<GearshapeFill
						classes={clsx("w-9 h-9 fill-isLabelLightPrimary")}
					/>
					<div className="text-2xl text-isLabelLightPrimary font-600">
						Settings
					</div>
				</div>

				<div className="w-full mt-5 space-y-5">
					<div
						className={clsx(
							"w-full bg-isWhite px-3 py-2 rounded-xl flex flex-row items-center justify-between",
							MAX_WIDTH
						)}
					>
						<div className="flex flex-row items-center space-x-2">
							<div className="flex flex-col items-center w-6 h-6 rounded-md bg-isBlueLight shrink-0">
								<PersonFill
									classes={clsx("w-6 h-6 fill-isWhite")}
								/>
							</div>

							<div className="font-400 text-isLabelLightPrimary">
								@{user.id}
							</div>
						</div>

						<CheckCircle
							classes={clsx("h-6 w-6 fill-isGreenLight")}
						/>
					</div>

					<div
						className={clsx(
							"w-full bg-isWhite py-2 rounded-xl flex flex-col ",
							MAX_WIDTH
						)}
					>
						<div className="flex flex-row items-center px-3 space-x-2">
							<div className="flex flex-col items-center w-6 h-6 rounded-md bg-isOrangeLight shrink-0">
								<BellBadgeFill
									classes={clsx("w-6 h-6 fill-isWhite")}
								/>
							</div>

							<div className="font-400 text-isLabelLightPrimary">
								Proposal Alerts
							</div>
						</div>

						<hr className="w-full my-2 rounded-full bg-isSeparatorLight" />

						<div className="flex flex-row items-center justify-between px-3">
							<div className="flex flex-row items-center space-x-2">
								<div className="flex flex-col items-center w-6 h-6 rounded-md bg-isRedLight shrink-0">
									<TrayFill
										classes={clsx("w-6 h-6 fill-isWhite")}
									/>
								</div>

								<div className="font-400 text-isLabelLightPrimary">
									Email
								</div>
							</div>

							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									// checked={}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-isGreenLight"></div>
							</label>
						</div>

						<div className="flex flex-row items-center justify-between px-3 mt-2">
							<div className="flex flex-row items-center space-x-2">
								<div className="flex flex-col items-center w-6 h-6 rounded-md bg-isBlueLight shrink-0">
									<PaperplaneFill
										classes={clsx("w-6 h-6 fill-isWhite")}
									/>
								</div>

								<div className="font-400 text-isLabelLightPrimary">
									Telegram
								</div>
							</div>

							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									// checked={}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-isGreenLight"></div>
							</label>
						</div>
					</div>

					<div
						className={clsx(
							"w-full bg-isWhite py-2 rounded-xl flex flex-col ",
							MAX_WIDTH
						)}
					>
						<div className="flex flex-row items-center px-3 space-x-2">
							<div className="flex flex-col items-center w-6 h-6 rounded-md bg-isCyanLight shrink-0">
								<AlarmFill
									classes={clsx("w-6 h-6 fill-isWhite")}
								/>
							</div>

							<div className="font-400 text-isLabelLightPrimary">
								Alert Frequency
							</div>
						</div>

						<hr className="w-full my-2 rounded-full bg-isSeparatorLight" />

						<div className="w-full px-3">
							<div
								className={clsx(
									"w-full p-[0.15rem] rounded-lg bg-isGrayLight4 text-sm grid grid-cols-3 gap-1 text-isLabelLightPrimary font-400",
									MAX_WIDTH
								)}
							>
								{freqs.map((freq) => (
									<button
										key={freq.key}
										onClick={() => {
											setAlertFreq(freq);
										}}
										className={clsx(
											"w-full text-center rounded-[0.35rem] py-[0.1rem]",
											ANIMATE,
											alertFreq.key === freq.key &&
												"bg-isWhite"
											// filter === tag ? "bg-isWhite" : ""
										)}
									>
										{freq.name}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* <div
						className={clsx(
							"w-full bg-isWhite px-3 py-1 rounded-xl flex flex-col ",
							MAX_WIDTH
						)}
					>
						<div>email alerts</div>

						<hr className="w-full my-1 rounded-full bg-isSeparatorLight" />

						<div>email id</div>
						<div>input-- change email</div>
						<div>verify email</div>
					</div> */}
				</div>
			</div>
		</React.Fragment>
	);
};
