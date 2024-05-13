// Catch "Global" elements
const portfolio = document.querySelector('.contentBox');
const addInput = document.querySelector('.addInput');

// Create a new Date object representing the current date
const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);

// Set the date two years from now
const dateTwoYearsBefore = new Date(currentDate);
dateTwoYearsBefore.setFullYear(currentDate.getFullYear() - 2);

// Format the date components into a human-readable string
const formattedDateTwoYearsBefore = dateTwoYearsBefore.toISOString().slice(0, 10);
// console.log(formattedDateTwoYearsBefore);
// console.log(formattedCurrentDate);

// Generate label for each date in a range

class MyChart {
	constructor(chartID, name) {
		this.baseColor = getComputedStyle(document.documentElement).getPropertyValue(
			'--defaultColor',
		);
		this.ctx = document.getElementById(chartID);
		this.chartID = chartID;
		this.name = name;
		this.startDate;
		this.endDate;
		this.chartBody;
		this.chartDates;
		this.chartValues;
		this.chartDatesFiltered;
		this.chartValuesFiltered;
		this.initializeData();
	}

	initializeData = async () => {
		console.log(this.startDate, this.endDate);
		const {dates, values} = await this.fetchChartData(this.name);
		this.chartDates = dates;
		this.chartValues = values;
		this.initializeStartEndDates();
		this.filterData('main', this.startDate, this.endDate, this.chartDates, this.chartValues);
		this.produceChartBody();
	};

	initializeStartEndDates = () => {
		// Create a new Date object representing the current date
		const currentDate = new Date();
		this.endDate = currentDate.toISOString().slice(0, 10);

		// Set the date two years from now
		const dateTwoYearsBefore = new Date(currentDate);
		dateTwoYearsBefore.setFullYear(currentDate.getFullYear() - 2);

		// Format the date components into a human-readable string
		this.startDate = dateTwoYearsBefore.toISOString().slice(0, 10);
		// console.log(formattedDateTwoYearsBefore);
		// console.log(formattedCurrentDate);
	};

	fetchChartData = async (name) => {
		const response = await fetch(`/fetchedStocks?name=${name}`);
		const data = await response.json();
		// console.log(data);
		const chartValues = data.chart.result[0].indicators.quote[0].open;
		const chartDates = data.chart.result[0].timestamp.map((stamp) => {
			// to milliseconds
			const dateObject = new Date(stamp * 1000);
			// leading 0 but max 2 digits
			const day = ('0' + dateObject.getDate()).slice(-2);
			// month starts from 0
			const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
			const year = dateObject.getFullYear();

			return `${year}-${month}-${day}`;
		});
		return {dates: chartDates, values: chartValues};
	};

	filterData = (
		type,
		startDate,
		endDate,
		chartDates = this.chartDates,
		chartValues = this.chartValues,
	) => {
		const chartDatesFiltered = chartDates.filter((stamp) => {
			const startDateObject = new Date(startDate);
			const endDateObject = new Date(endDate);
			const currentDate = new Date(stamp);
			return startDateObject <= currentDate && currentDate <= endDateObject;
		});

		// We are setting starting index in values the same like filtered index in dates
		const newStartDateValue = chartDatesFiltered[0];
		const newEndDateValue = chartDatesFiltered[chartDatesFiltered.length - 1];
		const valueStartIndex = chartDates.indexOf(newStartDateValue);
		const valueEndIndex = chartDates.indexOf(newEndDateValue);

		// console.log('valueStartIndex', valueStartIndex);
		// console.log('valueEndIndex', valueEndIndex);

		// console.log('chartValues', chartValues);
		const chartValuesFiltered = chartValues.slice(valueStartIndex, valueEndIndex);
		// console.log('valuesArray', valuesArray);
		if (type == 'main') {
			this.chartDatesFiltered = chartDatesFiltered;
			this.chartValuesFiltered = chartValuesFiltered;
		} else {
			const filteredData = {fdates: chartDatesFiltered, fvalues: chartValuesFiltered};
			return filteredData;
		}
	};

	compareChartWith = async (stockNameToCompare) => {
		const {newStockValues} = await this.fetchChartData(stockNameToCompare);
		const existingChartStartDate = this.chartDatesFiltered[0];
		const existingChartEndDate = this.chartDatesFiltered[this.chartDatesFiltered.length - 1];
		const {newStockValuesFiltered = fvalues} = filterData(
			'',
			existingChartStartDate,
			existingChartEndDate,
			this.chartDatesFiltered,
			newStockValues,
		);

		this.chartBody.datasets.push({
			label: stockNameToCompare,
			data: [...newStockValuesFiltered],
			fill: false,
			borderColor: this.baseColor,
			tension: 0.1,
		});
	};

	produceChartBody = () => {
		this.chartBody = new Chart(this.ctx, {
			type: 'line',
			data: {
				labels: this.chartDatesFiltered,
				datasets: [
					{
						label: this.name,
						data: this.chartValuesFiltered,
						fill: false,
						borderColor: this.baseColor,
						tension: 0.1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: false,
					},
				},
			},
		});
	};
}

// CHART generator util
const generateChart = (
	chartID,
	name,
	startDate = formattedDateTwoYearsBefore,
	endDate = formattedCurrentDate,
) => {
	// Catch defaultColor
	const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--defaultColor');
	// Catch container
	const ctx = document.getElementById(chartID);

	// Destroy existing chart if it exists
	const existingChart = Chart.getChart(chartID);
	if (existingChart) existingChart.destroy();

	// Draw graph after fetching data from Java backend

	fetch(`/fetchedStocks?name=${name}`)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);
			const chartValues = data.chart.result[0].indicators.quote[0].open;
			const chartDates = data.chart.result[0].timestamp.map((stamp) => {
				//  to milliseconds
				const dateObject = new Date(stamp * 1000);
				// leading 0 but max 2 digits
				const day = ('0' + dateObject.getDate()).slice(-2);
				// month starts from 0
				const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
				const year = dateObject.getFullYear();

				return `${year}-${month}-${day}`;
			});
			const chartDatesFiltered = chartDates.filter((stamp) => {
				const startDateObject = new Date(startDate);
				const endDateObject = new Date(endDate);
				const currentDate = new Date(stamp);
				return startDateObject <= currentDate && currentDate <= endDateObject;
			});
			// we are setting starting index in values the same like index in dates
			const valueStartIndex = chartDates.indexOf(chartDatesFiltered[0]);
			const valueEndIndex = chartDates.indexOf(
				chartDatesFiltered[chartDatesFiltered.length - 1],
			);
			// console.log('valueStartIndex', valueStartIndex);
			// console.log('valueEndIndex', valueEndIndex);

			// console.log('chartValues', chartValues);
			const valuesArray = chartValues.slice(valueStartIndex, valueEndIndex);
			// console.log('valuesArray', valuesArray);

			return new Chart(ctx, {
				type: 'line',
				data: {
					labels: chartDatesFiltered,
					datasets: [
						{
							label: name,
							data: [...valuesArray],
							fill: false,
							borderColor: baseColor,
							tension: 0.1,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: false,
						},
					},
				},
			});
		})
		.catch((error) => console.error('Error fetching data:', error));
};

// APP LAYOUT CHANGE ON DELETION
const changeGrid = () => {
	if (portfolio.childElementCount <= 2) {
		portfolio.style.setProperty('grid-template-columns', 'minmax(560px, 800px)');
	} else
		portfolio.style.setProperty(
			'grid-template-columns',
			'repeat(auto-fill, minmax(560px, 600px))',
		);
};

const addBookmark = (stockName) => {
	// if some bookmark already exists(not null)
	if (getCookiesArray('bookmarked')) {
		const watchListArray = getCookiesArray('bookmarked');
		// console.log(`stocks watchListArray: ${watchListArray}`);
		const stockNamePosition = watchListArray.indexOf(stockName);
		// if clicked graph isn't bookmarked
		if (stockNamePosition == -1) {
			watchListArray.push(stockName);
			setCookie('bookmarked', watchListArray, 1);
			// if clicked graph is already bookmarked
		} else {
			watchListArray.splice(stockNamePosition, 1);
			setCookie('bookmarked', watchListArray, 1);
		}
		// if no bookmarks yet - just add clicked graph
	} else {
		setCookie('bookmarked', stockName, 1);
	}
	// console.log('bookmarked', getCookie('bookmarked'));
};

const validateUserPortfolio = (stockName, amount) => {};

const trade = (buyOrSell, amount, StockValue, stockName) => {
	buyOrSell && amount && StockValue == false ? console.log('Trade wrong parameters') : null;
	let newBudget;
	let tradeAmount = parseFloat(amount);
	let currentStockValue = parseFloat(StockValue);
	let tradeValue = tradeAmount * currentStockValue;
	let walletValue = parseFloat(getCookie('wallet'));
	const portfolio = JSON.parse(getCookie('portfolio'));
	const targetedStockIndex = portfolio.findIndex((stock) => stock.name == stockName);
	const stockInPortfolio = targetedStockIndex > -1 ? true : false;
	const targetedStock = portfolio[targetedStockIndex] || {};
	const enoughStock = targetedStock.amount >= tradeAmount ? true : false;
	const enoughMoney = tradeValue <= walletValue ? true : false;

	if (buyOrSell == '+' && enoughMoney) {
		// customer + stock to portfolio or update
		if (stockInPortfolio) {
			targetedStock.amount += tradeAmount;
		} else {
			portfolio.push({name: stockName, amount: tradeAmount, value: tradeValue});
			logJavalin([`portfolio.push\n ${JSON.stringify(portfolio)}\n`, ' ']);
		}
		// customer + wallet update
		newBudget = walletValue - tradeValue;
	} else if (buyOrSell == '-' && enoughStock) {
		// customer + stock to portfolio or update
		if (targetedStock.amount > tradeAmount) {
			targetedStock.amount -= tradeAmount;
		} else if (targetedStock.amount == tradeAmount) {
			// delete from stock
			portfolio.splice(targetedStockIndex, 1);
		}
		// customer - wallet update
		newBudget = walletValue + tradeValue;
	} else {
		console.log([
			`stockInPortfolio?: ${stockInPortfolio}`,
			`stockAmountInPortfolio: ${targetedStock.amount}`,
			`enoughStock?: ${enoughStock}`,
			`enoughMoney?: ${enoughMoney}`,
		]);
		logJavalin([
			`stockInPortfolio?: ${stockInPortfolio}`,
			`stockAmountInPortfolio: ${targetedStock.amount}`,
			`enoughStock?: ${enoughStock}`,
			`enoughMoney?: ${enoughMoney}`,
		]);
	}

	if (newBudget) {
		logJavalin([`Reloaded`, ' ']);

		setCookie('wallet', newBudget, 0.1);
		setCookie('portfolio', JSON.stringify(portfolio), 1);
		// Refresh the page
		window.location.href = window.location.href;
	}
};

// -------------------- ADD COMPANY INPUT ---------------------------
const inputAddFunction = (e, startStockName) => {
	// Util value catching
	const stockName = startStockName || e.target.value.toUpperCase();

	// Util function for validating number input
	const validateNumberInput = (val) => {
		if (parseFloat(val)) {
			return true;
		} else {
			console.log('Wrong number / Not a number');
			logJavalin(['Wrong number / Not a number', ' ']);
			return false;
		}
	};

	// Create graphBox element
	const graphBox = createEl('div', {class: 'graphBox'});

	//----------- Create graphBox inner structure/content---------------

	// graphBox.innerHTML = `<button class="delete">X</button>
	// <div class="graph">
	// 	<canvas id="myChart" width="100%">
	// </div>
	// <div class="graph-label">
	// 	<input class = "startDateInput" type="date" />
	// 	<h2 class = "graph-label-name">${e.target.value}</h2>
	// 	<input class = "endDateInput" type="date" />
	// </div>`;

	// Container for graph buttons
	const graphButtons = createEl('div', {class: 'graphButtons'});

	// X create
	const X = createEl('div', {class: 'delete'});
	X.innerText = 'X';
	// Btn addEventListener
	X.addEventListener('click', () => {
		graphBox.remove();
	});

	// Bookmark create
	const bookmark = createEl('div', {class: 'bookmark'});
	bookmark.innerHTML = '<i class="far fa-bookmark"></i>';
	// Toggle class to notify status
	if (getCookiesArray('bookmarked').indexOf(stockName) > -1) {
		bookmark.classList.add('ticked');
	}
	// Bookmark addEventListener
	bookmark.addEventListener('click', (e) => {
		bookmark.classList.toggle('ticked');
		addBookmark(stockName);
	});

	// buyBtn create
	const buyBtn = createEl('div', {class: 'buyBtn'});
	buyBtn.innerHTML = '<i class="fas fa-cart-plus"></i>';
	const buyBtnInput = createEl('input', {class: 'buyBtnInput', placeholder: 'Units'});
	buyBtn.appendChild(buyBtnInput);
	// buyBtn addEventListener
	buyBtnInput.addEventListener('change', (e) => {
		const inputValue = e.target.value;
		if (validateNumberInput(inputValue)) trade('+', inputValue, 1, stockName);
		else {
			e.target.value = '';
		}
	});

	// sellBtn create
	const sellBtn = createEl('div', {class: 'sellBtn'});
	sellBtn.innerHTML = '<i class="fas fa-hand-holding-usd"></i>';
	const sellBtnInput = createEl('input', {class: 'sellBtnInput', placeholder: 'Units'});
	sellBtn.appendChild(sellBtnInput);
	// sellBtn addEventListener
	sellBtnInput.addEventListener('change', (e) => {
		const inputValue = e.target.value;
		if (validateNumberInput(inputValue)) trade('-', inputValue, 1, stockName);
		else {
			e.target.value = '';
		}
	});

	// Graph container create
	const graph = createEl('div', {class: 'graph'});

	// Unique Id for each chart for further actions on it
	const canvas = createEl('canvas', {id: `myChart${stockName}`, class: `myChart`});

	// Graph label structure create
	const graphLabel = createEl('div', {class: 'graph-label'});
	const graphLabelName = createEl('h2', {class: 'graph-label-name'});
	graphLabelName.innerText = stockName;

	// Input START
	const inputStart = createEl('input', {type: 'month', class: 'startDateInput'});
	inputStart.addEventListener('input', (e) => {
		const otherInputVal = inputEnd.value;
		// generateChart(
		// 	`myChart${stockName}`,
		// 	stockName,
		// 	e.target.value,
		// 	otherInputVal ? otherInputVal : undefined,
		// );
	});

	// Input END
	const inputEnd = createEl('input', {type: 'month', class: 'endDateInput'});
	inputEnd.addEventListener('input', (e) => {
		const otherInputVal = inputStart.value;
		// generateChart(
		// 	`myChart${stockName}`,
		// 	stockName,
		// 	otherInputVal ? otherInputVal : undefined,
		// 	e.target.value,
		// );
	});

	// Input compare
	const compareWith = createEl('input', {
		class: 'compareWithInput',
		placeholder: 'Compare With',
	});

	compareWith.addEventListener('change', (e) => {
		console.log(chart);
		chart.data.datasets.push(e.target.value);
	});

	// ASSEMBLE the graphBox
	graphLabel.appendChild(inputStart);
	graphLabel.appendChild(graphLabelName);
	graphLabel.appendChild(inputEnd);

	graph.appendChild(canvas);
	graph.appendChild(graphButtons);
	graph.appendChild(compareWith);

	graphButtons.appendChild(X);
	graphButtons.appendChild(bookmark);
	graphButtons.appendChild(buyBtn);
	graphButtons.appendChild(sellBtn);
	graphBox.appendChild(graph);
	graphBox.appendChild(graphLabel);

	//----------- END Create graphBox inner structure/content---------------

	// Insert as first child
	portfolio.insertBefore(graphBox, portfolio.firstChild);

	// Generate Graph with default dates
	// const chart = generateChart(`myChart${stockName}`, stockName);
	const chart = new MyChart(`myChart${stockName}`, stockName);
	console.log(chart);
	// Check and change layout depended on amount of graphs
	changeGrid();

	// Clear input
	if (e) {
		e.target.value = '';
	}

	// console.log(chart);
};

document.addEventListener('DOMContentLoaded', function () {
	refreshWallet();

	try {
		addInput.addEventListener('change', (e) => {
			inputAddFunction(e);
		});
	} catch (error) {
		console.log(`No addInput`);
	}

	// Initial check and change layout depended on amount of graphs
	changeGrid();
});
