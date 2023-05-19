import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import ProductModel from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../../../services/chat.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import AuthModel from '../../models/auth.model';
var admin: Boolean;
var productsarr: ProductModel;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public isadmin: Boolean = false;
  public chatService: ChatService = new ChatService();
  products: ProductModel[] | any;
  public numberOfProducts: number = 0;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

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
      const response = await this.http
        .get<ProductModel[]>('http://localhost:3000/api/appointment')
        .toPromise();
      this.products = response;
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
      try {
        const response = await this.http
          .get<ProductModel[]>(
            'http://localhost:3000/api/appointment/' + this.numberOfProducts
          )
          .toPromise();
        if (response) {
          for (const obj of response) {
            this.products.push(obj);
          }
        }
        productsarr = this.products;
      } catch (error) {
        console.error('Error retrieving products', error);
      }
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'add-dialog.component.html',
})
export class AddDialog {
  public chatService: ChatService = new ChatService();
  public newproduct = new ProductModel();

  constructor(
    public dialogRef: MatDialogRef<AddDialog>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {});
  }

  public async send() {
    const myFormData = ProductModel.convertToFormData(this.newproduct);

    try {
      await this.http
        .post<ProductModel[]>(
          'http://localhost:3000/api/appointment',
          myFormData
        )
        .toPromise();
      this.chatService.send({ message: 'Hello World!' });
    } catch (err: any) {
      alert('שגיאה בקוד או בשם משתמש');
    }
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
  public chatService: ChatService = new ChatService();
  product = new AuthModel();
  auth: AuthModel | any;

  constructor(
    public dialogRef: MatDialogRef<AdminDialog>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {});
  }
  public async send() {
    try {
      this.auth = await this.http
        .post<AuthModel[]>('http://localhost:3000/api/auth', this.product)
        .toPromise();
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
