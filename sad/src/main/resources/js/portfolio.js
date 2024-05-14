document.addEventListener('DOMContentLoaded', function () {
	refreshWallet();
	const portfolio = JSON.parse(getCookie('portfolio'));
	console.log(`portfolio ${portfolio}`);
	const table = document.querySelector('table');

	const updateStocks = async () => {
		const portfolioWithValues = [];
		await Promise.all(
			portfolio.map(async (portfolioStock) => {
				const response = await fetch(`/fetchedStocks?name=${portfolioStock.name}`);
				const data = await response.json();
				const allValues = data.chart.result[0].indicators.quote[0].open;
				const currentPrice = allValues[allValues.length - 1]
					? allValues[allValues.length - 1]
					: allValues[allValues.length - 2];
				portfolioStock.currentPrice = currentPrice;
				portfolioWithValues.push(portfolioStock);
			}),
		);
		return portfolioWithValues;
	};

	const generateTable = async () => {
		const portfolioWithValues = await updateStocks();
		console.log(portfolioWithValues);
		portfolioWithValues.sort(
			(stock1, stock2) =>
				stock2.amount * stock2.currentPrice - stock1.amount * stock1.currentPrice,
		);
		portfolioWithValues.forEach((portfolioStock) => {
			const tr = document.createElement('tr');

			const td1 = document.createElement('td');
			td1.innerText = portfolioStock.name;

			const td2 = document.createElement('td');
			td2.innerText = portfolioStock.amount.toFixed(4);

			const td3 = document.createElement('td');
			td3.innerText = portfolioStock.currentPrice.toFixed(4);

			const td4 = document.createElement('td');
			const value = (portfolioStock.amount * portfolioStock.currentPrice).toFixed(4);
			td4.innerText = value;

			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);

			table.appendChild(tr);
		});

		portfolioWithValues.forEach((stock) => {
			inputAddFunction('', stock.name);
		});
	};

	generateTable();
});
