import express from 'express'
const router = express.Router()

const getAllBanks = async () => {
	return (await fetch('https://brasilapi.com.br/api/banks/v1')).json()
}

router.get('/', async (req, res) => {
	try {
		getAllBanks().then(data => { console.log(data); res.send(data) }).catch((err) => res.send(JSON.stringify(err, null, 2)))
	} catch (err) {
		console.error(err)
	}
})

export default router