import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductStoreService } from 'src/app/service/product-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-or-add-price',
  templateUrl: './change-or-add-price.component.html',
  styleUrls: ['./change-or-add-price.component.scss'],
})
export class ChangeOrAddPriceComponent implements OnInit {
  Form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productStoreService: ProductStoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
    this.Form = this.formBuilder.group({
      store: ['', Validators.required],
      amount: ['', Validators.maxLength(200)],
      _productId: [data._productId, Validators.required],
    });
  }

  ngOnInit() {
    if (this.data.amount) {
      this.Form = this.formBuilder.group({
        store: [this.data.store.description, Validators.required],
        amount: [this.data.amount, Validators.maxLength(200)],
        _productId: [this.data._productId, Validators.required],
        _storeId: [this.data._storeId, Validators.required],
        id: [this.data.id],
      });
    }
  }

  async onSubmit() {
    if (this.data.amount) {
      await this.update();
      return this.closeModal();
    }
    Swal.fire({
      title: 'Aguarde',
      text: 'Salvando...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    this.productStoreService
      .create(this.Form.value)
      .then(() => {
        Swal.close();
        Swal.fire({
          title: 'Sucesso',
          icon: 'success',
          showConfirmButton: false,
        });
      })
      .catch(() => {
        Swal.close();
        Swal.fire({
          title: 'Erro',
          icon: 'error',
          showConfirmButton: false,
        });
      })
      .finally(() => {
        this.closeModal();
      });
  }

  update() {
    Swal.fire({
      title: 'Aguarde',
      text: 'Salvando...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    this.productStoreService
      .update(this.Form.value)
      .then(() => {
        Swal.close();
        Swal.fire({
          title: 'Sucesso',
          icon: 'success',
          showConfirmButton: false,
        });
      })
      .catch(() => {
        Swal.close();
        Swal.fire({
          title: 'Erro',
          icon: 'error',
          showConfirmButton: false,
        });
      });
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
