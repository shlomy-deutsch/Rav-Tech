import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { AddDialog, HomeComponent } from './components/home/home.component';
import { AdminDialog } from './components/home/home.component';
import { EditDialog, ProductCardComponent} from './components/product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule, MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS} from '@angular/material/button-toggle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddDialog,
    ProductCardComponent,
    EditDialog,
    AdminDialog 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  providers: [ { provide:MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, useValue: { color: 'my-custom-color' }}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
