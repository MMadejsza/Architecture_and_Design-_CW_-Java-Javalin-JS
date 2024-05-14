// Util function to log in
const login = (nameInput, passwordInput) => {
	// Set demo data
	setCookie('logged', 'true', 1);
	setCookie('wallet', '3000', 0.1);
	setCookie('portfolio', `[{"name": "AAPL", "amount": 200},{"name": "TSLA", "amount": 300}]`, 1);

	// Apply start data
	applyFromCookies('all');
	// Clear input
	nameInput.value = passwordInput.value = '';
	// Get straight to apps core -> stocks
	window.location.href = '/stocks';
};

// Define validation rule in regex for emails -> must be @, '.', and cannot be double quotes
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Util function do perform 'submit' on given inputs
const submitAction = (emailInput, passwordInput) => {
	// If empty form submitted
	if (!emailInput || !passwordInput) {
		alert('Please fill up the registration form.');
	} else if (!emailRegex.test(emailInput.value)) {
		// Handle invalid email format
		alert('Please enter a valid email address with "@" and domain.');
		return;
	} else {
		// If successes
		// Call backend to validate user credentials
		fetch(`/loginCredentialsCheck?name=${emailInput.value}&password=${passwordInput.value}`)
			.then((response) => response.json())
			.then((data) => {
				// Return JSON with 'authorized' boolean
				if (data.authorized) {
					login(emailInput, passwordInput);
				} else {
					logout();
				}
			});
	}
};

document.addEventListener('DOMContentLoaded', function () {
	applyFromCookies('all');

	//@ LOGIN LISTENER ---------------------------------------------------------------------
	// Catch desired elements
	const loginBtn = document.querySelector('.loginBtn[name="login"]');

	loginBtn.addEventListener('click', () => {
		// Catch desired LOGIN form elements
		let nameInput = document.querySelector('.login');
		let passwordInput = document.querySelector('.password');

		submitAction(nameInput, passwordInput);
	});

	//@ CHECKBOX ---------------------------------------------------------------------
	// Catch desired elements
	const checkbox = document.getElementById('registerInput');
	const registerForm = document.querySelector('.registerForm');

	// Util function to short actions notation
	const toggleForms = () => {
		registerForm.classList.toggle('active');
		registerBtn.classList.toggle('hideBtn');
		loginBtn.classList.toggle('hideBtn');
	};

	try {
		checkbox.addEventListener('change', function () {
			if (checkbox.checked) {
				// Register checked? -> show register button
				toggleForms();
			} else {
				// Checkbox left default? -> keep showing / show login button
				toggleForms();
			}
		});
	} catch (error) {
		alert('Error at forms toggling.');
	}

	//@ REGISTER LISTENER -------------------------------------------------------
	// Catch desired elements
	const registerBtn = document.querySelector('.loginBtn[name="register"]');

	registerBtn.addEventListener('click', () => {
		// Catch desired REGISTER form elements
		let nameInput = document.querySelector('.login[name="register"]');
		let passwordInput = document.querySelector('.password[name="register"]');

		submitAction(nameInput, passwordInput);
	});
});
