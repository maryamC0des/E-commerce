import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check',
  imports: [],
  templateUrl: './check.component.html',
  styleUrl: './check.component.scss'
})
export class CheckComponent implements OnInit {
  private readonly formBuilder= inject(FormBuilder)
  private readonly activatedRoute= inject(ActivatedRoute)
checkOutForm!:FormGroup;
cartId:any;
ngOnInit(): void {
 this.initForm()
 this.getCartOId()
}
initForm():void{
  this.checkOutForm = this.formBuilder.group({
    details:[null,[Validators.required]],
    phone:[null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:[null,[Validators.required]]
  })
}
getCartOId():void{
this.activatedRoute.paramMap.subscribe({
  next:(param)=>{
this.cartId = param.get('id')
  }
})
}
submitForm(){
console.log( this.checkOutForm.value);

}

}
