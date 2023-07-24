const express = require('express')
const router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.use(express.static('public'))

router.get('/:code', (req, res) => {
	const { code } = req.params
	console.log(`exibindo página para o banco de código: ${code}`)
	res.sendFile(`${basePath}/bank.html`)
})

module.exports = router
