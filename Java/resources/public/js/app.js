document.addEventListener('DOMContentLoaded', function () {
	const checkbox = document.getElementById('registerInput');
	const registerForm = document.querySelector('.registerForm');

	const colorInput = document.querySelector('#inputColor');

	const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--defaultColor');
	console.log(baseColor);
	colorInput.value = baseColor;

	try {
		checkbox.addEventListener('change', function () {
			if (checkbox.checked) {
				registerForm.classList.add('active');
			} else {
				registerForm.classList.remove('active');
			}
		});
	} catch (error) {}

	try {
		colorInput.addEventListener('input', (e) => {
			// make shortcut for html element
			const root = document.documentElement;
			// catch picked color
			let newColor = e.target.value;

			// substitute css variable with picked color
			root.style.setProperty('--defaultColor', `${newColor}`);

			// catch desired opacity from css
			let alpha1 = getComputedStyle(root).getPropertyValue('--shadowAlpha1');
			let alpha2 = getComputedStyle(root).getPropertyValue('--shadowAlpha2');
			// substitute css variable for shadows with picked opacity
			const setOpacity = (alpha) =>
				`${newColor}${Math.floor(alpha * 255)
					.toString(16)
					.padStart(2, 0)}`;
			// set new shadow colors
			root.style.setProperty('--shadowColor1', `${setOpacity(alpha1)}`);
			root.style.setProperty('--shadowColor2', `${setOpacity(alpha2)}`);
		});
	} catch (error) {}
});
