// Log util logging to Javalin server
const logJavalin = (arr) => {
	arr.forEach((element) => {
		fetch(`/log?value=${element}`);
	});
};
// Util function to log out when button is all across pugs -> function accessed from 1 file
const logout = () => {
	setCookie('logged', 'false', 1);
	setCookie('defaultColor', '#ffa500', 1);
	setCookie('shadowColor1', 'rgba(255, 165, 0, 0.3)', 1);
	setCookie('shadowColor2', 'rgba(255, 165, 0, 0.22)', 1);
	setFromCookies('all');
};

// Util function for creating elements with possible multiple attributes
const createEl = (el, attributes) => {
	const element = document.createElement(el);
	// Attributes is objects with prop=value elements
	for (var key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
	return element;
};

// Function to set a cookie with expiry time (seen working in wallet element - very short)
function setCookie(name, value, days) {
	let expires = '';
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// Function to get a cookie value by name
function getCookie(name) {
	// Define name 'equation' '[name]=' which is typical format of storing cookie
	let nameEQ = name + '=';
	// Split all cookies as they're single string separated by semicolons
	let cookies = document.cookie.split(';');

	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		// Remove any leading whitespace from cookie
		while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1, cookie.length);
		}
		// When cookie at iteration is the desired one
		if (cookie.indexOf(nameEQ) == 0) {
			// Return value - substring from end of name till the end of cookie
			return cookie.substring(nameEQ.length, cookie.length);
		}
	}
	return null;
}

// Function to fetch and APPLY particular app setting stored in cookies
const setFromCookies = (specifier) => {
	const currentPage = document.documentElement;

	//@ COLORS SETTINGS------------------------------------------
	if (specifier == 'colors' || specifier == 'all') {
		// Get colors
		let defaultColor = getCookie('defaultColor');
		let shadowColor1 = getCookie('shadowColor1');
		let shadowColor2 = getCookie('shadowColor2');
		// Assign got colors
		currentPage.style.setProperty('--defaultColor', defaultColor);
		currentPage.style.setProperty('--shadowColor1', shadowColor1);
		currentPage.style.setProperty('--shadowColor2', shadowColor2);
	}

	//@ LOGIN STATUS SETTINGS--------------------------------------
	if (specifier == 'login' || specifier == 'all') {
		// Get login status
		let status = getCookie('logged');
		console.log('logged', status);

		// If logged in
		if (status == 'true') {
			// Show html elements with display: var(--loginStatus)
			currentPage.style.setProperty('--loginStatus', `block`);
		} else {
			// Hide them if not logged in
			currentPage.style.setProperty('--loginStatus', `none`);
		}
	}
	// Return default color value
	return getCookie('defaultColor');
};

// Function to fetch particularly wallet value stored in cookies
const getWalletValue = () => {
	let budget = getCookie('wallet');
	return budget;
};

// Function to fetch particularly user watchlist
const getWatchList = (target) => {
	// Get watchlist string (expecting array)
	const watchList = getCookie(target);
	if (watchList) {
		// Make it array object
		const watchListArray = watchList.split(',');
		return watchListArray;
	} else {
		// Return empty but array object instead of string
		return [];
	}
};

// Function to reapply wallet value from cookies to HTML
const refreshWallet = () => {
	let budget = getWalletValue();
	let wallet = document.querySelector('.walletValue');
	wallet.innerHTML = parseFloat(budget);
};

document.addEventListener('DOMContentLoaded', function () {
	setFromCookies('all');

	//@ COLOR PICKER -----------------------------------------------------------------
	// Catch color picker input
	const colorInput = document.querySelector('#inputColor');
	// Method getComputedStyle to get final computed value of the variable
	const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--defaultColor');
	// Set picker start value to indicate current setting
	colorInput.value = baseColor;

	try {
		// On every color pick/change, do:
		colorInput.addEventListener('input', (e) => {
			// Catch HTML element for shortcut
			const root = document.documentElement;
			// Catch picked color at this change
			let newColor = e.target.value;
			// Catch desired opacity from CSS
			let alpha1 = getComputedStyle(root).getPropertyValue('--shadowAlpha1');
			let alpha2 = getComputedStyle(root).getPropertyValue('--shadowAlpha2');

			// Set CSS variables for shadows with picked opacity
			const setOpacity = (alpha) =>
				`${newColor}${Math.floor(alpha * 255)
					.toString(16)
					.padStart(2, 0)}`;
			// Set new shadow colors
			setCookie('defaultColor', `${newColor}`, 1);
			setCookie('shadowColor1', `${setOpacity(alpha1)}`, 1);
			setCookie('shadowColor2', `${setOpacity(alpha2)}`, 1);
			setFromCookies('colors');
		});
	} catch (error) {}

	//@ LOG OUT -----------------------------------------------------------------
	const logoutBtn = document.querySelector('.logout');
	logoutBtn.addEventListener('click', () => {
		logout();
	});
});
