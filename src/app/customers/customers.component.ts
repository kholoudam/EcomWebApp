import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent
{
  customers:any;
  constructor(private http:HttpClient, private router: Router) {}
  ngOnInit():void{
    this.http.get("http://localhost:8082/customer-service/api/customers?projection=fullClients").subscribe({
      next : (data)=>{
        this.customers=data;
      },
      error : (err)=>{}
    })
  }
  getOrders(c: any) {
    this.router.navigateByUrl("/orders/" + c.id);
  }
}
