import { Component, Input } from '@angular/core'
import { jsPDF } from "jspdf"

interface productInfo {
	id: number
	name: string
	price: number
	quantity: number
}

interface orderDetals {
	items: Array<productInfo>
	subTotal: number
	currency: string
	deliveryAddress: string
	generatedHTML?: string
}

@Component({
	selector: 'app-order-entry',
  	standalone: true,
	imports: [],
	template: `<div>
		<h2>Order: {{ orderID }}</h2>
		<h6>Subtotal: $ {{ orderDetails.subTotal }} {{ orderDetails.currency }}</h6>
		<button (click)="saveReceipt()">Save Receipt</button>
		<button (click)="downloadReceipt()">Save Receipt PDF</button>
		<button (click)="removeReceipt()">Remove Saved Receipt</button>
		<button (click)="clearReceipts()">Clear Saved Receipts</button>
	</div>`,
	styleUrl: './order-entry.component.scss'
})

export class OrderEntryComponent {
	@Input() orderID = ""

	orderDetails: orderDetals = {
		items: [],
		subTotal: 0,
		currency: "USD",
		deliveryAddress: "1234 Pizza St, Dallas TX"
	}

	constructor() {}

	//Order Building
	addItem( newItem: productInfo ) {
		let found: boolean = false
		let entry: number = -1

		this.orderDetails.items.forEach( ( item: productInfo, index: number ) => {
			if ( item.id === newItem.id ) {
				found = true
				entry = index
			}
		} )

		if ( !found ) {
			this.orderDetails.items.push( newItem )
		} else if ( found && entry >= 0 ) {
			this.orderDetails.items[ entry ].quantity += 1
		}

		this.orderDetails.subTotal = this.calculateSubTotal()
	}

	removeItem( removableItem: productInfo ) {
		let found: boolean = false
		let entry: number = -1
		let quantity: number = 0

		this.orderDetails.items.forEach( ( item: productInfo, index: number ) => {
			if ( item.id === removableItem.id ) {
				found = true
				entry = index
				quantity = item.quantity
			}
		} )

		if ( found && quantity === 1 ) {
			this.orderDetails.items.splice( entry, 1 )
		} else if ( found && quantity > 1 ) {
			this.orderDetails.items[ entry ].quantity -= 1
		}

		this.orderDetails.subTotal = this.calculateSubTotal()
	}

	setCurrency( currency: string ) {
		this.orderDetails.currency = currency
	}

	setAddress( address: string ) {
		this.orderDetails.deliveryAddress = address
	}

	calculateSubTotal() {
		let cost = 0

		this.orderDetails.items.forEach( ( item: productInfo ) => {
			cost += item.price * item.quantity
		} )

		return cost
	}

	//Storage and reciept handling
	generatePDFHtml() {
		//Provide a downloadable receipt
		let fileContent = `
			<h3>OrderDetails</h3
			<p>Below are the details of your order</p>	
			<h4>Items:</h4>
			<ol>
		`

		this.orderDetails.items.forEach( ( item: productInfo ) => {
			fileContent += `<li>${ item.name } @ ${ item.price }</li>`
		} )

		fileContent += '</ol>'

		return fileContent
	}

	saveReceipt() {
		//Store a copy of the receipt in local storage
		this.orderDetails.generatedHTML = this.generatePDFHtml()
		localStorage.setItem( `order_${ this.orderID }`, JSON.stringify( this.orderDetails ) )
	}

	downloadReceipt() {
		//Save local copy to browser
		this.saveReceipt()

		//Check if we loaded correctly
		if ( !this.orderDetails.items ) return;

		//Provide a downloadable receipt
		const doc = new jsPDF()
		doc.html( this.orderDetails.generatedHTML || this.generatePDFHtml(), {
			callback: pdf => pdf.save( `order_${ this.orderID }.pdf` )
		} )
	}

	removeReceipt() {
		//Remove the copy of the receipt
		localStorage.removeItem( `order_${ this.orderID }` )

		//figure out how to make this thing able to remove itself
		//this.remove() //Does not work
		//this.delete() //Does not work
	}

	clearReceipts() {
		//Remove all records of the receipt from local storage
		localStorage.clear()
	}
}


