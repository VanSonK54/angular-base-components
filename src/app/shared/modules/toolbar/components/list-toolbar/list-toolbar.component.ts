import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.scss']
})
export class ListToolbarComponent implements OnInit {
  @Output() onAdd: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  add(event: MouseEvent) { 
    this.onAdd.emit(event);
  }

  search() { 
    this.onSearch.emit(null);
  }

}
