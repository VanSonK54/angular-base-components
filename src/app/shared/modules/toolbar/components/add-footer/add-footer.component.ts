import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-footer',
  templateUrl: './add-footer.component.html',
  styleUrls: ['./add-footer.component.scss']
})
export class AddFooterComponent implements OnInit {

  constructor() { }

  @Input() loading: boolean = false;
  @Input() form: FormGroup;
  @Output() onSave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>(); 
  @Output() onCancel: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>(); 

  ngOnInit(): void {
  }

  save(event: MouseEvent) { 
    this.onSave.emit();
  }

  cancel(event: MouseEvent) { 
    this.onCancel.emit();
  }
}
