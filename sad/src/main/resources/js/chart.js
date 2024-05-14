// Create class to model and maintain fetched CDN chart service
class MyChart {
	// Define all needed later class props in constructor (as public)
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
		this.dataset;
		this.currentPrice;
		this.chartsToCompare = [];
		this.initializeData();
	}
	// Main method to fetch stock data
	fetchChartData = async (name) => {
		// Wait to resolve the promise
		const response = await fetch(`/fetchedStocks?name=${name}`);
		const data = await response.json();
		// Pull out from JSON
		const chartValues = data.chart.result[0].indicators.quote[0].open;
		// Change to readable format
		const chartDates = data.chart.result[0].timestamp.map((stamp) => {
			// To milliseconds
			const dateObject = new Date(stamp * 1000);
			// Leading 0 but max 2 digits
			const day = ('0' + dateObject.getDate()).slice(-2);
			// Month starts from 0
			const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
			const year = dateObject.getFullYear();

			return `${year}-${month}-${day}`;
		});
		return {dates: chartDates, values: chartValues};
	};

	// Main method to create chart on given in class props
	produceChartBody = () => {
		// CDN structure
		this.chartBody = new Chart(this.ctx, {
			// Chart type
			type: 'line',
			data: {
				// Chart dates (X axis)
				labels: this.chartDatesFiltered,
				// Chart values for drawing a single line (may be multiple)
				datasets: [
					{
						label: this.name,
						data: this.chartValuesFiltered,
						fill: false,
						// Color specified in constructor which at main call reflects HTML 'baseColor'
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
		// Assign to class for later reference and alterations
		this.dataset = this.chartBody.data.dataset;
	};

	// Util method altering dates and updating class
	filterData = (
		type,
		startDate,
		endDate,
		chartDates = this.chartDates,
		chartValues = this.chartValues,
	) => {
		// Assign to class updated filtered dates
		const chartDatesFiltered = chartDates.filter((stamp) => {
			const startDateObject = new Date(startDate);
			const endDateObject = new Date(endDate);
			const currentDate = new Date(stamp);
			return startDateObject <= currentDate && currentDate <= endDateObject;
		});

		//@ We are setting starting index in values the same like filtered index in dates - when values match dates - we look for first filtered date in the old array and filter from there the values array
		// so with this logic we assume that stock data sampling frequency is the same like the one of compared stock during comparison
		const newStartDateValue = chartDatesFiltered[0];
		const newEndDateValue = chartDatesFiltered[chartDatesFiltered.length - 1];
		const valueStartIndex = chartDates.indexOf(newStartDateValue);
		const valueEndIndex = chartDates.indexOf(newEndDateValue);

		const chartValuesFiltered = chartValues.slice(valueStartIndex, valueEndIndex);

		// If method is used to for main class later on
		if (type == 'main') {
			this.chartDatesFiltered = chartDatesFiltered;
			this.chartValuesFiltered = chartValuesFiltered;
			// If method is used to for compared stock class later on
		} else {
			return {fdates: chartDatesFiltered, fvalues: chartValuesFiltered};
		}
	};

	// Method altering dates and updating class (based on user dates input)
	alterGraphDates = async (newStartDate = this.startDate, newEndDate = this.endDate) => {
		// console.log(`newStartDate ${newStartDate}, newEndDate ${newEndDate}`);

		// Util function to update chart body
		const updateRange = (target) => {
			// Update main class dataset
			target.filterData('main', newStartDate, newEndDate, undefined, undefined);
			// Update main chart body based on that dataset
			target.chartBody.data.labels = target.chartDatesFiltered;
			target.chartBody.data.datasets[0].data = target.chartValuesFiltered;
			target.chartBody.update();
		};

		// Use for main class
		updateRange(this);

		// Update all charts from main container to compare
		this.chartsToCompare.forEach((chart) => {
			updateRange(chart);
		});

		// Wait for promises to resolve and reassemble the datasets
		setTimeout(() => {
			// Delete old extra datasets
			this.chartBody.data.datasets.splice(1);
			// Recreate them already altered
			this.chartsToCompare.forEach((chart) =>
				this.chartBody.data.datasets.push(chart.getDataset()),
			);
			this.chartBody.update();
		}, 500);
	};

	// Function to compare this stock with other given into parameter
	compareChartWith = async (stockNameToCompare) => {
		// Instantiate chart for given stock
		const newChart = new MyChart('', stockNameToCompare);
		// Set it's color to red for differentiation
		newChart.baseColor = '#ff0000';
		// Push instance to MAIN class container designed for it
		this.chartsToCompare.push(newChart);

		// Wait with updating MAIN chart with new datasets from compared ones, to let them be fetched from instantiation which is asynchronous
		setTimeout(() => {
			this.chartBody.data.datasets.push({
				label: newChart.name,
				data: newChart.chartValuesFiltered,
				fill: false,
				borderColor: newChart.baseColor,
				tension: 0.1,
			});
			// Call CDN chart update to reflect changes in MAIN chart
			this.chartBody.update();
		}, 500);
	};

	// Assume starting dates 2 years back from now and apply them
	initializeStartEndDates = () => {
		// Create a new Date object representing the current date
		const currentDate = new Date();
		this.endDate = currentDate.toISOString().slice(0, 10);

		// Set the date two years from now
		const dateTwoYearsBefore = new Date(currentDate);
		dateTwoYearsBefore.setFullYear(currentDate.getFullYear() - 2);

		// Format the date components into a human-readable string
		this.startDate = dateTwoYearsBefore.toISOString().slice(0, 10);
	};

	// Initialize the props after when instantiating a class
	initializeData = async () => {
		const {dates, values} = await this.fetchChartData(this.name);
		this.chartDates = dates;
		this.chartValues = values;
		this.initializeStartEndDates();
		this.filterData('main', this.startDate, this.endDate, this.chartDates, this.chartValues);
		this.produceChartBody();
		this.currentPrice = values[values.length - 1]
			? values[values.length - 1]
			: values[values.length - 2];
		console.log(`this.currentPrice(${this.name}) ${this.currentPrice}`);
	};

	// Even if all props in js by default are public - I decided to make 1 getter for now for readability later on in the code
	getDataset = () => {
		return this.dataset;
	};
}
