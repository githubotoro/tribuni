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
    </div>
  );
}
