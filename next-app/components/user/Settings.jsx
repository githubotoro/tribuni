"use client";

import { MAX_WIDTH } from "@/components/constants";
import { useStore } from "@/store";
import clsx from "clsx";
import React, { useState } from "react";
import { ANIMATE } from "@/components/constants";
import {
  AlarmFill,
  BellBadgeFill,
  CheckmarkShieldFill,
  EnvelopeFill,
  PaperplaneFill,
  PauseFill,
  PencilTip,
  TrayFill,
} from "@/components/ios";
import { ChangeAlerts, ChangeDuration } from "./Setter";
import validator from "validator";
import { ChangeEmail } from "./ChangeEmail";
import toast from "react-hot-toast";

export const Settings = () => {
  const { user, setUser, refreshUser, setRefreshUser } = useStore();

  const [email, setEmail] = useState("");

  const freqs = [
    {
      key: "24h",
      name: "24 hrs",
      duration: 24 * 60 * 60,
    },
    {
      key: "72h",
      name: "72 hrs",
      duration: 72 * 60 * 60,
    },
    {
      key: "7d",
      name: "7 days",
      duration: 7 * 24 * 60 * 60,
    },
  ];

  const submitEmail = async () => {
    if (validator.isEmail(email)) {
      const res = await ChangeEmail({
        username: user.id,
        newEmail: email,
      });

      toast.success("Email updated");

      setRefreshUser(!refreshUser);

      let newUser = {
        ...user,
        email: email,
      };

      setUser(newUser);
    } else {
      toast.error("Invalid Email");
    }
  };

  return (
    <React.Fragment>
      <div className={clsx("w-full flex flex-col px-4 pb-24")}>
        {/* <div
					className={clsx(
						"flex flex-row items-center space-x-1 w-full",
						ANIMATE,
						MAX_WIDTH
					)}
				>
					<GearshapeFill
						classes={clsx("w-9 h-9 fill-isLabelLightPrimary")}
					/>
					<div className="text-2xl text-isLabelLightPrimary font-600">
						Settings
					</div>
				</div> */}

        <div className="w-full mt-5 space-y-5">
          {/* <div
						className={clsx(
							"w-full bg-isWhite px-3 py-2 rounded-xl flex flex-row items-center justify-between",
							MAX_WIDTH
						)}
					>
						<div className="flex flex-row items-center space-x-2">
							<div className="flex flex-col items-center w-6 h-6 rounded-md bg-isBlueLight shrink-0">
								<PersonFill
									classes={clsx("w-6 h-6 fill-isWhite")}
								/>
							</div>

							<div className="font-400 text-isLabelLightPrimary">
								@{user.id}
							</div>
						</div>

						<CheckCircle
							classes={clsx("h-6 w-6 fill-isGreenLight")}
						/>
					</div> */}

          <div
            className={clsx(
              "w-full bg-isWhite py-2 rounded-xl flex flex-col overflow-hidden",
              MAX_WIDTH
            )}
          >
            <div className="flex flex-row items-center px-3 space-x-2">
              <div className="flex flex-col items-center w-6 h-6 rounded-md bg-isOrangeLight shrink-0">
                <BellBadgeFill classes={clsx("w-6 h-6 fill-isWhite")} />
              </div>

              <div className="font-400 text-isLabelLightPrimary">
                Proposal Alerts
              </div>
            </div>

            <hr className="w-full my-2 rounded-full bg-isSeparatorLight" />

            <div className="flex flex-row items-center justify-between px-3">
              <div className="flex flex-row items-center space-x-2">
                <div className="flex flex-col items-center w-6 h-6 rounded-md bg-isRedLight shrink-0">
                  <TrayFill classes={clsx("w-6 h-6 fill-isWhite")} />
                </div>

                <div className="font-400 text-isLabelLightPrimary">Email</div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  onChange={async () => {
                    let newUser = {
                      ...user,
                      email_alerts: !user.email_alerts,
                    };

                    setUser(newUser);

                    await ChangeAlerts({
                      type: "email_alerts",
                      username: user.id,
                    });
                  }}
                  type="checkbox"
                  checked={user.email_alerts}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-isGreenLight"></div>
              </label>
            </div>

            <div className="flex flex-row items-center justify-between px-3 mt-2">
              <div className="flex flex-row items-center space-x-2">
                <div className="flex flex-col items-center w-6 h-6 rounded-md bg-isBlueLight shrink-0">
                  <PaperplaneFill classes={clsx("w-6 h-6 fill-isWhite")} />
                </div>

                <div className="font-400 text-isLabelLightPrimary">
                  Telegram
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  onChange={async () => {
                    let newUser = {
                      ...user,
                      telegram_alerts: !user.telegram_alerts,
                    };

                    setUser(newUser);

                    await ChangeAlerts({
                      type: "telegram_alerts",
                      username: user.id,
                    });
                  }}
                  type="checkbox"
                  checked={user.telegram_alerts}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-isGreenLight"></div>
              </label>
            </div>

            <div className="flex flex-row items-center justify-between px-3 mt-2">
              <div className="flex flex-row items-center space-x-2">
                <div className="flex flex-col items-center w-6 h-6 rounded-md bg-isPurpleLight shrink-0">
                  <PauseFill classes={clsx("w-6 h-6 fill-isWhite")} />
                </div>

                <div className="font-400 text-isLabelLightPrimary">
                  Pause All Alerts
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  onChange={async () => {
                    let newUser = {
                      ...user,
                      pause_alerts: !user.pause_alerts,
                    };

                    setUser(newUser);

                    await ChangeAlerts({
                      type: "pause_alerts",
                      username: user.id,
                    });
                  }}
                  type="checkbox"
                  checked={user.pause_alerts}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-isGreenLight"></div>
              </label>
            </div>

            <hr className="w-full mt-2 rounded-full bg-isSeparatorLight" />

            <div className="p-1 -mb-2 text-xs text-center font-400 text-isLabelLightPrimary bg-isWhite">
              {user.pause_alerts === true
                ? "All alerts are paused."
                : user.email_alerts === true && user.telegram_alerts === true
                ? user.email === null
                  ? "Email alerts are on, but email is missing."
                  : "Both email and telegram alerts are on."
                : user.email_alerts === true
                ? user.email === null
                  ? "Email alerts are on, but email is missing."
                  : "Email alerts are on."
                : user.telegram_alerts === true
                ? "Telegram Alerts are on."
                : "No alerts are turned on."}
            </div>
          </div>

          <div
            className={clsx(
              "w-full bg-isWhite py-2 rounded-xl flex flex-col overflow-hidden",
              MAX_WIDTH
            )}
          >
            <div className="flex flex-row items-center px-3 space-x-2">
              <div className="flex flex-col items-center w-6 h-6 rounded-md bg-isCyanLight shrink-0">
                <AlarmFill classes={clsx("w-6 h-6 fill-isWhite")} />
              </div>

              <div className="font-400 text-isLabelLightPrimary">
                Alert Frequency
              </div>
            </div>

            <hr className="w-full my-2 rounded-full bg-isSeparatorLight" />

            <div className="w-full px-3">
              <div
                className={clsx(
                  "w-full p-[0.15rem] rounded-lg bg-isGrayLight4 text-sm grid grid-cols-3 gap-1 text-isLabelLightPrimary font-400",
                  MAX_WIDTH
                )}
              >
                {freqs.map((freq) => (
                  <button
                    key={freq.key}
                    onClick={async () => {
                      let newUser = {
                        ...user,
                        duration: freq.duration,
                      };

                      setUser(newUser);

                      await ChangeDuration({
                        username: user.id,
                        duration: freq.duration,
                      });
                    }}
                    className={clsx(
                      "w-full text-center rounded-[0.35rem] py-[0.1rem]",
                      ANIMATE,
                      user.duration === freq.duration && "bg-isWhite"
                      // filter === tag ? "bg-isWhite" : ""
                    )}
                  >
                    {freq.name}
                  </button>
                ))}
              </div>
            </div>

            <hr className="w-full mt-2 rounded-full bg-isSeparatorLight" />

            <button
              onClick={async () => {
                try {
                  await fetch(
                    `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v4/alerts/telegram`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        test: true,
                        username: user.id,
                        chatid: user.chatid,
                      }),
                    }
                  );

                  toast.success("Telegram Alert Sent");

                  if (user.email !== null) {
                    await fetch(
                      `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v4/alerts/email`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          test: true,
                          username: user.id,
                          userEmail: user.email,
                        }),
                      }
                    );

                    toast.success("Email Alert Sent");
                  } else {
                    toast.error("Email address was not found");
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
              className={clsx(
                "p-2 -mb-2 text-sm cursor-pointer text-center font-500 text-isLabelLightPrimary bg-isCyanLight text-isWhite hover:bg-isCyanLightEmphasis",
                ANIMATE
              )}
            >
              Click here to send test alert now.
            </button>
          </div>

          <div
            className={clsx(
              "w-full bg-isWhite py-2 rounded-xl flex flex-col overflow-hidden",
              MAX_WIDTH
            )}
          >
            <div className="flex flex-row items-center px-3 space-x-2">
              <div className="flex flex-col items-center w-6 h-6 rounded-md bg-isRedLight shrink-0">
                <TrayFill classes={clsx("w-6 h-6 fill-isWhite")} />
              </div>

              <div className="font-400 text-isLabelLightPrimary">Add</div>
            </div>

            <hr className="w-full my-2 rounded-full bg-isSeparatorLight" />

            <div className="flex flex-row items-center justify-between px-3">
              <div className="flex flex-row items-center space-x-2">
                <div className="flex flex-col items-center w-6 h-6 rounded-md bg-isBlueLight shrink-0">
                  <EnvelopeFill classes={clsx("w-6 h-6 fill-isWhite")} />
                </div>

                <div className="font-400 text-isLabelLightPrimary">
                  {user.email === null ? "No Email Address Found" : user.email}
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full px-3 mt-2">
              <div className="flex flex-row items-center w-full px-1 py-1 space-x-1 rounded-md bg-isSystemLightSecondary">
                <PencilTip
                  classes={clsx("h-6 w-6 fill-isSystemDarkTertiary")}
                />
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  type="email"
                  placeholder="Type your email address here"
                  className="w-full text-base bg-transparent outline-none focus:outline-none text-isLabelLightPrimary"
                />
              </div>
            </div>

            <button
              onClick={() => {
                submitEmail();
              }}
              className="px-3 mt-2 "
            >
              <div
                className={clsx(
                  "py-[0.1rem] text-base rounded-md bg-isGreenLight text-isWhite font-500 hover:bg-isGreenLightEmphasis flex flex-row items-center place-content-center",
                  ANIMATE
                )}
              >
                <CheckmarkShieldFill classes={clsx("w-7 h-7 fill-isWhite")} />
                <div>Change Email</div>
              </div>
            </button>

            <hr className="w-full mt-2 rounded-full bg-isSeparatorLight" />

            <div className="p-1 -mb-2 text-xs text-center font-400 text-isLabelLightPrimary bg-isWhite">
              {user.email === null
                ? "Please add email to receive email alerts."
                : "Email is added and verified."}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
