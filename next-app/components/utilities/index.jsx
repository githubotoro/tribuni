export function timeFromNow(timestamp) {
	const currentDate = new Date();
	const targetDate = new Date(timestamp * 1000); // Convert seconds to milliseconds

	const timeDifference = targetDate - currentDate;

	const seconds = Math.abs(Math.floor(timeDifference / 1000));
	const minutes = Math.abs(Math.floor(seconds / 60));
	const hours = Math.abs(Math.floor(minutes / 60));
	const days = Math.abs(Math.floor(hours / 24));
	const weeks = Math.abs(Math.floor(days / 7));
	const months = Math.abs(Math.floor(days / 30));
	const years = Math.abs(Math.floor(days / 365));

	if (timeDifference < 0) {
		// Past timestamp
		if (years > 0) return `${years}y ago`;
		if (months > 0) return `${months}mo ago`;
		if (weeks > 0) return `${weeks}w ago`;
		if (days > 0) return `${days}d ago`;
		if (hours > 0) return `${hours}h ago`;
		if (minutes > 0) return `${minutes}min ago`;

		return `${seconds}s ago`;
	} else {
		// Future timestamp
		if (years > 0) return `in ${years}y`;
		if (months > 0) return `in ${months}mo`;
		if (weeks > 0) return `in ${weeks}w`;
		if (days > 0) return `in ${days}d`;
		if (hours > 0) return `in ${hours}h`;
		if (minutes > 0) return `in ${minutes}min`;

		return `in ${seconds}s`;
	}
}

export function rawTimeFromNow(timestamp) {
	const currentDate = new Date();
	const targetDate = new Date(timestamp * 1000); // Convert seconds to milliseconds

	const timeDifference = targetDate - currentDate;

	const seconds = Math.abs(Math.floor(timeDifference / 1000));
	const minutes = Math.abs(Math.floor(seconds / 60));
	const hours = Math.abs(Math.floor(minutes / 60));
	const days = Math.abs(Math.floor(hours / 24));
	const weeks = Math.abs(Math.floor(days / 7));
	const months = Math.abs(Math.floor(days / 30));
	const years = Math.abs(Math.floor(days / 365));

	if (timeDifference < 0) {
		// Past timestamp
		if (years > 0) return `${years}y ago`;
		if (months > 0) return `${months}mo ago`;
		if (weeks > 0) return `${weeks}w ago`;
		if (days > 0) return `${days}d ago`;
		if (hours > 0) return `${hours}h ago`;
		if (minutes > 0) return `${minutes}min ago`;

		return `${seconds}s ago`;
	} else {
		// Future timestamp
		if (years > 0) return `${years}y`;
		if (months > 0) return `${months}mo`;
		if (weeks > 0) return `${weeks}w`;
		if (days > 0) return `${days}d`;
		if (hours > 0) return `${hours}h`;
		if (minutes > 0) return `${minutes}min`;

		return `${seconds}s`;
	}
}
