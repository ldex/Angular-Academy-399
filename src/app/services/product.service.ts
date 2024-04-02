import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, delay, shareReplay, tap, map } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://retoolapi.dev/U1A9pK/products/'
  products$: Observable<Product[]>
  private http = inject(HttpClient)

  constructor() {
    this.initProducts()
  }

  initProducts() {
    let url:string = this.baseUrl + '?_sort=modifiedDate&_order=desc'

    this.products$ = this
                      .http
                      .get<Product[]>(url)
                      .pipe(
                        delay(1500), // for the demo!!
                        tap(data => console.table(data))
                      )
  }
}
