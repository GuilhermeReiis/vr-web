import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateOrEditProductComponent } from './product/create-or-edit-product/create-or-edit-product.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeOrAddPriceComponent } from './product/change-or-add-price/change-or-add-price.component';

@NgModule({
  declarations: [
    ProductComponent,
    CreateOrEditProductComponent,
    ChangeOrAddPriceComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'produto',
            component: ProductComponent,
          },
          {
            path: 'produto/cadastro',
            component: CreateOrEditProductComponent,
          },
          {
            path: 'produto/edicao',
            component: CreateOrEditProductComponent,
          },
        ],
      },
    ]),
  ],
  providers: [],
})
export class PagesModule {}
