import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IproductsService } from '../../core/services/products/iproducts.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent  implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService= inject(IproductsService);
  private readonly toastr=inject(ToastrService)
  private readonly cartService =inject(CartService)
  productId:any;
  productDetails:Iproduct= {} as Iproduct
ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
     this.productId = res.get("id")
     this.productsService.getSpecificProduct(this.productId).subscribe({
      next:(res)=>{
this.productDetails=res.data
      },error:(err)=>{
        console.log(err);
        
      }
    })
      },error:(err)=>{
        console.log(err);
        
      }
    })
   
}
addToCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);

      this.toastr.success(res.message,'success' ,{
        closeButton:true,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-left'
      })
    },error:(err)=>{
      console.log(err); 
    }
  })
  }
}
