export const apiGetBankByCode = async (code) => {
	try {
		const res = await fetch(`/bank/api/${code}`)
		const data = await res.json()

		if (!data) throw Error('no bank found')

		return data
	} catch (err) {
		throw new (Error(err).message)
	}
}