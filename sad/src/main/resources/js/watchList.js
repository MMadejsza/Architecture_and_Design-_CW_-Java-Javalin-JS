document.addEventListener('DOMContentLoaded', (event) => {
	setFromCookies('all');
	refreshWallet();
	const watchListArray = getWatchList('bookmarked');
	console.log(`wtachlist: ${getWatchList('bookmarked')}`);
	watchListArray.forEach((stock) => {
		inputAddFunction('', stock);
	});
});
