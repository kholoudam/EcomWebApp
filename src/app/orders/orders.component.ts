/**import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders:any;
  customerId!:number;
  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute) {
    this.customerId = this.route.snapshot.params['customerId'];
  }
  ngOnInit() {
    this.http.get('http://localhost:8082/billing-service/bills/'+this.customerId)
      .subscribe(
        {
          next: data => {
            this.orders = data;
          },
          error: error => {

          }
        }
      )
  }
  getOrderDetails(o: any) {
    this.router.navigateByUrl('/order-details/'+o.id);
  }
}
**/
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders: any;          // contient la facture complète
  customerId!: number;  // pris depuis l'URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerId = this.route.snapshot.params['customerId'];
  }

  ngOnInit() {
    // ⚠️ Ton backend retourne la facture du customer par son id
    this.http.get(`http://localhost:8082/billing-service/bills/${this.customerId}`)
      .subscribe({
        next: data => {
          this.orders = data;   // le JSON complet est stocké ici
        },
        error: err => {
          console.error("Erreur lors du chargement:", err);
        }
      });
  }

  getOrderDetails(o: any) {
    this.router.navigateByUrl('/order-details/' + o.id);
  }
}
