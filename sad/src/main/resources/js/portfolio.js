document.addEventListener('DOMContentLoaded', function () {
	let budget = getWalletValue();
	console.log(budget);
	let wallet = document.querySelector('.walletValue');
	wallet.innerHTML = parseFloat(budget);
});
