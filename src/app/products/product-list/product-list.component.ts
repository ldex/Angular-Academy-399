import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  title: string = 'Products'
  selectedProduct: Product

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
  }

  private productService = inject(ProductService)

  products$: Observable<Product[]> = this.productService.products$

}
