import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import ProductModel from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../../../services/chat.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import AuthModel from '../../models/auth.model';
import { ProductsService } from '../../../services/products.service';
import { AuthService } from '../../../services/auth.service';

var admin: Boolean;
var productsarr: ProductModel;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public isadmin: Boolean = false;
  products: ProductModel[] | any;
  public numberOfProducts: number = 0;

  constructor(
    public dialog: MatDialog,
    private chatService: ChatService,
    private myProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {
      this.onMessageReceived();
    });
    this.getProducts();
  }

  private onMessageReceived() {
    this.isadmin = admin;
    this.getProducts();
  }

  async order() {
    this.products = productsarr;
    const priorityOrder: { [key: string]: number } = {
      high: 1,
      medium: 2,
      low: 3,
    };
    this.products = [...(this.products ?? [])].sort(
      (a, b) => priorityOrder[a.Priority] - priorityOrder[b.Priority]
    );
  }
  public onPrioritySelected(event: Event) {
    this.products = productsarr;

    this.products = this.products.filter(
      (product: ProductModel) =>
        product.Priority === (event as unknown as string)
    );
  }

  private async getProducts() {
    try {
      this.products = await this.myProductsService.getAllProducts();
      productsarr = this.products;
    } catch (error) {
      console.error('Error retrieving products', error);
    }
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialog, {});
  }
  openAdminDialog(): void {
    const dialogRef = this.dialog.open(AdminDialog, {});
    dialogRef.afterClosed().subscribe((result) => {});
  }

  @HostListener('window:scroll', ['$event'])
  async onWindowScroll() {
    if (
      document.body.clientHeight + window.scrollY >=
      document.body.scrollHeight
    ) {
      this.numberOfProducts = this.products.length;
      const response = await this.myProductsService.getNumProducts(this.numberOfProducts)
        if (response) {
          for (const obj of response) {
            this.products.push(obj);
          }
        }
        productsarr = this.products;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'add-dialog.component.html',
})
export class AddDialog {
  public newproduct = new ProductModel();

  constructor(
    public dialogRef: MatDialogRef<AddDialog>,
    private chatService: ChatService,
    private myProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {});
  }

  public async send() {
    this.myProductsService.addProduct(this.newproduct);
    this.chatService.send({ message: 'Hello World!' });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'admin-dialog.component.html',
})
export class AdminDialog {
  product = new AuthModel();
  auth: AuthModel | any;

  constructor(
    public dialogRef: MatDialogRef<AdminDialog>,
    private http: HttpClient,
    private chatService: ChatService,
    private myAuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {});
  }
  public async send() {
    try {
      this.auth = await this.myAuthService.postProduct(this.product)
      if (this.auth.admin === 1 || this.auth.admin === true) {
        admin = true;
        this.chatService.send({ message: 'Hello World!' });
      }
    } catch (err: any) {
      alert('שגיאה בקוד או בשם משתמש');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
