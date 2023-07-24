import { isHTML } from './Validation.js'

const updateElement = (element, html) => {
	if (!isHTML(html)) {
		throw new Error(`invalid HTML!
        '${html}'`)
	}

	html = html
		.replace(/<script>[/s/S]*?<\/script>/, '')


	element.innerHTML = html
}

export default updateElement