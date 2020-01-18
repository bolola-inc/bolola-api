/**
 * Utils
 **/

function cloneObject (obj) {
	let copy = {};

	if (typeof obj !== "object") return obj;

	for (let e in obj) {
		copy[e] = typeof obj[e] === "object" ? cloneObject(obj[e]) : obj[e];
	}

	return copy;
}

module.exports = {
	cloneObject: cloneObject
}