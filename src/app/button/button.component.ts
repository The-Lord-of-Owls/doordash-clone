import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component( {
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `<button class="btn" (click)="onClick( 'test' )"><i class="fa {{ icon }} icon"></i><ng-content></ng-content></button>`,
  styleUrl: './button.component.scss'
} )

export class ButtonComponent {
	//@Input() text: string = ""
	@Input() icon: string = ""

	@Output() buttonClick: EventEmitter<string> = new EventEmitter()

	onClick( value: string ) {
		this.buttonClick.emit( value )
	}
}


