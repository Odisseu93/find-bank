import express from 'express'
const router = express.Router()

const getBankByCode = async (code) => {
	return (await fetch(`https://brasilapi.com.br/api/banks/v1/${code}`)).json()
}

router.get('/:code', (req, res) => {
	const { code } = req.params
	try {
		getBankByCode(code).then(data => { console.log(data); res.send(data) }).catch((err) => res.send(JSON.stringify(err, null, 2)))
	} catch (err) {
		console.error(err)
	}
	console.log(`Banco ${code}`)
})

export default router  