document.addEventListener('DOMContentLoaded', function () {
	const checkbox = document.getElementById('registerInput');
	const registerForm = document.querySelector('.registerForm');
	const deleteBtns = document.querySelectorAll('.delete');
	console.log('btns', deleteBtns);

	checkbox.addEventListener('change', function () {
		if (checkbox.checked) {
			registerForm.classList.add('active');
		} else {
			registerForm.classList.remove('active');
		}
	});
});
