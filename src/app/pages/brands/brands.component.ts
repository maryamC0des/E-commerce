import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { SearchPipe } from '../../shared/pipe/search/search.pipe';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [NgIf],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly brandService=inject(BrandService)
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly _BrandService =inject(BrandService)
brandid: any;
brandsdetails:Ibrands={}as Ibrands;
brands:Ibrands[]=[];
isModalOpen: boolean = false;
ngOnInit(): void {
  this.flowbiteService.loadFlowbite(flowbite => {
    console.log('Flowbite loaded', flowbite);
  });
  this.getallbrand();
  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.brandid=res.get("id");
      console.log(this.brandid)
      this._BrandService.getSpecificBrand(this.brandid).subscribe({
  next:(res)=>{
  console.log(res)
  this.brandsdetails=res.data
        },
      })

    },
    error:(err)=>{
    },
  })

}
getallbrand():void{
  this._BrandService.getAllBrand().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.brands=res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
openModal(brand: Ibrands): void {
  this.brandsdetails = brand;
  this.isModalOpen = true;
}
closeModal(): void {
  this.isModalOpen=false;
}

























  price:WritableSignal<number>=signal(100);
  quantity:WritableSignal<number>=signal(90);
  totalprice:Signal<number>=computed(()=>this.price()*this.quantity());
counter:WritableSignal<number>= signal(0)
userName:WritableSignal<string>= signal('');
changeCounter(){
  this.counter.update((oldValue)=>oldValue);
  console.log("hi");
  
}
changeName(){
  this.userName.set('Huda')
  console.log("hi");
}
changetotalPrice(){
  console.log(this.totalprice);
  this.price.set(40)
  console.log(this.totalprice);
}

}
