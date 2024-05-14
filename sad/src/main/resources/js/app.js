// Log util to Javalin
const logJavalin = (arr) => {
	arr.forEach((element) => {
		fetch(`/log?value=${element}`);
	});
};

// Util function for creating elements
const createEl = (el, attributes) => {
	const element = document.createElement(el);
	for (var key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
	return element;
};

// Function to set a cookie
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
	let nameEQ = name + '=';
	let cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1, cookie.length);
		}
		if (cookie.indexOf(nameEQ) == 0) {
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
		setCookie('logged', 'false', 1);
	});
});
