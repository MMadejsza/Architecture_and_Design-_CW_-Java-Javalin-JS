checkFromCookies();
const watchListArray = getCookiesArray('bookmarked');
console.log(`wtachlist watchList: ${getCookiesArray('bookmarked')}`);
watchListArray.forEach((stock) => {
	inputAddFunction('', stock);
});
