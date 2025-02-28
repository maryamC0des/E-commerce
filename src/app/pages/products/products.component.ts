import { Component, inject } from '@angular/core';
import { IproductsService } from '../../core/services/products/iproducts.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../shared/pipe/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WishListService } from '../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [CarouselModule ,SearchPipe, FormsModule ,RouterLink ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly toastr=inject(ToastrService)
  private readonly cartService =inject(CartService)
  private readonly wishListService =inject(WishListService)
   private readonly iproductsService =inject(IproductsService)

  iteams:string=''
products:Iproduct[]=[];
wishList:string[]=[];
ngOnInit(): void {
  this.getProductData()
 
 }
getProductData(){
  this.iproductsService.getAllProduct().subscribe({
    next:(res)=>{
     this.products=res.data
    //  console.log(res.data);
     
     
    },
    error:(err)=>{
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
addToWishlist(id:string):void{
  this.wishListService.addProductWishList(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.wishList=res.data
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
  removeFromWishlist(id:string):void{
    this.wishListService.removeProductWishList(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.wishList=res.data
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
