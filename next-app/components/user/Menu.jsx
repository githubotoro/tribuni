"use client";

import { MAX_WIDTH } from "@/components/constants";
import { useStore } from "@/store";
import clsx from "clsx";
import React from "react";
import { ANIMATE } from "@/components/constants";
import {
	BellBadgeFill,
	GlobeAsiaAustraliaFill,
	MagazineFill,
	NewspaperFill,
	TagFill,
} from "@/components/ios";
import { ChevronRightCircleFill } from "../ios";
import { useRouter } from "next/navigation";

export const Menu = () => {
	const { user, setExpanded, pageLoading, setPageLoading } = useStore();
	const router = useRouter();

	const NAV_CONTAINER = clsx(
		"flex flex-row items-center justify-between px-3 py-1 space-x-2 hover:bg-isSystemLightTertiary",
		ANIMATE
	);
	const NAV_DIVIDER = clsx("flex flex-row items-center space-x-2");
	const NAV_ICON_CONTAINER = clsx(
		"flex flex-col items-center w-6 h-6 rounded-md shrink-0"
	);
	const NAV_ICON = clsx("w-6 h-6 fill-isWhite");
	const NAV_TEXT = clsx("font-400 text-isLabelLightPrimary");
	const NAV_GO = clsx("w-7 h-7 fill-isLabelLightTertiary !-mr-2");

	const NavItem = ({ Bg, Text, Icon, Link }) => {
		return (
			<button
				onClick={() => {
					setExpanded(false);
					setPageLoading(true);
					router.push(Link);
				}}
				href={Link}
				className={NAV_CONTAINER}
			>
				<div className={NAV_DIVIDER}>
					<div className={clsx(NAV_ICON_CONTAINER, Bg)}>
						<Icon classes={NAV_ICON} />
					</div>

					<div className={NAV_TEXT}>{Text}</div>
				</div>

				<ChevronRightCircleFill classes={NAV_GO} />
			</button>
		);
	};

	const Hr = () => {
		return <hr className="w-full rounded-full bg-isSeparatorLight" />;
	};

	return (
		<div className={clsx("w-full mt-5 space-y-5")}>
			<div className="w-full mt-5 space-y-5">
				<div
					className={clsx(
						"w-full bg-isWhite rounded-xl flex flex-col overflow-hidden",
						MAX_WIDTH
					)}
				>
					<NavItem
						Bg="bg-isRedLight"
						Text="Alert Settings"
						Icon={BellBadgeFill}
						Link={`/settings?username=${user.id}&chatid=${user.chatid}`}
					/>

					<Hr />

					<NavItem
						Bg="bg-isOrangeLight"
						Text="Subscription Manager"
						Icon={NewspaperFill}
						Link={`/subscriptions?username=${user.id}&chatid=${user.chatid}`}
					/>

					<Hr />

					<NavItem
						Bg="bg-isGreenLight"
						Text="Protocol Explorer"
						Icon={GlobeAsiaAustraliaFill}
						Link={`/protocols?username=${user.id}&chatid=${user.chatid}`}
					/>

					<Hr />

					<NavItem
						Bg="bg-isCyanLight"
						Text="Bookmarked Proposals"
						Icon={TagFill}
						Link={`/bookmarks?username=${user.id}&chatid=${user.chatid}`}
					/>

					<Hr />

					<NavItem
						Bg="bg-isPurpleLight"
						Text="Social Directory"
						Icon={MagazineFill}
						Link={`/directory?username=${user.id}&chatid=${user.chatid}`}
					/>
				</div>
			</div>
		</div>
	);
};
