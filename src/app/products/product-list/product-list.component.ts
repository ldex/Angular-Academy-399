import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  title: string = 'Products'
  selectedProduct: Product
  private productService = inject(ProductService)
  private router = inject(Router)

  // Pagination
  pageSize = 5
  start = 0
  end = this.pageSize
  currentPage = 1

  previousPage() {
    this.start -= this.pageSize
    this.end -= this.pageSize
    this.currentPage--
    this.selectedProduct = undefined
  }

  nextPage() {
    this.start += this.pageSize
    this.end += this.pageSize
    this.currentPage++
    this.selectedProduct = undefined
  }

  onSelect(product: Product) {
    this.selectedProduct = product
    this.router.navigateByUrl('/products/' + product.id)
  }

  errorMessage: string

  products$: Observable<Product[]> = this
                                        .productService
                                        .products$
                                        .pipe(
                                          catchError(
                                            error => {
                                              this.errorMessage = error
                                              return EMPTY
                                            }
                                          )
                                        )

}
