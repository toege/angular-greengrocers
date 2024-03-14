import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input("item") item: Item | null = null;
  @Output("add") add = new EventEmitter<Item>()
  @Output("remove") remove = new EventEmitter<Item>()

  addItem() {
    if (this.item) {
      this.add.emit(this.item)
    }
    else {
      throw new Error("Item is null")
    }
  }

  removeItem() {
    if (this.item) {
      this.remove.emit(this.item)
    }
    else {
      throw new Error("Item is null")
    }
  }

}
