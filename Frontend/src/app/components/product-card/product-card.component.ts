import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import ProductModel from '../../models/product.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../services/products.service';

var editproduct = new ProductModel();

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private chatService: ChatService,
    private myProductsService: ProductsService
  ) {}
  public id: number | any;
  public count: number = 0;
  public cart: [] | any;

  @Input()
  public product: ProductModel | any;
  @Input()
  public isadmin: boolean | any;

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialog, {});
  }
  public async deleteProduct(id: number) {
    await this.myProductsService.deleteProduct(id)
    this.chatService.send({ message: 'Hello World!' });
  }
  edit(product: ProductModel) {
    if (this.isadmin === true) {
      this.openDialog();
      editproduct = product;
    } else {
      alert('you are not an admin');
    }
  }

  preventSlide(event: MatSlideToggleChange, done: boolean): void {
    event.source.checked = done;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './edit-dialog.component.html',
})
export class EditDialog {
  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    public chatService: ChatService,
    private myProductsService: ProductsService
  ) {}

  public editproduct: ProductModel | any;
  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.socket.on('msg-from-server', (msg: any) => {});

    this.editproduct = editproduct;
  }

  public changeDone(event: MatSlideToggleChange) {
    this.editproduct.Done = event.checked;
  }
  public async send() {
    await this.myProductsService.updateProduct(this.editproduct)
      this.chatService.send({ message: 'Hello World!' });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
