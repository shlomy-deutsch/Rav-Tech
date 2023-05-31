import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import AuthModel from '../app/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public async postProduct(product: AuthModel) {
    const updatedProduct = await this.http
      .post<AuthModel>(environment.myAuthUrl, product)
      .toPromise();
    return updatedProduct;
  }

}
