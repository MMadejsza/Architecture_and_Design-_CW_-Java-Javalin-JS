checkFromCookies();
const watchListArray = getWatchListArray();
console.log(`wtachlist watchList: ${getWatchListArray()}`);
watchListArray.forEach((stock) => {
	inputAddFunction('', stock);
});
