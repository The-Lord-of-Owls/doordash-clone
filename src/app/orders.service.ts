import { Injectable } from '@angular/core'
import { orderDetails } from './interfaces/order-details'

@Injectable( {
	providedIn: 'root'
} )

export class OrdersService {
	orderList: Array<orderDetails> = [	//Get these from backend later
		{
			id: "1",
			items: [],
			subTotal: 0,
			currency: "USD",
			deliveryAddress: "1234 Pizza St, Dallas TX"
		},
		{
			id: "2",
			items: [],
			subTotal: 0,
			currency: "USD",
			deliveryAddress: "1234 Pizza St, Dallas TX"
		},
		{
			id: "3",
			items: [],
			subTotal: 0,
			currency: "USD",
			deliveryAddress: "1234 Pizza St, Dallas TX"
		},
		{
			id: "4",
			items: [],
			subTotal: 0,
			currency: "USD",
			deliveryAddress: "1234 Pizza St, Dallas TX"
		},
		{
			id: "5",
			items: [],
			subTotal: 0,
			currency: "USD",
			deliveryAddress: "1234 Pizza St, Dallas TX"
		},
		{
			id: "6",
			items: [],
			subTotal: 0,
			currency: "USD",
			deliveryAddress: "1234 Pizza St, Dallas TX"
		},
		{
			id: "7",
			items: [],
			subTotal: 0,
			currency: "USD",
			deliveryAddress: "1234 Pizza St, Dallas TX"
		},
		{
			id: "8",
			items: [],
			subTotal: 0,
			currency: "USD",
			deliveryAddress: "1234 Pizza St, Dallas TX"
		},
		{
			id: "9",
			items: [],
			subTotal: 0,
			currency: "USD",
			deliveryAddress: "1234 Pizza St, Dallas TX"
		},
		{
			id: "10",
			items: [],
			subTotal: 0,
			currency: "USD",
			deliveryAddress: "1234 Pizza St, Dallas TX"
		}
	]

	constructor() {}

	getOrderCount() {
		return this.orderList.length
	}

	//Includes pagination with default parameters
	getOrderList( pageNumber: number = 1, pageSize: number = 10 ): Array<orderDetails> {
		if ( this.orderList.length === 0 ) return []
		if ( this.orderList.length <= pageSize ) return this.orderList

		const orders: Array<orderDetails> = []
		const skip = pageSize * ( pageNumber - 1 )

		//redo this forloop
		for ( let i = skip; i <= this.getOrderList.length; i++) {
			orders.push( this.orderList[ i ] )
		}

		return orders
  	}
}


