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
	if (getWatchList('bookmarked')) {
		const watchListArray = getWatchList('bookmarked');
		const stockNamePosition = watchListArray.indexOf(stockName);
		// if clicked graph isn't bookmarked
		if (stockNamePosition == -1) {
			watchListArray.push(stockName);
			setCookie('bookmarked', watchListArray, 1);
			// if clicked graph is already bookmarked
		} else {
			watchListArray.splice(stockNamePosition, 1);
			setCookie('bookmarked', watchListArray, 1);
			window.location.href = window.location.href;
		}
		// if no bookmarks yet - just add clicked graph
	} else {
		setCookie('bookmarked', stockName, 1);
	}
};

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
	console.log(enoughMoney);
	if (buyOrSell == '+' && enoughMoney) {
		// customer + stock to portfolio or update
		if (stockInPortfolio) {
			targetedStock.amount += tradeAmount;
		} else {
			portfolio.push({name: stockName, amount: tradeAmount, value: tradeValue});
			logJavalin([`portfolio.push\n ${JSON.stringify(portfolio)}\n`, ' ']);
		}
		// customer + wallet update
		newBudget = walletValue - parseFloat(tradeValue.toFixed(4));
	} else if (buyOrSell == '-' && enoughStock) {
		// customer + stock to portfolio or update
		if (targetedStock.amount > tradeAmount) {
			targetedStock.amount -= tradeAmount;
		} else if (targetedStock.amount == tradeAmount) {
			// delete from stock
			portfolio.splice(targetedStockIndex, 1);
		}
		// customer - wallet update
		newBudget = walletValue + parseFloat(tradeValue.toFixed(4));
	} else {
		const faultStatuses = [];
		if (buyOrSell == '-') {
			const faultObj = stockInPortfolio
				? {fault: !enoughStock, msg: 'No ENOUGH stock in portfolio!'}
				: {fault: !stockInPortfolio, msg: 'No stock in portfolio!'};
			faultStatuses.push(faultObj);
		} else if (buyOrSell == '+') {
			faultStatuses.push({fault: !enoughMoney, msg: 'No enough money!'});
		}

		const alertMsgs = [];

		faultStatuses.forEach((faultStatus) => {
			if (faultStatus.fault == true) {
				alertMsgs.push(faultStatus.msg);
			}
		});
		alert(alertMsgs.join('\n'));
	}

	if (newBudget) {
		logJavalin([`Reloaded`, ' ']);

		setCookie('wallet', newBudget.toFixed(4), 0.1);
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
			alert('Wrong number / Not a number');
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
	if (getWatchList('bookmarked').indexOf(stockName) > -1) {
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
		if (validateNumberInput(inputValue)) trade('+', inputValue, chart.currentPrice, stockName);
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
		if (validateNumberInput(inputValue)) trade('-', inputValue, chart.currentPrice, stockName);
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
		chart.alterGraphDates(e.target.value, otherInputVal ? otherInputVal : undefined);
	});

	// Input END
	const inputEnd = createEl('input', {type: 'month', class: 'endDateInput'});
	inputEnd.addEventListener('input', (e) => {
		const otherInputVal = inputStart.value;
		chart.alterGraphDates(otherInputVal ? otherInputVal : undefined, e.target.value);
	});

	// Input compare
	const compareWith = createEl('input', {
		class: 'compareWithInput',
		placeholder: 'Compare With',
	});

	compareWith.addEventListener('change', (e) => {
		chart.compareChartWith(e.target.value.toUpperCase());
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
	const chart = new MyChart(`myChart${stockName}`, stockName);
	console.log(chart);

	// Check and change layout depended on amount of graphs
	changeGrid();

	// Clear input
	if (e) {
		e.target.value = '';
	}
};

document.addEventListener('DOMContentLoaded', function () {
	refreshWallet();

	try {
		addInput.addEventListener('change', (e) => {
			inputAddFunction(e);
		});
	} catch (error) {}

	// Initial check and change layout depended on amount of graphs
	changeGrid();
});
