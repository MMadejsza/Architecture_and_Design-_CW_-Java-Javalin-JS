document.addEventListener('DOMContentLoaded', (event) => {
	checkFromCookies();
	refreshWallet();
	const watchListArray = getCookiesArray('bookmarked');
	console.log(`wtachlist: ${getCookiesArray('bookmarked')}`);
	watchListArray.forEach((stock) => {
		inputAddFunction('', stock);
	});
});
