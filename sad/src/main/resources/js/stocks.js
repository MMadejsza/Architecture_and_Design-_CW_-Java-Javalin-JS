document.addEventListener('DOMContentLoaded', function () {
	// Catch "Global" elements
	const portfolio = document.querySelector('.contentBox');
	const addInput = document.querySelector('.addInput');

	// CHART generator util
	const generateChart = (chartID, name, startDate = '2022-02-01', endDate = '2024-12-01') => {
		// Catch defaultColor
		const baseColor = getComputedStyle(document.documentElement).getPropertyValue(
			'--defaultColor',
		);
		// Catch container
		const ctx = document.getElementById(chartID);
		// Destroy existing chart if it exists
		const existingChart = Chart.getChart(chartID);
		if (existingChart) existingChart.destroy();

		// Generate label for each date in a range
		const getDaysArray = function () {
			let arr = [];
			for (
				let dt = new Date(startDate);
				dt <= new Date(endDate);
				dt.setDate(dt.getDate() + 1)
			) {
				let readyDate = new Date(dt).toLocaleDateString();
				arr.push(readyDate);
			}
			return arr;
		};

		// Draw graph after fetching data from Java backend
		fetch(`/fetchedStocks?name=${name}&startDate=${startDate}&endDate=${endDate}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const values = data.chart.result[0].indicators.quote[0];
				// Assuming your data from the backend is an array of values for each date

				const newChart = new Chart(ctx, {
					type: 'line',
					data: {
						labels: getDaysArray(),
						datasets: [
							{
								label: name,
								data: [...values.open], // Use fetched data here
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

	// -------------------- ADD COMPANY INPUT ---------------------------
	addInput.addEventListener('change', (e) => {
		// Util value catching
		const stockName = e.target.value;

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

		// Btn create
		const button = createEl('button', {class: 'delete'});
		button.innerText = 'X';
		// Btn addEventListener
		button.addEventListener('click', (e) => {
			graphBox.remove();
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

		// ASSEMBLE the graphBox
		graphLabel.appendChild(inputStart);
		graphLabel.appendChild(graphLabelName);
		graphLabel.appendChild(inputEnd);

		graph.appendChild(canvas);

		graphBox.appendChild(button);
		graphBox.appendChild(graph);
		graphBox.appendChild(graphLabel);

		//----------- END Create graphBox inner structure/content---------------

		// Insert as first child
		portfolio.insertBefore(graphBox, portfolio.firstChild);

		// Generate Graph with default dates
		generateChart(`myChart${stockName}`, stockName);

		// Check and change layout depended on amount of graphs
		changeGrid();

		// Clear input
		e.target.value = '';
	});

	// Initial check and change layout depended on amount of graphs
	changeGrid();
});
