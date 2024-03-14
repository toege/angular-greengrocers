import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Item } from './models/item';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  http = inject(HttpClient)
  title = 'angular-green-grocers';

  cart: Item[] = [];
  filter: string = "all";
  sort: string = "name";
  total: number = 0.0;
  // @ts-ignore
  groceries: Item[] = this.filterItems();
  

  async filterItems() {
    try {
      this.groceries = await this.get();
      
      this.sortItems();
    } catch (error) {
      console.error('Error filtering items:', error);
    }
  }

  
  async get(): Promise<any> {
    try {
      if (this.filter === "all") {
        // @ts-ignore
        return await firstValueFrom(this.http.get('https://boolean-api-server.fly.dev/groceries'));
      }
      else if (this.filter === "vegetable" || this.filter === "fruit"){
    
        // @ts-ignore
        return await firstValueFrom(this.http.get('https://boolean-api-server.fly.dev/groceries?type='+this.filter))
      }
    } catch (error) {
      console.error('Error fetching data:', error); 
      return null; 
    }
  }
  
  sortItems() {
    if (this.sort === "name") {      
      this.groceries?.sort(function(x, y) { return x.name.localeCompare(y.name)})
    }
    else {
      this.groceries?.sort(function(x, y) { return x.price- y.price })
    }
  }

  addToCart(item: Item) {
    if (!this.cart.some(gros => gros.id === item.id)) {
      item.quantity = 1;
      this.cart.push(item)
    }
    else {
      this.cart.map(gros => {
        if (gros.id === item.id) {
          gros.quantity ? gros.quantity++ : null; 
        }
        return gros
      }
      )
    }
    this.total += item.price
  }
  
  remove(item: Item) {
    this.cart.map(gros => {
      if (gros.id === item.id) {
        this.total -= item.price
        gros.quantity ? gros.quantity-- : null; 
        if (gros?.quantity === 0) {
        }
      }
      return gros
    })
    this.cart = this.cart.filter(gros => gros?.quantity !== 0)

    if (this.cart.length === 0) {
      this.total = 0.0
    }
  }



}
