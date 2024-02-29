import clsx from "clsx";

export const Spinner = ({ classes }) => {
	return (
		<div
			className={clsx(
				"inline-block border-[3.5px] rounded-full animate-spin  border-t-transparent drop-shadow-sm",
				classes
			)}
			role="status"
			aria-label="loading"
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
};
