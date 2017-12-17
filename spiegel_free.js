function decrypt(text) {
	var decrypted = '';

	for (var i = 0; i < text.length; i++) {
		var c = text.charCodeAt(i);
		if (c > 32) {
			decrypted += String.fromCharCode(c - 1);
		} else {
			decrypted += String.fromCharCode(c);
		}
	}

	return decrypted;
}

function hideOverlay() {
	console.log( document.querySelector('#laterpay-replacement').nextSibling.nextSibling.firstChild);
	var overlaySiblings = document.querySelector('#laterpay-replacement').nextSibling.nextSibling.firstChild.childNodes;
	for (var i = 0; i < overlaySiblings.length; i++) {
		console.log(overlaySiblings[i].firstChild.nodeName);
		if (overlaySiblings[i].firstChild && overlaySiblings[i].firstChild.nodeName === 'DIV') {
			if (overlaySiblings[i].firstChild.className.indexOf('obfuscated-content') < 0) {
				overlaySiblings[i].parentNode.removeChild(overlaySiblings[i]);
				i--;
			} else {
				overlaySiblings[i].className = '';
			}
		}
	}
}

function removePaymentText() {
	var intro = document.querySelector('.js-spiegelplus-obfuscated-intro');
	if (intro) {
		intro.parentNode.removeChild(intro);
	}
}

function makeSpiegelFreeAgain() {
	var obfuscatedElements = document.getElementsByClassName('obfuscated');
	for (var i = 0; i < obfuscatedElements.length; i++) {
		var childs = obfuscatedElements[i].childNodes;
		for (var j = 0; j < childs.length; j++) {
			if (childs[j].nodeType === 3) {
				childs[j].nodeValue = decrypt(childs[j].nodeValue);
			} else {
				// As far as I see there can just be <b> elements beside text nodes here.
				childs[j].innerText = decrypt(childs[j].innerText);
			}
		}
	}
}

window.addEventListener("load", function() {
	hideOverlay();
	removePaymentText();
	
	makeSpiegelFreeAgain();
});