const express = require('express')
const app = express()

const port = 5000

const path = require('node:path')

const basePath = path.join(__dirname, 'templates')

app.use(express.static(`${__dirname}/../public`))

app.use(
	express.urlencoded({
		extended: true,
	})
)

app.use(express.json())


const apiGetAllBanks = require('./banks/services/getAllBanks')
app.use('/bank/api', apiGetAllBanks)

const apiGetBankByCode = require('./banks/services/getBankByCode')
app.use('/bank/api', apiGetBankByCode)

const bank = require('./banks')
app.use('/bank', bank)

app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => console.log(`server is running on port ${port}`))