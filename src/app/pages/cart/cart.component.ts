import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';

import { CurrencyPipe } from '@angular/common';
import { ICart, ProductElement } from '../../shared/interfaces/icart';
import { count } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
private readonly cartService=inject(CartService)
totalPrice:number=0
cartDetails:ProductElement[]= []
cartId:any
  ngOnInit(): void {
      this.getCartData()
  }
  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.totalPrice =res.data.totalCartPrice
        this.cartDetails=res.data.products;
        this.cartId = res._id
      },error:(err)=>{
        console.log(err);
        

      }
    })
  }
  updateCart(id:string , count:number):void{
    this.cartService.UpdateCartProduct(id , count).subscribe({
      next:(res)=>{
        this.totalPrice =res.data.totalCartPrice
        this.cartDetails=res.data.products;
      }
    })

  }
  removeItem(id:string):void{
this.cartService.removeSpecificCart(id).subscribe({
  next:(res)=>{
    this.totalPrice =res.data.totalCartPrice
    this.cartDetails=res.data.products;
  }
})
  }
  clearAllProduct():void{
    this.cartService.clearCart
  }
}
