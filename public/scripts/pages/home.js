/* eslint-disable no-undef */
import { H1, Ul, Li, PrevButton, NextButton } from '../components/index.js'

import updateElement from '../helpers/updateRootHTML.js'

import { apiGetllAllBanks } from '../services/getllAllBanks.js'
import { ss } from '../utils/sessionStorage.js'
import { haveDataInSessionStorage } from '../helpers/Validation.js'

// eslint-disable-next-line no-undef
const root = document.querySelector('#root')

const totalItemsPerPage = 20
let currentPage = 1


updateElement(
	root,
	[
		H1('Find bank - encontre informações do seu banco!'),
		Ul('<div></div>'),
		`<div class="pagination-container" id="pagination">
			${PrevButton()}
			${NextButton()}
		</div>`
		,
	].join('\n')
)

const ul = root.querySelector('ul.bank-list')

const getAllBanks = () =>
	apiGetllAllBanks().then((banks) => {
		if (banks.length > 0) ss.set('bankListJson', banks)

		BankList()
	})

const BankList = () => {
	if (haveDataInSessionStorage('bankListJson')) {
		const data = ss.get('bankListJson')

		const totalPages = Math.ceil(data.length / totalItemsPerPage)
		const start = currentPage > 1 ? (currentPage - 1) * totalItemsPerPage : 0
		const end = start + totalItemsPerPage

		document.querySelector('#prevButton').title =
			currentPage > 1
				? `Voltar para a página ${currentPage - 1}`
				: 'Você está na primeira página.'

		document.querySelector('#nextButton').title =
			currentPage < totalPages
				? `Ir para a página ${currentPage + 1}`
				: 'Você está na última página.'

		const content = data
			.filter((bank) => bank.name && bank.code)
			.slice(start, end)
			.map(
				(bank) =>
					bank.code && bank.name && Li({ id: bank.code, texContet: `<a href="bank/${bank.code}" >${bank.name}</a>` })
			)
			.join('\n')
		console.log(content)
		updateElement(ul, content)
	}
}

getAllBanks()

document.querySelector('#nextButton').onclick = () => {
	BankList(currentPage++)
}

document.querySelector('#prevButton').onclick = () => {
	BankList(currentPage > 1 ? currentPage-- : 1)
}
