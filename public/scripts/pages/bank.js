/* eslint-disable no-undef */
import { H1 } from '../components/index.js'

import { apiGetBankByCode } from '../services/getBankByCode.js'

import updateElement from '../helpers/updateRootHTML.js'

const bankCode = location.href.split('/').pop()

const title = document.createElement('title')

document.head.appendChild(title)

const root = document.querySelector('#root')

apiGetBankByCode(bankCode).then(({ ispb, name, code, fullName }) => {
	title.textContent = `Banco ${name}`

	updateElement(
		root,
		[
			H1(name),
			`<article class="bank">
        <h3 class="bank__fullname">${fullName}</h3>
        <p>Código: <span class="bank__code">${code}</span></p>
        <p>ISPB: <span  class="bank__ispb">${ispb}</span>
					<br/><small>(Identificador de Sistema de Pagamentos Brasileiro)</small>
				</p>
      </article>
      `,
			'<button class="back-button"><a href="/" title="Voltar para a página inicial">Voltar</a></button>',
		].join('\n')
	)
})
