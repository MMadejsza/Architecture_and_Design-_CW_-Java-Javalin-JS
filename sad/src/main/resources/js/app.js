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
	checkFromCookies();
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

const checkFromCookies = () => {
	const currentPage = document.documentElement;

	// COLORS SETTINGS
	let defaultColor = getCookie('defaultColor');
	let shadowColor1 = getCookie('shadowColor1');
	let shadowColor2 = getCookie('shadowColor2');
	currentPage.style.setProperty('--defaultColor', defaultColor);
	currentPage.style.setProperty('--shadowColor1', shadowColor1);
	currentPage.style.setProperty('--shadowColor2', shadowColor2);

	// LOGIN STATUS SETTINGS
	let status = getCookie('logged');
	console.log('logged', status);
	if (status == 'true') {
		// document.querySelector('.stocksElement').style.display = 'block';
		currentPage.style.setProperty('--loginStatus', `block`);
	} else {
		// 	document.querySelector('.stocksElement').style.display = 'none';
		currentPage.style.setProperty('--loginStatus', `none`);
	}

	return getCookie('defaultColor');
};

const getWalletValue = () => {
	let budget = getCookie('wallet');
	return budget;
};

const refreshWallet = () => {
	let budget = getWalletValue();
	let wallet = document.querySelector('.walletValue');
	wallet.innerHTML = parseFloat(budget);
};

const getCookiesArray = (target) => {
	const watchList = getCookie(target);
	if (watchList) {
		const watchListArray = watchList.split(',');
		return watchListArray;
	} else {
		return [];
	}
};

document.addEventListener('DOMContentLoaded', function () {
	checkFromCookies();

	// COLOR PICKER
	const colorInput = document.querySelector('#inputColor');
	const logoutBtn = document.querySelector('.logout');
	const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--defaultColor');
	colorInput.value = baseColor;
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
			setCookie('defaultColor', `${newColor}`, 1);
			setCookie('shadowColor1', `${setOpacity(alpha1)}`, 1);
			setCookie('shadowColor2', `${setOpacity(alpha2)}`, 1);
		});
	} catch (error) {}

	// LOG OUT
	logoutBtn.addEventListener('click', () => {
		logout();
	});
});
