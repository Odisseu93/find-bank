import express from 'express'

import { fileURLToPath } from 'url'
import path, {dirname } from 'node:path'

import bank from './banks/index.js'
import apiGetAllBanks from './banks/services/getAllBanks.js'
import apiGetBankByCode from './banks/services/getBankByCode.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const router = express.Router()

const port = 5000

const basePath = path.join(__dirname, 'templates')

app.use(express.static(`${__dirname}/../public`))

app.use(
	express.urlencoded({
		extended: true,
	})
)

app.use(express.json())

const root = router.get('', (req, res) => {
	res.sendFile(`${basePath}/index.html`)
})

app.use('/bank/api', apiGetAllBanks)

app.use('/bank/api', apiGetBankByCode)

app.use('/bank', bank)

app.use('/', root)

app.listen(port, () => console.log(`server is running on port ${port}`))