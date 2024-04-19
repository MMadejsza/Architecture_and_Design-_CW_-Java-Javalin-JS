document.addEventListener('DOMContentLoaded', function () {
	const checkbox = document.getElementById('registerInput');
	const registerForm = document.querySelector('.registerForm');

	checkbox.addEventListener('change', function () {
		if (checkbox.checked) {
			registerForm.classList.add('active');
		} else {
			registerForm.classList.remove('active');
		}
	});
});
