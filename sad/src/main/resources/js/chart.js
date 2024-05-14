// Create class to model and maintain fetched CDN chart service
class MyChart {
	// Define all needed later class props
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

		const chartValuesFiltered = chartValues.slice(valueStartIndex, valueEndIndex);

		if (type == 'main') {
			this.chartDatesFiltered = chartDatesFiltered;
			this.chartValuesFiltered = chartValuesFiltered;
		} else {
			return {fdates: chartDatesFiltered, fvalues: chartValuesFiltered};
		}
	};

	compareChartWith = async (stockNameToCompare) => {
		const newChart = new MyChart('', stockNameToCompare);
		newChart.baseColor = '#ff0000';
		this.chartsToCompare.push(newChart);
		setTimeout(() => {
			this.chartBody.data.datasets.push({
				label: newChart.name,
				data: newChart.chartValuesFiltered,
				fill: false,
				borderColor: newChart.baseColor,
				tension: 0.1,
			});
			this.chartBody.update();
		}, 500);
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
		this.dataset = this.chartBody.data.dataset;
	};

	alterGraphDates = async (newStartDate = this.startDate, newEndDate = this.endDate) => {
		console.log(`newStartDate ${newStartDate}, newEndDate ${newEndDate}`);

		// Update main chart dataset and all to compare
		this.filterData('main', newStartDate, newEndDate, undefined, undefined);
		this.chartBody.data.labels = this.chartDatesFiltered;
		this.chartBody.data.datasets[0].data = this.chartValuesFiltered;
		this.chartBody.update();
		this.chartsToCompare.forEach((chart) => {
			chart.filterData('main', newStartDate, newEndDate);
			chart.chartBody.data.labels = chart.chartDatesFiltered;
			chart.chartBody.data.datasets[0].data = chart.chartValuesFiltered;
			chart.chartBody.update();
		});

		setTimeout(() => {
			this.chartBody.data.datasets.splice(1);
			this.chartsToCompare.forEach((chart) =>
				this.chartBody.data.datasets.push(chart.getDataset()),
			);
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
