import { Component, Input } from '@angular/core'
import { jsPDF } from "jspdf"

import { productInfo } from '../interfaces/product-info'
import { orderDetails } from '../interfaces/order-details'
import { ButtonComponent } from '../button/button.component'

@Component( {
	selector: 'app-order-entry',
  	standalone: true,
	imports: [ ButtonComponent ],
	template: `<div class="entrycard">
		<h2>Order: {{ OrderInfo.id }}</h2>
		<h6>Subtotal: $ {{ OrderInfo.subTotal }} {{ OrderInfo.currency }}</h6>

		<app-button [icon]="checkIcon" (buttonClick)="saveReceipt($event)">Save Receipt</app-button>
		<app-button [icon]="checkIcon" (buttonClick)="downloadReceipt($event)">Save Receipt PDF</app-button>
		<app-button [icon]="checkIcon" (buttonClick)="removeReceipt($event)">Remove Saved Receipt</app-button>
		<app-button [icon]="checkIcon" (buttonClick)="clearReceipts($event)">Clear Saved Receips</app-button>
	</div>`,
	styleUrl: './order-entry.component.scss'
} )

export class OrderEntryComponent {
	@Input() OrderInfo: orderDetails = {
		id: "",
		items: [],
		subTotal: 0,
		currency: "USD",
		deliveryAddress: "1234 Pizza St, Dallas TX"
	}

	checkIcon: string = "fa-check"

	constructor() {}

	eventReceived( response: string ) {
		console.log( response )
	}

	//Order Building
	addItem( newItem: productInfo ) {
		let found: boolean = false
		let entry: number = -1

		this.OrderInfo.items.forEach( ( item: productInfo, index: number ) => {
			if ( item.id === newItem.id ) {
				found = true
				entry = index
			}
		} )

		found ? () => {
			if ( entry >= 0 ) this.OrderInfo.items[ entry ].quantity += 1
		} : this.OrderInfo.items.push( newItem )


		this.OrderInfo.subTotal = this.calculateSubTotal()
	}

	removeItem( removableItem: productInfo ) {
		let found: boolean = false
		let entry: number = -1
		let quantity: number = 0

		this.OrderInfo.items.forEach( ( item: productInfo, index: number ) => {
			if ( item.id === removableItem.id ) {
				found = true
				entry = index
				quantity = item.quantity
			}
		} )

		if ( found ) quantity === 1 ? this.OrderInfo.items.splice( entry, 1 ) : this.OrderInfo.items[ entry ].quantity -= 1

		this.OrderInfo.subTotal = this.calculateSubTotal()
	}

	setCurrency( currency: string ) {
		this.OrderInfo.currency = currency
	}

	setAddress( address: string ) {
		this.OrderInfo.deliveryAddress = address
	}

	calculateSubTotal() {
		let cost = 0

		this.OrderInfo.items.forEach( ( item: productInfo ) => {
			cost += item.price * item.quantity
		} )

		return cost
	}

	//Storage and reciept handling
	generatePDFHtml() {
		//Provide a downloadable receipt
		let fileContent = `<h3>Order Details</h3
			<p>Below are the details of your order</p>	
			<h4>Items:</h4>
		<ol>`

		this.OrderInfo.items.forEach( ( item: productInfo ) => {
			fileContent += `<li>${ item.name } @ ${ item.price }</li>`
		} )

		return fileContent += '</ol>'
	}

	saveReceipt( data: string ) {
		//Store a copy of the receipt in local storage
		this.OrderInfo.generatedHTML = this.generatePDFHtml()
		localStorage.setItem( `order_${ this.OrderInfo.id }`, JSON.stringify( this.OrderInfo ) )
	}

	downloadReceipt( data: string ) {
		//Save local copy to browser
		this.saveReceipt( data )

		//Check if we loaded correctly
		if ( !this.OrderInfo.items ) return;

		//Provide a downloadable receipt
		const doc = new jsPDF()
		doc.html( this.OrderInfo.generatedHTML || this.generatePDFHtml(), {
			callback: pdf => pdf.save( `order_${ this.OrderInfo.id }.pdf` )
		} )
	}

	removeReceipt( data: string ) {
		//Remove the copy of the receipt
		localStorage.removeItem( `order_${ this.OrderInfo.id }` )

		//figure out how to make this thing able to remove itself
		//this.remove() //Does not work
		//this.delete() //Does not work
	}

	clearReceipts( data: string ) {
		//Remove all records of the receipt from local storage
		localStorage.clear()
	}
}


