export default function Page() {
	return (
		<div className="flex flex-col items-center w-full h-[100dvh] place-content-center">
			<div
				className="inline-block w-8 h-8 border-4 rounded-full animate-spin border-isBlueLight border-t-transparent drop-shadow-sm"
				role="status"
				aria-label="loading"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}
