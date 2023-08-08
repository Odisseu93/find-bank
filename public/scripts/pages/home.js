/* eslint-disable no-undef */
import { Loading, H1, Form, SearchInput, Ul, Li, ButtonSubmit, PrevButton, NextButton } from '../components/index.js'

import updateElement from '../helpers/updateRootHTML.js'

import { apiGetllAllBanks } from '../services/getllAllBanks.js'

import { ss } from '../utils/sessionStorage.js'
import { haveDataInSessionStorage } from '../helpers/Validation.js'
import usefilter from '../helpers/filter.js'

// eslint-disable-next-line no-undef
const root = document.querySelector('#root')

let filter = ''

const totalItemsPerPage = 20
let currentPage = 1


updateElement(
	root,
	[
		H1('Find bank - encontre informações do seu banco!'),
		Form(
			[
				SearchInput(),
				ButtonSubmit('Procurar Banco'),
			].join('\n')
		),
		Ul(Loading()),
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
		const FilteredBanks = usefilter(data, filter)

		const totalPages = Math.ceil(FilteredBanks.length / totalItemsPerPage)
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

		const content = FilteredBanks
			.filter((bank) => bank.name && bank.code)
			.slice(start, end)
			.map(
				(bank) =>
					bank.code && bank.name && Li({ id: bank.code, texContet: `<a href="bank/${bank.code}" >${bank.name}</a>` })
			)
			.join('\n')
		updateElement(ul, content)
	}
}

getAllBanks()

document.querySelector('#formBank').onsubmit = e => {
	e.preventDefault()

	filter = e.target.querySelector('#search').value

	BankList()
}

document.querySelector('#search').oninput = e => {
	if (e.target.value === '') filter = ''
	
	BankList()
}

document.querySelector('#nextButton').onclick = () => {
	currentPage++
	BankList()
}

document.querySelector('#prevButton').onclick = () => {
	currentPage > 1 ? currentPage-- : 1
	BankList()
}
