document.addEventListener('DOMContentLoaded', function () {
	const checkbox = document.getElementById('registerInput');
	const registerForm = document.querySelector('.registerForm');

	const colorInput = document.querySelector('#inputColor');

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
			console.log(e.target.value);
		});
	} catch (error) {}
});
