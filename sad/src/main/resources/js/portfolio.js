document.addEventListener('DOMContentLoaded', function () {
	// Start of refreshing the wallet view
	refreshWallet();

	// Catch desired elements and values
	const portfolio = JSON.parse(getCookie('portfolio'));
	const table = document.querySelector('table');

	// Util function to get array of portfolio with stocks current prices
	const populatePortfolio = async () => {
		const portfolioWithValues = [];
		// Promise all to wait for all promises (fetches)
		await Promise.all(
			// Map after fetched from cookies portfolio with just names
			portfolio.map(async (portfolioStock) => {
				// Fetch real data for each
				const response = await fetch(`/fetchedStocks?name=${portfolioStock.name}`);
				const data = await response.json();
				// Get current price as last value for updated daily stocks
				const allValues = data.chart.result[0].indicators.quote[0].open;
				const currentPrice = allValues[allValues.length - 1]
					? allValues[allValues.length - 1]
					: // There may be the case where todays date is populated but value not updated yet so in this case get yesterday's one
					  allValues[allValues.length - 2];
				// We store stocks names as objects so add extra property with current price
				portfolioStock.currentPrice = currentPrice;
				portfolioWithValues.push(portfolioStock);
			}),
		);
		return portfolioWithValues;
	};

	// Main function to calculate and generate portfolio table values
	const generateTable = async () => {
		// Get portfolio with prices
		const portfolioWithValues = await populatePortfolio();

		// Sort portfolio for total value descending
		portfolioWithValues.sort(
			(stock1, stock2) =>
				stock2.amount * stock2.currentPrice - stock1.amount * stock1.currentPrice,
		);

		// For each stock create and populate row with cells
		portfolioWithValues.forEach((portfolioStock) => {
			// ROW
			const tr = document.createElement('tr');
			// NAME
			const td1 = document.createElement('td');
			td1.innerText = portfolioStock.name;
			// AMOUNT
			const td2 = document.createElement('td');
			td2.innerText = portfolioStock.amount.toFixed(4);
			// PRICE
			const td3 = document.createElement('td');
			td3.innerText = portfolioStock.currentPrice.toFixed(4);
			// TOTAL VALUE
			const td4 = document.createElement('td');
			const value = (portfolioStock.amount * portfolioStock.currentPrice).toFixed(4);
			td4.innerText = value;

			// ASSEMBLE
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);

			table.appendChild(tr);
		});

		// Additionally for each record generate chart to allow performing actions on purchased stocks. Kept inside this table function due to await 'portfolioWithValues' feature
		portfolioWithValues.forEach((stock) => {
			generateGraphBox('', stock.name);
		});
	};

	// Call main function
	generateTable();
});
