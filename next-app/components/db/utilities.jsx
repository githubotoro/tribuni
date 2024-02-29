export function sanitizeText(text) {
	if (text === null || text === undefined) {
		return null;
	}

	return text.replace(/'/g, "''");
}
