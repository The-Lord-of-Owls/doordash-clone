import { productInfo } from "./product-info"
import { storeSpecials } from "./store-specials"
import { currencyInfo } from "./currency-info"

export interface storeInfo {
	id: number
	name: string
	location: number
	opens?: number
	closes?: number
	alwaysOpen?: boolean
	specials?: Array<storeSpecials>
	acceptedCurrencies: Array<currencyInfo>
	products: Array<productInfo>
}