import React from "react";
import { Settings } from "./Settings";

export default function Page() {
	return (
		<React.Fragment>
			<div className="flex flex-col items-center w-full py-2 min-h-[100dvh] place-content-start bg-isSystemLightSecondary">
				<Settings />
			</div>
		</React.Fragment>
	);
}
