import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { jsPDF } from "jspdf"

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [ RouterOutlet ],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'doordash-clone'
	fileContent = "<h1>Hello World!</h1>"
	filePath = "helloworld.pdf"

	generatePDF() {
		const doc = new jsPDF()

		doc.html( this.fileContent, {
			callback: pdf => pdf.save( this.filePath )
		} )
	}
}
