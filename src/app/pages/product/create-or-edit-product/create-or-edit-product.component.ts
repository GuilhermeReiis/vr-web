import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';
import { ChangeOrAddPriceComponent } from '../change-or-add-price/change-or-add-price.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStoreService } from 'src/app/service/product-store.service';

@Component({
  selector: 'app-create-or-edit-product',
  templateUrl: './create-or-edit-product.component.html',
  styleUrls: ['./create-or-edit-product.component.scss'],
})
export class CreateOrEditProductComponent implements OnInit {
  Form: FormGroup;

  mode: 'create' | 'edit' = 'create';
  data = [] as any;
  _productId = '' as any;
  product = {} as any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private productStoreService: ProductStoreService,
    private router: Router
  ) {
    this.Form = this.formBuilder.group({
      id: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      amount: ['', Validators.maxLength(200)],
      // image: [null, Validators.required],
    });
    this.route.queryParams.subscribe((params: any) => {
      if (params._productId) {
        // Use JSON.parse para desserializar o objeto JSON da string
        this._productId = JSON.parse(params._productId);
      }
    });
  }

  async ngOnInit() {
    this.verifyURL();
    if (this.mode === 'edit') {
      await this.load();
      await this.getProduct();
      this.Form.patchValue({
        id: this._productId,
        description: this.product.description,
        amount: this.product.amount,
        image: this.product.image,
      });
    }
  }

  translateMode(mode: 'create' | 'edit') {
    return mode === 'create' ? 'Cadastro' : 'Edição';
  }

  verifyURL() {
    const URL = window.location.href;
    if (URL.endsWith('/produto/cadastro')) {
      this.mode = 'create';
    } else {
      this.mode = 'edit';
    }
  }

  async load() {
    this.data = await this.productStoreService.searchById(this._productId);

    this.Form.patchValue(this.data);
  }

  async onSubmit() {
    if (this.mode === 'edit') {
      await this.update();
      return;
    }

    this.Form.removeControl('id');
    if (this.Form.invalid) {
      Swal.fire({
        title: 'Erro',
        text: 'Preencha todos os campos corretamente!',
        icon: 'error',
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire({
      title: 'Aguarde',
      text: 'Salvando produto...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    this.productService
      .create(this.Form.value)
      .then(() => {
        Swal.close();
        Swal.fire({
          title: 'Sucesso',
          text: 'Produto salvo com sucesso!',
          icon: 'success',
          showConfirmButton: false,
        });
        this.router.navigate(['/produto']);
      })
      .catch(() => {
        Swal.close();
        Swal.fire({
          title: 'Erro',
          text: 'Ocorreu um erro ao salvar o produto!',
          icon: 'error',
          showConfirmButton: false,
        });
      })
      .finally(() => {
        this.load();
      });
  }

  async update() {
    if (this.Form.invalid) {
      Swal.fire({
        title: 'Erro',
        text: 'Preencha todos os campos corretamente!',
        icon: 'error',
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire({
      title: 'Aguarde',
      text: 'Salvando produto...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    this.productService
      .update(this.Form.value)
      .then((res: any) => {
        Swal.close();

        this.Form.patchValue({
          id: res.id,
          description: res.description,
          amount: res.amount,
        });

        Swal.fire({
          title: 'Sucesso',
          text: 'Produto salvo com sucesso!',
          icon: 'success',
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.close();
        Swal.fire({
          title: 'Erro',
          text: 'Ocorreu um erro ao salvar o produto!',
          icon: 'error',
          showConfirmButton: false,
        });
      })
      .finally(() => {
        this.load();
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangeOrAddPriceComponent, {
      width: '800px',
      data: { _productId: this._productId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.load();
    });
  }

  async getProduct() {
    await this.productService.searchById(this._productId).then((res) => {
      this.product = res;
    });
  }

  async delete(_productStoreId: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Não será possível reverter essa ação!',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Aguarde',
          text: 'Deletando...',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
        });

        this.productStoreService
          .delete(_productStoreId)
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
            this.load();
          });
      } else {
        Swal.close();
      }
    });
  }

  async edit(productStore: any) {
    const dialogRef = this.dialog.open(ChangeOrAddPriceComponent, {
      width: '800px',
      data: productStore,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.load();
    });
  }

  back() {
    this.router.navigate(['/produto']);
  }

  async deleteproduct(_productId: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Não será possível reverter essa ação!',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Aguarde',
          text: 'Deletando...',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
        });

        this.productService
          .delete(_productId)
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
            this.router.navigate(['/produto']);
          });
      } else {
        Swal.close();
      }
    });
  }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.convertFileToByteArray(file).then((byteArray) => {
  //       console.log(byteArray);
  //       this.Form.patchValue({
  //         image: byteArray,
  //       });
  //     });
  //   }
  // }

  // async convertFileToByteArray(file: File): Promise<Uint8Array> {
  //   return new Promise<Uint8Array>((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       const byteArray = new Uint8Array(event.target.result);
  //       resolve(byteArray);
  //     };
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   });
  // }
}
