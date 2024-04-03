import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, delay, shareReplay, tap, map, pipe } from 'rxjs';
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

  insertProduct(newProduct: Product): Observable<Product> {
    newProduct.modifiedDate = new Date();
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }

  getProductById(id: number): Observable<Product> {
    return this
              .products$
              .pipe(
                map(products => products.find(product => product.id == id))
              )
  }

  resetList() {
    this.initProducts();
  }

  initProducts() {
    let url:string = this.baseUrl + '?_sort=modifiedDate&_order=desc'

    this.products$ = this
                      .http
                      .get<Product[]>(url)
                      .pipe(
                        delay(1500), // for the demo!!
                        tap(data => console.table(data)),
                        shareReplay(),
                        catchError(this.handleError)
                      )
  }


  private handleError(error: HttpErrorResponse) {
    // in a real world app, you may send the error to the server using some remote logging infrastructure
    // instead of just logging it to the console
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMsg = 'An error occurred:' + error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMsg = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMsg);
    // return an observable with a user-facing error message
    return throwError(() => 'Something bad happened; please try again later.');
  }
}
