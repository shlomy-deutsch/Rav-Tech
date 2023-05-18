import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import ProductModel from '../../models/product.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

var editproduct = new ProductModel();

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  public chatService: ChatService = new ChatService();
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
    const deleteproduct = await this.http
      .delete<ProductModel>('http://localhost:3000/api/appointment/' + id)
      .toPromise();
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
    event.source.checked = done; // Revert the slide toggle state
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './edit-dialog.component.html',
})
export class EditDialog {
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditDialog>,
    public chatService: ChatService = new ChatService()
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
    const myFormData = ProductModel.convertToFormData(this.editproduct);

    try {
      await this.http
        .put<ProductModel[]>(
          'http://localhost:3000/api/appointment/' + this.editproduct.ID,
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
