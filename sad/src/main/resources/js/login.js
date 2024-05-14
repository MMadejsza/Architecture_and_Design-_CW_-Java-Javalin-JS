const login = (nameInput, passwordInput) => {
	setCookie('logged', 'true', 1);
	setCookie('wallet', '3000', 0.1);
	setCookie('portfolio', `[{"name": "AAPL", "amount": 200},{"name": "TSLA", "amount": 300}]`, 1);

	checkFromCookies();
	nameInput.value = passwordInput.value = '';
	window.location.href = '/stocks';
};

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

		let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!nameInput || !passwordInput) {
			alert('Please fill up the registration form.');
		} else if (!emailRegex.test(nameInput.value)) {
			// Handle invalid email format
			alert('Please enter a valid email address with "@" and domain. (Login)');
			return;
		} else {
			fetch(`/loginCredentialsCheck?name=${nameInput.value}&password=${passwordInput.value}`)
				.then((response) => response.json())
				.then((data) => {
					if (data.authorized) {
						login(nameInput, passwordInput);
					} else {
						logout();
					}
				});
		}
	});

	// REGISTER LISTENER
	document.querySelector('.loginBtn[name="register"]').addEventListener('click', () => {
		let nameInput = document.querySelector('.login[name="register"]');
		let passwordInput = document.querySelector('.password[name="register"]');

		let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!nameInput.value || !passwordInput.value) {
			alert('Please fill up the registration form.');
		} else if (!emailRegex.test(nameInput.value)) {
			// Handle invalid email format
			alert('Please enter a valid email address with "@" and domain. (Registration)');
			return;
		} else {
			// Construct the request body
			let requestBody = {
				name: nameInput.value,
				password: passwordInput.value,
			};

			fetch(`/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			})
				.then((response) => response.json())
				.then((confirmation) => {
					if (confirmation.status == 1) {
						nameInput.value = '';
						passwordInput.value = '';
						alert(confirmation.msg);
						window.location.href = window.location.href;
					} else {
						alert(confirmation.msg);
					}
				});
		}
	});
});
