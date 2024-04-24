document.addEventListener('DOMContentLoaded', function () {
	// Catch "Global" elements
	const portfolio = document.querySelector('.contentBox');
	const addInput = document.querySelector('.addInput');

	// CHART generator util
	const generateChart = (name, startDate = '2022-02-01', endDate = '2024-12-01') => {
		// Catch defaultColor
		const baseColor = getComputedStyle(document.documentElement).getPropertyValue(
			'--defaultColor',
		);
		// Catch container
		const ctx = document.getElementById('myChart');
		// Destroy existing chart if it exists
		const existingChart = Chart.getChart('myChart');
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
								data: [
									...values.close,
									...values.high,
									...values.low,
									...values.open,
								], // Use fetched data here
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

	// DELETE BTNS
	const serveDeleteBtns = () => {
		// fetch buttons
		const deleteBtns = document.querySelectorAll('.delete');

		// add listener
		[...deleteBtns].forEach((deleteBtn) =>
			deleteBtn.addEventListener('click', (e) => {
				const parentGraphBox = deleteBtn.closest('.graphBox');
				parentGraphBox.remove();
			}),
		);
	};

	// DATE INPUTS
	const serveDateInputs = () => {
		// catch all date inputs
		const dateInputs = document.querySelectorAll("input[type='date']");

		// loop over adding listener depending on edge date
		[...dateInputs].forEach((input) => {
			const chartLabelEl = input.closest('.graph-label');
			const chartName = chartLabelEl.querySelector('h2').textContent;

			if (input.className == 'startDateInput') {
				input.addEventListener('input', (e) => {
					const otherInputVal = chartLabelEl.querySelector('.endDateInput').value;
					generateChart(
						chartName,
						e.target.value,
						otherInputVal ? otherInputVal : undefined,
					);
				});
			} else if (input.className == 'endDateInput') {
				input.addEventListener('input', (e) => {
					const otherInputVal = chartLabelEl.querySelector('.startDateInput').value;
					generateChart(
						chartName,
						otherInputVal ? otherInputVal : undefined,
						e.target.value,
					);
				});
			}
		});
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

	// RELINKING ON CONTENT CHANGE
	const linkActions = () => {
		changeGrid();
		serveDeleteBtns();
		serveDateInputs();
	};

	// ADD COMPANY
	addInput.addEventListener('change', (e) => {
		// Create graphBox element
		const graphBox = document.createElement('div');
		// Add matching in css class
		graphBox.setAttribute('class', 'graphBox');

		// Create graphBox inner structure/content
		graphBox.innerHTML = `<button class="delete">X</button>
		<div class="graph">
			<canvas id="myChart" width="100%">
			</div>
		<div class="graph-label">
			<input class = "startDateInput" type="date" />
			<h2 class = "graph-label-name">${e.target.value}</h2>
			<input class = "endDateInput" type="date" />
		</div>`;

		// Insert as first child
		portfolio.insertBefore(graphBox, portfolio.firstChild);

		// Generate Initial Graph
		generateChart(e.target.value);

		// Linking all buttons and inputs
		linkActions();

		// Clear input
		e.target.value = '';
	});

	// Initial linking on loaded initial content
	linkActions();
});
