"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
	useEffect(() => {
		toast.success("Registered successfully");
	}, []);

	return (
		<React.Fragment>
			<div className="w-full pt-16 pb-3 text-2xl text-center text-transparent font-700 bg-gradient-to-b from-isSystemDarkTertiary to-isSystemDarkPrimary bg-clip-text">
				Registration Successful
			</div>
			<div className="text-sm text-center text-isLabelLightSecondary font-500">
				You can start exploring our governance network on your Telegram.
			</div>
		</React.Fragment>
	);
}
