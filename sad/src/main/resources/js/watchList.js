document.addEventListener('DOMContentLoaded', (event) => {
	applyFromCookies('all');
	refreshWallet();
	const watchListArray = getWatchList('bookmarked');
	console.log(`wtachlist: ${getWatchList('bookmarked')}`);
	watchListArray.forEach((stock) => {
		inputAddFunction('', stock);
	});
});
