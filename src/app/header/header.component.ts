import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MarketplaceItemType } from '../types/marketplace.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartItems: { item: MarketplaceItemType, quantity: number }[] = [];
  cartItemsSub!: Subscription;


  constructor(
    public cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.cartItemsSub = this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  ngOnDestroy(): void {
    this.cartItemsSub.unsubscribe();
  }

  decrementQuantity(cartItem: { item: MarketplaceItemType, quantity: number }): void {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    }
  }

  incrementQuantity(cartItem: { item: MarketplaceItemType, quantity: number }): void {
    cartItem.quantity++;
  }

  removeFromCart(cartItem: { item: MarketplaceItemType, quantity: number }): void {
    // Remove the item from the cart array
    const index = this.cartItems.indexOf(cartItem);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.item.price, 0);
  }

  removeAllProducts(): void {
    // Clear the cartItems array
    this.cartItems = [];
  }

}

