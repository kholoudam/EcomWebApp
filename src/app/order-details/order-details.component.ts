import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: any;
  orderId!: number;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.params['orderId'];
  }

  ngOnInit() {
    this.http.get('http://localhost:8082/billing-service/bills/' + this.orderId)
      .subscribe({
        next: data => {
          this.orderDetails = data;

          // 👉 Calcul amount pour chaque productItem
          this.orderDetails.productItems.forEach((pi: any) => {
            pi.amount = pi.unitPrice * pi.quantity;
          });

          // 👉 Calcul du total général
          this.orderDetails.total = this.orderDetails.productItems
            .map((pi: any) => pi.amount)
            .reduce((sum: number, val: number) => sum + val, 0);
        },
        error: error => {
          console.error("Error loading bill:", error);
        }
      });
  }
}
