import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-toggler-btn',
  standalone: true,
  imports: [],
  templateUrl: './modal-toggler-btn.component.html',
  styleUrl: './modal-toggler-btn.component.scss',
})
export class ModalTogglerBtnComponent {
  @Input() buttonText: string = 'Change Location';
  @Output() clickEvent = new EventEmitter<boolean>();

  onClick() {
    this.clickEvent.emit(true);
  }
}
