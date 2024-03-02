import clsx from "clsx";
import { MagnifyingGlass } from "@/components/ios";
import { Cancel } from "@/components/material-rounded";

export const Search = () => {
  return (
    <div
      className={clsx(
        "flex flex-row items-center w-full px-4 shrink-0 pt-6",
        ANIMATE,
        MAX_WIDTH
      )}
    >
      <div className="flex flex-row items-center w-full py-1 px-2 space-x-1 rounded-xl place-content-center bg-isFillLightTertiary">
        <MagnifyingGlass
          classes={clsx("w-7 h-7 fill-isLabelLightSecondary shrink-0")}
        />

        <input
          id="search"
          placeholder="Search"
          onFocus={() => setIsInputFocused(true)}
          onBlur={async () => {
            await delay(10);
            setIsInputFocused(false);
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          type="text"
          className={clsx(
            "grow bg-transparent outline-none text-lg focus:outline-none font-400 placeholder:text-isLabelLightSecondary text-isLabelLightPrimary leading-none",
            ANIMATE
          )}
        />

        {search !== "" && (
          <button
            onClick={async () => {
              setSearch("");
              const div = document.getElementById("search");

              await delay(20);

              if (div) {
                div.focus();
              }
            }}
          >
            <Cancel
              classes={clsx(
                "w-[1.2rem] h-[1.2rem] fill-isLabelLightSecondary shrink-0"
              )}
            />
          </button>
        )}
      </div>

      {/* <div
					onClick={() => {
						setSearch("");
					}}
					className={clsx(
						"z-10 px-2 text-center cursor-pointer text-isBlueLight font-400 outline-none focus:outline-none focus:ring-0 ring-0",
						ANIMATE,
						isInputFocused ? "" : "hidden"
					)}
				>
					Cancel
				</div> */}
    </div>
  );
};
