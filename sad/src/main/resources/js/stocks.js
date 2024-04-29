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

// Generate label for each date in a range
const getDaysArray = function (start = formattedCurrentDate, end = formattedDateTwoYearsBefore) {
	console.log('start', start);
	console.log('end', end);
	let arr = [];
	for (let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
		let readyDate = new Date(dt).toLocaleDateString();
		arr.push(readyDate);
	}
	return arr;
};

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
			// return (values = data.chart.result[0].indicators.quote[0]);
			console.log(data);
			const chartValues = data.chart.result[0].indicators.quote[0];

			return (chart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: getDaysArray(startDate, endDate),
					datasets: [
						{
							label: name,
							data: [...chartValues.open],
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
			}));
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

const getCookiesArray = (target) => {
	const watchList = getCookie(target);
	if (watchList) {
		const watchListArray = watchList.split(',');
		return watchListArray;
	} else {
		return [];
	}
};

const addBookmark = (stockName) => {
	// if some bookmark already exists(not null)
	if (getCookiesArray('bookmarked')) {
		const watchListArray = getCookiesArray('bookmarked');
		console.log(`stocks watchListArray: ${watchListArray}`);
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
	console.log('bookmarked', getCookie('bookmarked'));
};

const trade = (buyOrSell, amount, value) => {};

// -------------------- ADD COMPANY INPUT ---------------------------

const inputAddFunction = (e, startStockName) => {
	// Util value catching
	const stockName = startStockName || e.target.value.toUpperCase();
	console.log(stockName);
	let chart;

	// Util function for creating elements
	const createEl = (el, attributes) => {
		const element = document.createElement(el);
		for (var key in attributes) {
			element.setAttribute(key, attributes[key]);
		}
		return element;
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
		trade('+', e.target.value, 1.45);
	});

	// sellBtn create
	const sellBtn = createEl('div', {class: 'sellBtn'});
	sellBtn.innerHTML = '<i class="fas fa-hand-holding-usd"></i>';
	const sellBtnInput = createEl('input', {class: 'sellBtnInput', placeholder: 'Units'});
	sellBtn.appendChild(sellBtnInput);
	// sellBtn addEventListener
	sellBtnInput.addEventListener('change', (e) => {
		trade('-', e.target.value, 1.45);
	});

	// Graph container create
	const graph = createEl('div', {class: 'graph'});

	// Unique Id for each chart for further actions on it
	const canvas = createEl('canvas', {width: '100%', id: `myChart${stockName}`});

	// Graph label structure create
	const graphLabel = createEl('div', {class: 'graph-label'});
	const graphLabelName = createEl('h2', {class: 'graph-label-name'});
	graphLabelName.innerText = stockName;

	// Input START
	const inputStart = createEl('input', {type: 'date', class: 'startDateInput'});
	inputStart.addEventListener('input', (e) => {
		const otherInputVal = inputEnd.value;
		generateChart(
			`myChart${stockName}`,
			stockName,
			e.target.value,
			otherInputVal ? otherInputVal : undefined,
		);
		// chart.data.labels = getDaysArray(e.target.value, otherInputVal);
		// chart.update();
	});

	// Input END
	const inputEnd = createEl('input', {type: 'date', class: 'endDateInput'});
	inputEnd.addEventListener('input', (e) => {
		const otherInputVal = inputStart.value;
		generateChart(
			`myChart${stockName}`,
			stockName,
			otherInputVal ? otherInputVal : undefined,
			e.target.value,
		);
	});

	const compareWith = createEl('input', {
		class: 'compareWithInput',
		placeholder: 'Compare With',
	});

	compareWith.addEventListener('input', (e) => {
		canvas.datasets.push;
	});

	// ASSEMBLE the graphBox
	graphLabel.appendChild(inputStart);
	graphLabel.appendChild(graphLabelName);
	graphLabel.appendChild(inputEnd);

	graph.appendChild(canvas);
	graph.appendChild(compareWith);

	graphButtons.appendChild(X);
	graphButtons.appendChild(bookmark);
	graphButtons.appendChild(buyBtn);
	graphButtons.appendChild(sellBtn);
	graphBox.appendChild(graphButtons);
	graphBox.appendChild(graph);
	graphBox.appendChild(graphLabel);

	//----------- END Create graphBox inner structure/content---------------

	// Insert as first child
	portfolio.insertBefore(graphBox, portfolio.firstChild);

	// Generate Graph with default dates
	chart = generateChart(`myChart${stockName}`, stockName);

	// Check and change layout depended on amount of graphs
	changeGrid();

	// Clear input
	if (e) {
		e.target.value = '';
	}

	console.log(chart);
};

document.addEventListener('DOMContentLoaded', function () {
	try {
		addInput.addEventListener('change', (e) => {
			inputAddFunction(e);
		});
	} catch (error) {
		console.log(`No addInput`);
	}

	// Initial check and change layout depended on amount of graphs
	changeGrid();

	// Initial demo graphs in stocks search

	// inputAddFunction('', 'aapl');
	// inputAddFunction('', 'tsla');
	// inputAddFunction('', 'dpz');
	// inputAddFunction('', 'goog');
});
