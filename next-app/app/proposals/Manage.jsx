"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Subscribe } from "./Subscribe";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { BASE_USER, MAX_WIDTH } from "@/components/constants";
import { useStore } from "@/store";
import { Spinner } from "@/components/loaders";
import { Hr } from "@/components/ui/page";

export const Manage = ({ proposals }) => {
  const { user, setUser, activeProposal } = useStore();

  const params = useSearchParams();
  const protocol = params.get("protocol");

  const [subscriptionStatus, setSubscriptionStatus] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const getSubscription = () => {
    if (user.id && user.chatid && protocol) {
      if (user.subscriptions.includes(protocol)) {
        setSubscriptionStatus(true);
      } else {
        setSubscriptionStatus(false);
      }

      if (isLoading === true) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getSubscription();
  }, [user, protocol]);

  if (activeProposal === null) {
    return (
      <React.Fragment>
        <div
          className={clsx(
            "flex flex-row items-center justify-between w-full px-4 py-2 rounded-xl bg-isWhite mt-4",
            MAX_WIDTH
          )}
        >
          <div className="text-base text-isLabelLightPrimary font-400">
            Subscribed
          </div>
          {isLoading === true ? (
            <Spinner classes={clsx("w-5 h-5 border-isBlueLight")} />
          ) : (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={async () => {
                  const existingSubscriptions = user.subscriptions;
                  let newUser = BASE_USER;
                  if (existingSubscriptions.includes(protocol)) {
                    // If protocol is already in subscriptions, remove it
                    newUser = {
                      ...user,
                      subscriptions: existingSubscriptions.filter(
                        (item) => item !== protocol
                      ),
                    };
                  } else {
                    // If protocol is not in subscriptions, add it
                    newUser = {
                      ...user,
                      subscriptions: [...existingSubscriptions, protocol],
                    };
                  }

                  setUser(newUser);

                  setSubscriptionStatus(!subscriptionStatus);

                  const res = await Subscribe({
                    username: user.id,
                    protocol: protocol,
                  });
                }}
                type="checkbox"
                checked={subscriptionStatus}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-isGreenLight"></div>
            </label>
          )}
        </div>
        <div className="w-full"></div>

        {/* <hr
          className={clsx(
            "w-full my-2 rounded-full bg-isSeparatorLight",
            MAX_WIDTH
          )}
        /> */}

        <Hr classes={clsx("my-3 !px-0")} />
      </React.Fragment>
    );
  }
};
