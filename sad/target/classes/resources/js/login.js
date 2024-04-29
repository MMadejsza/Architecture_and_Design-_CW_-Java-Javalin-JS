document.addEventListener('DOMContentLoaded', function () {
	checkFromCookies();
	const checkbox = document.getElementById('registerInput');
	const registerForm = document.querySelector('.registerForm');
	// LOGIN
	try {
		checkbox.addEventListener('change', function () {
			if (checkbox.checked) {
				registerForm.classList.add('active');
			} else {
				registerForm.classList.remove('active');
			}
		});
	} catch (error) {}

	document.querySelector('.loginBtn').addEventListener('click', () => {
		let nameInput = document.querySelector('.login');
		let passwordInput = document.querySelector('.password');
		fetch(`/loginCredentials?name=${nameInput.value}&password=${passwordInput.value}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.authorized) {
					setCookie('logged', 'true', 1);
					setCookie('wallet', '3000', 0.1);

					checkFromCookies();
					nameInput.value = passwordInput.value = '';
					window.location.href = '/stocks';
				} else {
					setCookie('logged', 'false', 1);
					setCookie('defaultColor', '#ffa500', 1);
					setCookie('shadowColor1', 'rgba(255, 165, 0, 0.3)', 1);
					setCookie('shadowColor2', 'rgba(255, 165, 0, 0.22)', 1);
					checkFromCookies();
					nameInput.value = passwordInput.value = '';
				}
			});
	});
});
