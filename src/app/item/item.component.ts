import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input("item") item: Item | null = null;
  @Output("add") add = new EventEmitter<Item>()

  addItem() {
    if (this.item) {
      this.add.emit(this.item)
    }
    else {
      throw new Error("Item is null")
    }
  }
}
