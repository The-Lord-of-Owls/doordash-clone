import { Component, NgModule  } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { OrdersService } from "./orders.service"
import { OrderEntryComponent } from './order-entry/order-entry.component'

@Component( {
	selector: 'app-root',
	standalone: true,
	imports: [ RouterOutlet, OrderEntryComponent ],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
} )

export class AppComponent {
	title = 'doordash-clone'

	constructor( private orders: OrdersService) {}

	getOrderList() {
		return this.orders.getOrderList()
	}

	stringify( input: any ) {
		return JSON.stringify( input )
	}
}


