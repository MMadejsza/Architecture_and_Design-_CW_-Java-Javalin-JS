document.addEventListener('DOMContentLoaded', function () {
	checkFromCookies();
	const checkbox = document.getElementById('registerInput');
	const registerForm = document.querySelector('.registerForm');
	const loginBtn = document.querySelector('.loginBtn[name="login"]');
	const registerBtn = document.querySelector('.loginBtn[name="register"]');
	// LOGIN
	try {
		checkbox.addEventListener('change', function () {
			if (checkbox.checked) {
				registerForm.classList.add('active');
				loginBtn.classList.toggle('hideBtn');
				registerBtn.classList.toggle('hideBtn');
			} else {
				registerForm.classList.remove('active');
				registerBtn.classList.toggle('hideBtn');
				loginBtn.classList.toggle('hideBtn');
			}
		});
	} catch (error) {}

	// LOGIN LISTENER
	document.querySelector('.loginBtn[name="login"]').addEventListener('click', () => {
		let nameInput = document.querySelector('.login');
		let passwordInput = document.querySelector('.password');
		fetch(`/loginCredentialsCheck?name=${nameInput.value}&password=${passwordInput.value}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.authorized) {
					setCookie('logged', 'true', 1);
					setCookie('wallet', '3000', 0.1);
					setCookie(
						'portfolio',
						`[{"name": "AAPL", "amount": 200},{"name": "TSLA", "amount": 300}]`,
						1,
					);

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

	// REGISTER LISTENER
	document.querySelector('.loginBtn[name="register"]').addEventListener('click', () => {
		let nameInput = document.querySelector('.login[name="register"]').value;
		let passwordInput = document.querySelector('.password[name="register"]').value;

		let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(nameInput)) {
			// Handle invalid email format
			alert('Please enter a valid email address.');
			return;
		} else {
			// Construct the request body
			let requestBody = {
				name: nameInput,
				password: passwordInput,
			};

			fetch(`/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			window.location.href = window.location.href;
		}
	});
});
