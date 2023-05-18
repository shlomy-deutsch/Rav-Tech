import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { AddDialog, HomeComponent } from './components/home/home.component';
import { AdminDialog } from './components/home/home.component';
import { EditDialog, ProductCardComponent} from './components/product-card/product-card.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule, MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS} from '@angular/material/button-toggle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import { CarouselModule } from '@coreui/angular';
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatFormFieldModule,
    GooglePayButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    CarouselModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  providers: [ { provide:MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, useValue: { color: 'my-custom-color' }}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
