import { MAX_WIDTH } from "@/components/constants";
import React from "react";
import { RegistrationForm } from "./RegistrationForm";
import clsx from "clsx";
import Banner from "@/public/assets/banner.png";
import Logov1 from "@/public/assets/logov1.png";
import Image from "next/image";

export default function Page() {
  return (
    <div
      className={clsx(
        "flex flex-col w-full items-center pt-0 p-2 grow overflow-y-scroll",
        MAX_WIDTH
      )}
    >
      <div className="flex flex-col items-center w-full place-content-center">
        <div className="relative w-full h-32 overflow-hidden bg-isSystemLightTertiary rounded-2xl">
          <Image
            src={Banner}
            alt="banner"
            className="object-cover w-full h-32"
          />
        </div>

        {/* <div className="relative w-full">
					<div className="absolute top-0 left-0 flex flex-row mt-1 space-x-1 text-xs text-isWhite font-500">
						<div className="px-1 rounded-md bg-isRedLight">
							100 protocols
						</div>
					</div>

					<div className="absolute top-0 right-0 flex flex-row mt-1 space-x-1 text-xs text-isWhite font-500">
						<div className="px-1 rounded-md bg-isOrangeLight">
							200 proposals
						</div>
					</div>
				</div> */}

        <div className="relative -mt-12 border-4 rounded-full w-fit h-fit border-isWhite">
          <div className="w-20 h-20 overflow-hidden rounded-full bg-isSystemLightSecondary ">
            <Image src={Logov1} alt="logo" className="object-cover w-20 h-20" />
          </div>
        </div>
      </div>

      <h1 className="w-full mt-3 text-2xl text-center text-isLabelLightPrimary font-700">
        Tribuni
      </h1>
      <h2 className="w-full text-base text-center text-isLabelLightPrimary font-400">
        Elevate Governance with Clarity
      </h2>

      <RegistrationForm />

      {/* <div className="w-full mt-8 bg-isSystemLightSecondary h-36">
					With Tribuni
				</div> */}
    </div>
  );
}
