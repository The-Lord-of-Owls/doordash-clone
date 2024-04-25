import { productInfo } from "./product-info"

export interface orderDetails {
	items: Array<productInfo>
	subTotal: number
	currency: string
	deliveryAddress: string
	generatedHTML?: string
}