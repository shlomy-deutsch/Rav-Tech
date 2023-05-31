import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import ProductModel from '../app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public async getAllProducts() {
    const categories = await this.http
      .get<ProductModel[]>(environment.myProductsUrl)
      .toPromise();
    return categories;
  }

  public async updateProduct(product: ProductModel) {
    const myFormData = ProductModel.convertToFormData(product);
    const update = await this.http
      .put<ProductModel>(
        environment.myProductsUrl + '/' + product.ID,
        myFormData
      )
      .toPromise();
    return update;
  }

  public async addProduct(product: ProductModel) {
    const myFormData = ProductModel.convertToFormData(product);
    const updatedProduct = await this.http
      .post<ProductModel>(environment.myProductsUrl, myFormData)
      .toPromise();
    return updatedProduct;
  }

  public async deleteProduct(id: number) {
    await this.http
      .delete<ProductModel>(environment.myProductsUrl + '/' + id)
      .toPromise();
  }
  public async getNumProducts(num: number) {
    const categories = await this.http
      .get<ProductModel[]>(environment.myProductsUrl+ '/' + num)
      .toPromise();
    return categories;
  }
}
