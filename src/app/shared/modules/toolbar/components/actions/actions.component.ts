import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  constructor() { }

  @Input() disableDelete: boolean = false;
  @Input() disableEdit: boolean = false;
  @Output() onEdit: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onRemove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  ngOnInit(): void {
  }

  edit(event: MouseEvent) {
    this.onEdit.emit(event);
  }

  remove(event: MouseEvent) {
    this.onRemove.emit(event);
  }
}
