"use client";

import React from "react";
import { useStore } from "@/store";
import { useEffect } from "react";
import { Spinner } from "./Spinner";
import clsx from "clsx";

export const PageLoader = ({ children }) => {
  const { pageLoading, setPageLoading } = useStore();

  useEffect(() => {
    setPageLoading(false);
  }, [pageLoading]);

  if (pageLoading === false) {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return (
      <div className="flex flex-col items-center w-full p-4 place-content-center">
        <Spinner classes={clsx("w-5 h-5 border-isBlueLight")} />
      </div>
    );
  }
};
