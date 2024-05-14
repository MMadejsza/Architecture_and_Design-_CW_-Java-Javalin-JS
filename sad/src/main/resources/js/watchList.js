document.addEventListener('DOMContentLoaded', () => {
	// When content loaded apply settings
	applyFromCookies('all');
	// Refresh wallet to reflect changes
	refreshWallet();
	// Fetch WatchList
	const watchListArray = getWatchList('bookmarked');
	// Display chart for each shortlisted stock
	watchListArray.forEach((stock) => {
		generateGraphBox('', stock);
	});
});
