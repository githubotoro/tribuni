import { MAX_WIDTH } from "@/components/constants";
import clsx from "clsx";

export default function Page() {
	return (
		<div className={clsx("flex flex-col w-full pt-0 p-2 grow", MAX_WIDTH)}>
			{/* <div className="w-full rounded-2xl bg-isSystemLightSecondary"></div> */}
			<div className="flex flex-row items-center w-full mt-2 mb-4 place-content-center">
				<div className="rounded-full w-7 h-7 bg-isSystemLightSecondary"></div>

				<div className="ml-2 text-2xl text-center font-600">
					Welcome to Tribuni
				</div>
			</div>

			<div className="w-full p-2 overflow-y-scroll bg-isSystemLightSecondary grow rounded-2xl">
				<div>hi there!</div>
			</div>

			<div className="mt-2 text-lg text-center rounded-lg bg-isBlueLight text-isWhite font-600">
				Let's Get Started!
			</div>
		</div>
	);
}
