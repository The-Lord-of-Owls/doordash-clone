import { Injectable } from '@angular/core'

import { productInfo } from './interfaces/product-info'
import { storeInfo } from './interfaces/store-info'

@Injectable( {
	providedIn: 'root'
} )

export class ProductsService {
	stores: Array<storeInfo> = []

	constructor() {}

	getStore( name: string ): storeInfo | boolean {
		let requestedStore: storeInfo | boolean = false

		this.stores.forEach( store => {
			if ( store.name === name ) {
				requestedStore = store
			}
		} )

		return requestedStore
	}

	getProducts( storeID: number ): Array<productInfo> | boolean {
		return this.stores[ storeID ].products || false
	}

	getProduct( storeID: number, productID: number ): productInfo | boolean {
		return this.stores[ storeID ].products[ productID ] || false
	}
}


