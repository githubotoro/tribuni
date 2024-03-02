"use client";

import { useStore } from "@/store";
import React from "react";
import { Spinner } from "@/components/loaders";
import clsx from "clsx";
import { ANIMATE } from "@/components/constants";

export const Render = ({ children }) => {
	const { expanded, setExpanded } = useStore();

	return (
		<React.Fragment>
			<div
				className={clsx(
					"contents",
					ANIMATE,
					expanded === true ? "hidden" : ""
				)}
			>
				{children}
			</div>
			{/* {expanded === true ? <React.Fragment></React.Fragment> : children} */}
		</React.Fragment>
	);
};
