import clsx from "clsx";

export const Tag = ({ text, bg }) => {
  return (
    <div
      className={clsx(
        "px-[0.4rem] mr-2 text-sm py-[0.125rem] rounded-md text-isWhite font-400 tabular-nums",
        bg
      )}
    >
      {text}
    </div>
  );
};
