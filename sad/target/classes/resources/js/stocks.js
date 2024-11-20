//@ --------------- Loose variables and utils for other js files relaying on stock.js ------------------
// Catch "Global" elements
const portfolio = document.querySelector('.contentBox');
const searchCompanyInput = document.querySelector('.addInput');

// Create a new Date object representing the current date
const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);

// Set the date two years from now
const dateTwoYearsBefore = new Date(currentDate);
dateTwoYearsBefore.setFullYear(currentDate.getFullYear() - 2);

// Format the date components into a human-readable string
const formattedDateTwoYearsBefore = dateTwoYearsBefore.toISOString().slice(0, 10);

// Util function to change the layout grid based on amount of charts
const changeGrid = () => {
	if (portfolio.childElementCount <= 2) {
		// If 2 or fewer charts - change to 1 column
		portfolio.style.setProperty('grid-template-columns', 'minmax(560px, 800px)');
	} else
		portfolio.style.setProperty(
			'grid-template-columns',
			'repeat(auto-fill, minmax(560px, 600px))',
		);
};

// Util function to bookmark the stock charts
const bookmarkStock = (stockName) => {
	//# If some bookmark already exists (returned not null)---------------
	if (getWatchList('bookmarked')) {
		// Get all stored bookmarks
		const watchListArray = getWatchList('bookmarked');
		// Localize the given one
		const stockNamePosition = watchListArray.indexOf(stockName);
		//- AND THEN If clicked graph isn't bookmarked yet ---------------
		if (stockNamePosition == -1) {
			// Add it
			watchListArray.push(stockName);
			setCookie('bookmarked', watchListArray, 1);
			//-OR If clicked graph is already bookmarked -----------------
		} else {
			// Remove it
			watchListArray.splice(stockNamePosition, 1);
			setCookie('bookmarked', watchListArray, 1);
			// Refresh the page to reflect the changes
			window.location.href = window.location.href;
		}
	} else {
		//# If no bookmarks yet - just add given graph---------------------
		setCookie('bookmarked', stockName, 1);
	}
};

// Util function to handle selling and buying
const trade = (buyOrSell, amount, stockValue, stockName) => {
	// Log if error
	buyOrSell && amount && stockValue == false ? console.log('Trade wrong parameters') : null;

	// Define used later variables
	let newBudget;
	// Parse data from cookie strings
	let tradeAmount = parseFloat(amount);
	let stockPrice = parseFloat(stockValue);
	let tradeValue = tradeAmount * stockPrice;
	let walletValue = parseFloat(getCookie('wallet'));
	const portfolio = JSON.parse(getCookie('portfolio'));
	const targetedStockIndex = portfolio.findIndex((stock) => stock.name == stockName);
	const targetedStock = portfolio[targetedStockIndex] || {};
	// Status variables
	const stockInPortfolio = targetedStockIndex > -1 ? true : false;
	const enoughStock = targetedStock.amount >= tradeAmount ? true : false;
	const enoughMoney = tradeValue <= walletValue ? true : false;
	// @ Trade LOGIC -------------------------------------------------------------------
	//# If BUY and we have money -------------------------------------------------------
	if (buyOrSell == '+' && enoughMoney) {
		if (stockInPortfolio) {
			//- If already in posses of this stock
			// Just top up amount
			targetedStock.amount += tradeAmount;
		} else {
			//- If new stock in your collection
			// Add as new record to your portfolio
			portfolio.push({name: stockName, amount: tradeAmount, value: tradeValue});
			// Log into server
			logJavalin([`portfolio.push\n ${JSON.stringify(portfolio)}\n`, ' ']);
		}

		// Update wallet value
		newBudget = walletValue - parseFloat(tradeValue.toFixed(4));

		//# If SELL and we stock for it ------------------------------------------------
	} else if (buyOrSell == '-' && enoughStock) {
		//- If more enough than in stock
		if (targetedStock.amount > tradeAmount) {
			// Just decrease amount
			targetedStock.amount -= tradeAmount;

			//- If stock right for a need
		} else if (targetedStock.amount == tradeAmount) {
			// Delete from stock after trading
			portfolio.splice(targetedStockIndex, 1);
		}
		// Update wallet value
		newBudget = walletValue + parseFloat(tradeValue.toFixed(4));

		//# If CANNOT trade -----------------------------------------------------------
	} else {
		// Create container for got faults objects
		const faultStatuses = [];
		if (buyOrSell == '-') {
			// When SELL attempt - set fault with msg based on status
			const faultObj = stockInPortfolio
				? {fault: !enoughStock, msg: 'No ENOUGH stock in portfolio!'}
				: {fault: !stockInPortfolio, msg: 'No stock in portfolio!'};
			faultStatuses.push(faultObj);
		} else if (buyOrSell == '+') {
			// When BUY attempt - 1 fault possible
			faultStatuses.push({fault: !enoughMoney, msg: 'No enough money!'});
		}

		// Create container for tested msgs
		const alertMsgs = [];

		// Test which fault status occurred and note it
		faultStatuses.forEach((faultStatus) => {
			if (faultStatus.fault == true) {
				alertMsgs.push(faultStatus.msg);
			}
		});

		// Alert all of the noted ones
		alert(alertMsgs.join('\n'));
	}

	// @ Budget UPDATE after trading -------------------------------------------------
	if (newBudget) {
		logJavalin([`Reloaded`, ' ']);

		// Set changes
		setCookie('wallet', newBudget.toFixed(4), 0.1);
		setCookie('portfolio', JSON.stringify(portfolio), 1);

		// Refresh the page what will apply them
		window.location.href = window.location.href;
	}
};

//@ -------------------- Generate GraphBox ---------------------------
const generateGraphBox = (e, startStockName) => {
	// Catching stock name based on if called on input or as util function
	const stockName = startStockName || e.target.value.toUpperCase();

	// Util function for validating number input
	const validateNumberInput = (val) => {
		// If number
		if (parseFloat(val)) {
			return true;
			// If not
		} else {
			// Log alerts
			alert('Wrong number / Not a number');
			logJavalin(['Wrong number / Not a number', ' ']);
			return false;
		}
	};
	//# -------------------- STRUCTURE ---------------------------------
	//-------------------- Main graphBox -------------------------------
	// Create graphBox element
	const graphBox = createEl('div', {class: 'graphBox'});

	//-------------------- graph Container -----------------------------
	const graph = createEl('div', {class: 'graph'});

	// Unique Id for each chart for further actions on it
	const canvas = createEl('canvas', {id: `myChart${stockName}`, class: `myChart`});

	// Input compare
	const compareWith = createEl('input', {
		class: 'compareWithInput',
		placeholder: 'Compare With',
	});

	//-------------------- graphButtons --------------------------------
	// Container for graph buttons
	const graphButtons = createEl('div', {class: 'graphButtons'});

	// Btn X
	const X = createEl('div', {class: 'delete'});
	X.innerText = 'X';

	// Btn Bookmark
	const bookmark = createEl('div', {class: 'bookmark'});
	bookmark.innerHTML = '<i class="far fa-bookmark"></i>';

	// Btn buy
	const buyBtn = createEl('div', {class: 'buyBtn'});
	buyBtn.innerHTML = '<i class="fas fa-cart-plus"></i>';
	const buyBtnInput = createEl('input', {class: 'buyBtnInput', placeholder: 'Units'});
	buyBtn.appendChild(buyBtnInput);

	// Btn sell
	const sellBtn = createEl('div', {class: 'sellBtn'});
	sellBtn.innerHTML = '<i class="fas fa-hand-holding-usd"></i>';
	const sellBtnInput = createEl('input', {class: 'sellBtnInput', placeholder: 'Units'});
	sellBtn.appendChild(sellBtnInput);

	//---------------------- graph-label -------------------------------
	const graphLabel = createEl('div', {class: 'graph-label'});
	const graphLabelName = createEl('h2', {class: 'graph-label-name'});
	graphLabelName.innerText = stockName;

	// Input START
	const inputStart = createEl('input', {type: 'month', class: 'startDateInput'});

	// Input END
	const inputEnd = createEl('input', {type: 'month', class: 'endDateInput'});

	//# ----------------- LISTENERS AND FUNCTIONS-----------------------------------
	//------------------------------- Btn X ----------------------------------------
	// Btn addEventListener
	X.addEventListener('click', () => {
		graphBox.remove();
	});

	//------------------------------- Btn Bookmark ---------------------------------
	// Toggle class to notify status
	if (getWatchList('bookmarked').indexOf(stockName) > -1) {
		bookmark.classList.add('ticked');
	}

	bookmark.addEventListener('click', (e) => {
		bookmark.classList.toggle('ticked');
		bookmarkStock(stockName);
	});

	//------------------------------- Btn Buy -------------------------------------
	buyBtnInput.addEventListener('change', (e) => {
		const inputValue = e.target.value;
		if (validateNumberInput(inputValue)) trade('+', inputValue, chart.currentPrice, stockName);
		else {
			e.target.value = '';
		}
	});

	//------------------------------- Btn Sell ------------------------------------
	sellBtnInput.addEventListener('change', (e) => {
		const inputValue = e.target.value;
		if (validateNumberInput(inputValue)) trade('-', inputValue, chart.currentPrice, stockName);
		else {
			e.target.value = '';
		}
	});

	//------------------------------ Input COMPARE --------------------------------
	compareWith.addEventListener('change', (e) => {
		chart.compareChartWith(e.target.value.toUpperCase());
	});

	//------------------------------- Input START ----------------------------------
	inputStart.addEventListener('input', (e) => {
		const otherInputVal = inputEnd.value;
		chart.alterGraphDates(e.target.value, otherInputVal ? otherInputVal : undefined);
	});

	//-------------------------------- Input END -----------------------------------
	inputEnd.addEventListener('input', (e) => {
		const otherInputVal = inputStart.value;
		chart.alterGraphDates(otherInputVal ? otherInputVal : undefined, e.target.value);
	});

	//# ------------------------------- ASSEMBLE -----------------------------------
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

	// Insert as first child
	portfolio.insertBefore(graphBox, portfolio.firstChild);

	//# ------------------------------- POPULATE CHART -----------------------------------
	// Generate Graph with default dates
	const chart = new MyChart(`myChart${stockName}`, stockName);

	// Check and change layout after generating new box
	changeGrid();

	// Clear input
	if (e) {
		e.target.value = '';
	}
};

//@ -------------------- When content loaded ---------------------------
document.addEventListener('DOMContentLoaded', function () {
	// Start of refreshing the wallet
	refreshWallet();

	// Assign graph box generation to searchCompanyInput input
	try {
		searchCompanyInput.addEventListener('change', (e) => {
			generateGraphBox(e);
		});
	} catch (error) {}

	// Initial check and change layout depended on amount of graphs
	changeGrid();
});
