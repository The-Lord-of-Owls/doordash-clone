export interface currencyInfo {
	id: string					//USD for example is our main currency
	mainCurrency?: boolean
	valueRatio: number			//how we convert from this currency to our main currency
	description: string			//description of what the currency is
}