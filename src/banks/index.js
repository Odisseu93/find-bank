import express from 'express'

import { fileURLToPath } from 'url'
import path, { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()



const basePath = path.join(__dirname, '../templates')

router.use(express.static('public'))

router.get('/:code', (req, res) => {
	const { code } = req.params
	console.log(`exibindo página para o banco de código: ${code}`)
	res.sendFile(`${basePath}/bank.html`)
})

export default router
