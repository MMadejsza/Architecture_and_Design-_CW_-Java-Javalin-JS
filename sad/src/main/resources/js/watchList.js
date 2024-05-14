document.addEventListener('DOMContentLoaded', (event) => {
	checkFromCookies();
	refreshWallet();
	const watchListArray = getWatchList('bookmarked');
	console.log(`wtachlist: ${getWatchList('bookmarked')}`);
	watchListArray.forEach((stock) => {
		inputAddFunction('', stock);
	});
});
