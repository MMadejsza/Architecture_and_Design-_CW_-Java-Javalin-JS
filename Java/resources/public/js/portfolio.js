document.addEventListener('DOMContentLoaded', function () {
	const portfolio = document.querySelector('.contentBox');
	const addInput = document.querySelector('.addInput');

	const linkActions = () => {
		const deleteBtns = document.querySelectorAll('.delete');

		[...deleteBtns].forEach((deleteBtn) =>
			deleteBtn.addEventListener('click', (e) => {
				const parentGraphBox = deleteBtn.closest('.graphBox');
				parentGraphBox.remove();
			}),
		);
	};

	linkActions();

	addInput.addEventListener('change', (e) => {
		console.log(e.target.value);
		const graphBox = document.createElement('div');
		graphBox.setAttribute('class', 'graphBox');
		graphBox.innerHTML = `<button class="delete">X</button>
		<div class="graph"></div>
		<div class="graph-label">
			<input type="date" />
			<h2>${e.target.value}</h2>
			<input type="date" />
		</div>`;

		// portfolio.appendChild(graphBox);
		portfolio.insertBefore(graphBox, portfolio.firstChild);
		linkActions();

		e.target.value = '';
	});
});
