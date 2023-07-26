Array.prototype.genericArrayFilter = function (callback) {
	const filtered = []

	for (const item of this) {
		if (callback(item)) filtered.push(item)
	}

	return filtered
}

const usefilter = (array, input) => array.genericArrayFilter(item => {

	String.prototype.stringFilter = function (input) {
		return this.toLowerCase().includes(input)
	}

	if (typeof input === 'string') return Object.values(item)
		.some(value => String(value).stringFilter(input))

	if (typeof input === 'number') return Object.values(item)
		.some(value => value.numberFilter(input))
})

export default usefilter