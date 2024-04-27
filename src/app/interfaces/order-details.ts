import { productInfo } from "./product-info"

export interface orderDetails {
	id: string
	items: Array<productInfo>
	subTotal: number
	currency: string
	deliveryAddress: string
	generatedHTML?: string
}


