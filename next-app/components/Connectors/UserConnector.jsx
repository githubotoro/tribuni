"use client";

import { useStore } from "@/store";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { ANIMATE, MAX_WIDTH } from "../constants";
import { clsx } from "clsx";
import { NavBookmarks, NavHome, NavSettings, NavSocial } from "../ios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const UserConnector = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, refreshUser, setPageLoading } = useStore();

  const getUser = async () => {
    const id = params.get("username");
    const chatid = params.get("chatid");

    if (id && chatid && id !== user.id && chatid !== user.chatid) {
      try {
        const res = await fetch("/api/v4/data/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            chatid: chatid,
          }),
        });

        const data = await res.json();

        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [params, refreshUser]);

  return (
    <React.Fragment>
      {user.id !== null && (
        <div
          className={clsx(
            "h-20 pb-4 w-full bg-[#F9F9F9] fixed bottom-0 grid grid-cols-4 items-center place-content-center",
            MAX_WIDTH
          )}
        >
          {[
            {
              key: "home",
              icon: NavHome,
              path: "/protocols",
            },
            {
              key: "bookmarks",
              icon: NavBookmarks,
              path: "/bookmarks",
            },
            {
              key: "social",
              icon: NavSocial,
              path: "/directory",
            },
            {
              key: "settings",
              icon: NavSettings,
              path: "/settings",
            },
          ].map((ele, idx) => {
            return (
              <div
                key={ele.key}
                className="col-span-1 items-center flex flex-col place-content-center w-full h-full"
              >
                <button
                  onClick={() => {
                    setPageLoading(true);
                    router.push(
                      `${ele.path}?username=${user.id}&chatid=${user.chatid}`
                    );
                  }}
                  href={`${ele.path}?username=${user.id}&chatid=${user.chatid}`}
                  className="w-fit h-fit flex flex-col items-center"
                >
                  <ele.icon
                    classes={clsx(
                      "h-5 w-6",
                      pathname === ele.path
                        ? "fill-isBlueLight"
                        : "fill-isLabelLightSecondary"
                    )}
                  />

                  <div
                    className={clsx(
                      "text-xs capitalize font-500",
                      pathname === ele.path
                        ? "text-isBlueLight"
                        : "text-isLabelLightSecondary"
                    )}
                  >
                    {ele.key}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};
